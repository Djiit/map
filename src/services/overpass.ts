import {
  type AnyOverpassElement,
  type ComposableOverpassStatement,
  DefaultOverpassApi,
  type OverpassJsonOutput,
  OverpassOutputGeoInfo,
  type OverpassState,
} from "overpass-ql-ts";
import { cache } from "react";

const USER_AGENT =
  "map.djiit.dev/0.1.0 (https://map.djiit.dev; Overpass requests)";

const ENDPOINTS = [
  "https://overpass-api.de/api/interpreter",
  "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
  "https://overpass.private.coffee/api/interpreter",
];

const ROUNDS = 2;
const FETCH_TIMEOUT_MS = 25_000;
const CACHE_TTL_MS = 10 * 60 * 1000;
const CACHE_PRECISION = 2; // decimal places used to round the bbox cache key

const buildStatements = (s: OverpassState): ComposableOverpassStatement[] => [
  s.node.byTags([
    [/^changing_table$/, /^yes$/],
    [/^amenity$/, /^(bar|restaurant|pub|cafe|food_court|fast_food)$/],
  ]),
  s.node.byTags([
    [/^changing_table$/, /^yes$/],
    [/^tourism$/, /^hotel$/],
  ]),
];

const originalFetch = globalThis.fetch;

globalThis.fetch = ((input: RequestInfo | URL, init?: RequestInit) => {
  const headers = new Headers(init?.headers);
  headers.set("User-Agent", USER_AGENT);
  const signal = init?.signal
    ? AbortSignal.any([init.signal, AbortSignal.timeout(FETCH_TIMEOUT_MS)])
    : AbortSignal.timeout(FETCH_TIMEOUT_MS);
  return originalFetch(input, { ...init, headers, signal });
}) as typeof fetch;

const apis = ENDPOINTS.map((interpreterUrl) =>
  DefaultOverpassApi({ interpreterUrl }),
);

globalThis.fetch = originalFetch;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const execWithRetry = async (
  bbox?: [south: number, west: number, north: number, east: number],
): Promise<OverpassJsonOutput> => {
  const run = () =>
    Promise.any(
      apis.map((api) =>
        api.execJson(
          (s) =>
            buildStatements(s).reduce((acc, statement) => acc.union(statement)),
          { geoInfo: OverpassOutputGeoInfo.Geometry },
          { timeout: 60, globalBoundingBox: bbox }, // Same as Vercel function timeout
        ),
      ),
    );
  for (let round = 1; round <= ROUNDS; round++) {
    try {
      return await run();
    } catch (error) {
      const reasons = error instanceof AggregateError ? error.errors : [error];
      console.debug(
        `OverPass requests failed (${reasons
          .map((r: any) => r?.httpCode ?? r?.type ?? "unknown")
          .join(", ")}), round ${round}/${ROUNDS}...`,
      );
      await sleep(1000);
    }
  }
  throw new Error("All OverPass endpoints failed.");
};

const cacheKey = (bbox?: [number, number, number, number]) =>
  bbox ? bbox.map((n) => n.toFixed(CACHE_PRECISION)).join(",") : "world";

const resultCache = new Map<
  string,
  { expires: number; elements: AnyOverpassElement[] }
>();
const inflight = new Map<string, Promise<AnyOverpassElement[]>>();

export const getData = cache(
  async (bbox?: [south: number, west: number, north: number, east: number]) => {
    const key = cacheKey(bbox);
    const cached = resultCache.get(key);
    if (cached && cached.expires > Date.now()) {
      console.debug(`OverPass cache hit for ${key}.`);
      return cached.elements;
    }
    const pending = inflight.get(key);
    if (pending) {
      return pending;
    }
    console.debug(`Querying OverPass API for ${key}...`);
    const promise = execWithRetry(bbox).then((result) => {
      const elements = result.elements as AnyOverpassElement[];
      resultCache.set(key, { expires: Date.now() + CACHE_TTL_MS, elements });
      console.debug(`Total results: ${elements.length}.`);
      return elements;
    });
    inflight.set(key, promise);
    try {
      return await promise;
    } finally {
      inflight.delete(key);
    }
  },
);

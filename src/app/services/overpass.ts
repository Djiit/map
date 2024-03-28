// @ts-expect-error
import { DefaultOverpassApi } from "overpass-ql-ts";
import { cache } from "react";

const api = DefaultOverpassApi();

export const getData = cache(async (query: any) =>
  api.execJson((s: any) => [s.node.query(query)]),
);

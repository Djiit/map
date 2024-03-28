import { cache } from "react";
// @ts-expect-error
import { DefaultOverpassApi } from "overpass-ql-ts";

const api = DefaultOverpassApi();

export const getData = cache(async (query: any) =>
  api.execJson((s: any) => [s.node.query(query)]),
);

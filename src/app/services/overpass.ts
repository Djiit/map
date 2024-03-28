import { cache } from "react";
import { DefaultOverpassApi } from "overpass-ql-ts";

const api = DefaultOverpassApi();

export const getData = cache(async (query: any) =>
  api.execJson((s) => [s.node.query(query)])
);

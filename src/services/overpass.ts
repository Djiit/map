import { DefaultOverpassApi, type OverpassQueryFilter } from "overpass-ql-ts";
import { cache } from "react";

const api = DefaultOverpassApi();

export const getData = cache(async (query: OverpassQueryFilter) => {
  const results = await api.execJson((s) => {
    return [s.node.query(query)];
  });
  console.debug(`Found ${results.elements.length} elements.`);
  return results.elements;
});

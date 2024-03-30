// @ts-expect-error
import { DefaultOverpassApi } from "overpass-ql-ts";
import { cache } from "react";

const api = DefaultOverpassApi();

export const getData = cache(async (query: any) => {
  const results = await api.execJson((s: any) => {
    return [s.node.query(query)];
  });
  console.debug(`Found ${results.elements.length} elements.`);
  return results.elements;
});

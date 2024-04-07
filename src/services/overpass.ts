import {
  type AnyOverpassElement,
  DefaultOverpassApi,
  OverpassOutputGeoInfo,
} from "overpass-ql-ts";
import { cache } from "react";

const QUERIES: { amenity?: string; tourism?: string }[] = [
  { amenity: "bar" },
  { amenity: "restaurant" },
  { amenity: "pub" },
  { amenity: "cafe" },
  { amenity: "food_court" },
  { amenity: "public building" },
  { amenity: "fast_food" },
  { tourism: "hotel" },
];

const api = DefaultOverpassApi();

export const getData = async () => {
  console.debug(`Querying OverPass API...`);
  const results = await Promise.all(
    QUERIES.map(
      cache(async (query) => {
        const result = await api.execJson(
          (s) => {
            return [
              s.node.query({
                ...query,
                changing_table: "yes",
              }),
            ];
          },
          { geoInfo: OverpassOutputGeoInfo.Geometry },
          { timeout: 10 }, // Same as Vercel function timeout
        );
        console.debug(
          `Found ${result.elements.length} ${JSON.stringify(query)} elements.`,
        );
        return result;
      }),
    ),
  );

  const totalResults = results.reduce(
    (acc, r) => acc.concat(r.elements),
    [] as AnyOverpassElement[],
  );
  console.debug(`Total results: ${totalResults.length}.`);
  return totalResults;
};

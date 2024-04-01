// @ts-expect-error
import {
  AnyOverpassElement,
  DefaultOverpassApi,
  OverpassOutputGeoInfo,
} from "overpass-ql-ts";

const AMENITIES = ["bar", "restaurant", "pub", "cafe", "food_court"];

const api = DefaultOverpassApi();

export const getData = async () => {
  console.debug(`Querying for ${AMENITIES.join(", ")} with changing table.`);
  const results = await Promise.all(
    AMENITIES.map(async (amenity) => {
      const result = await api.execJson((s: any) => {
        return [
          s.node.query(
            {
              amenity,
              changing_table: "yes",
            },
            { geoInfo: OverpassOutputGeoInfo.Geometry },
            { timeout: 10 }, // Same as Vercel function timeout
          ),
        ];
      });
      console.debug(`Found ${result.elements.length} ${amenity} elements.`);
      return result;
    }),
  );

  const totalResults = results.reduce(
    (acc, r: any) => acc.concat(r.elements),
    [],
  );
  console.debug(`Total results: ${totalResults.length}.`);
  return totalResults;
};

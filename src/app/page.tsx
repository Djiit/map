import dynamic from "next/dynamic";
import { getData } from "./services/overpass";

const LazyMap = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default async function Home() {
  const data = await getData({ amenity: "restaurant", changing_table: "yes" });
  return (
    <main>
      <LazyMap
        spots={data.elements.map((e: any) => ({
          position: [e.lat, e.lon],
          content: e.tags.name,
        }))}
      />
    </main>
  );
}

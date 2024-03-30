import dynamic from "next/dynamic";

import { getData } from "@/services/overpass";

const LazyMap = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const QUERY = {
  amenity: /(bar|restaurant|pub|cafe)/,
  changing_table: "yes",
};

export default async function Home() {
  const data = await getData(QUERY);
  return (
    <main className="h-full">
      <LazyMap
        spots={data.map((e: any) => ({
          position: [e.lat, e.lon],
          content: e.tags?.name,
        }))}
      />
    </main>
  );
}

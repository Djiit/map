import dynamic from "next/dynamic";

import { getData } from "@/services/overpass";

const LazyMap = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default async function Home() {
  const data = await getData();
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

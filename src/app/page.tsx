"use client";

import dynamic from "next/dynamic";

const LazyMap = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const spots = [
  {
    position: [51.505, -0.09],
    content: "London",
  },
  {
    position: [48.8566, 2.3522],
    content: "Paris",
  },
];

export default function Home() {
  return (
    <main>
      <LazyMap spots={spots} />
    </main>
  );
}

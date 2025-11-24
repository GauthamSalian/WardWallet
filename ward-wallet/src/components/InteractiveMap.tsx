// src/components/InteractiveMap.tsx
"use client";

import dynamic from "next/dynamic";

const InteractiveMapClient = dynamic(() => import("./InteractiveMapClient"), {
  ssr: false,
});

export default function InteractiveMap() {
  return <InteractiveMapClient />;
}

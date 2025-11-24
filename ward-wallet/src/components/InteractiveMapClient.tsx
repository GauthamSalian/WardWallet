"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L, { DivIcon } from "leaflet";
import { useState } from "react";
import dynamic from "next/dynamic";
import proposalsData from "@/data/proposals.json"; // ✅ import JSON

const ProjectModal = dynamic(() => import("@/components/ProjectModal"), {
  ssr: false,
});

const udupiCenter: [number, number] = [13.3409, 74.7421];

type ProjectType = "pending" | "active";

export type Project = {
  id: string;
  title: string;
  proposer_address: string;
  status: string;
  budget: number;
  ipfs_hash: string;
  created_at: string;
  position: [number, number];
  type: ProjectType;
};

// Randomize type for demo
const projects: Project[] = (proposalsData as Omit<Project, "type">[]).map(
  (p) => ({
    ...p,
    position: p.position as [number, number], // ✅ enforce tuple type
    type: Math.random() > 0.5 ? "active" : "pending",
  })
);

const getIcon = (type: ProjectType): DivIcon =>
  L.divIcon({
    className: "",
    html: `<svg width="24" height="24" viewBox="0 0 24 24" fill="${
      type === "pending" ? "red" : "green"
    }" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/></svg>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

export default function InteractiveMap() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <h2
        style={{
          color: "#fefffdff",
          fontFamily: "Poppins, sans-serif",
          fontSize: "1.5rem",
          fontWeight: 600,
        }}
      >
        Civic Projects Around Your Location
      </h2>

      <MapContainer
        center={udupiCenter}
        zoom={14}
        style={{
          height: "500px",
          width: "90%",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {projects.map((project) => (
          <Marker
            key={project.id}
            position={project.position}
            icon={getIcon(project.type)}
            eventHandlers={{
              click: () => setSelectedProject(project),
            }}
          />
        ))}
      </MapContainer>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}

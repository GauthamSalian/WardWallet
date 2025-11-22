// components/InteractiveMap.tsx
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useState } from "react";
import dynamic from "next/dynamic";

// Modal is dynamically imported to avoid SSR issues
const ProjectModal = dynamic(() => import("@/components/ProjectModal"), {
  ssr: false,
});

const udupiCenter: [number, number] = [13.3409, 74.7421]; // ✅ Udupi city center

type ProjectType = "pending" | "active";

type Project = {
  id: string;
  title: string;
  proposer_address: string;
  status: string;
  budget: number;
  ipfs_hash: string;
  created_at: string;
  position: [number, number]; // ✅ added coordinates
};

const projects: Project[] = [
  {
    id: "0xfe649c7d64a84f6b809ca1342d533a8847e6b5d339693122c1e8552c5d6ec744",
    title: "Fix Street Lights in Sector 9",
    proposer_address: "0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73",
    status: "open",
    budget: 1000000000,
    ipfs_hash: "bafybeih6tztra6u2rlub6m6h5aw4yqurtqrczoayhjlngrg7wt45afyl2i",
    created_at: "2025-11-09T00:03:00.000Z",
    position: [13.341, 74.7421], // near Udupi city
  },
  {
    id: "0x3c3c9edeffd9be36caf9b935d7778f4c9dd371fba97c8a0d6459f8f093bf287b",
    title: "Solar Streetlights for Sector 9",
    proposer_address: "0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73",
    status: "open",
    budget: 100000,
    ipfs_hash: "bafkreiajw2wlnc25pdimeunzrrrxv254jvegr6wm6224c4wotx5wf6tk7a",
    created_at: "2025-11-09T15:11:38.489Z",
    position: [13.3325, 74.746], // near Kalsanka
  },
  {
    id: "0xd4983c6f5546340d1d3daa682b6ce130a642b6e677b6bef04534f8908103abf3",
    title: "Smart Water Monitoring for Sector 9",
    proposer_address: "0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73",
    status: "open",
    budget: 15000000000,
    ipfs_hash: "bafybeiggjndc43shxejidxlxovq7sfdmd2q4n5mlpvqygxivbho5lh3u7q",
    created_at: "2025-11-10T03:13:51.017Z",
    position: [13.3265, 74.74], // near Manipal Lake
  },
  {
    id: "0x0e6232a68d65cf83e13742e6830cb1f2c69ea199850fb309ff25d3d7b15d072a",
    title: "Solar-Powered Street Lighting for Rural Udupi",
    proposer_address: "0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73",
    status: "open",
    budget: 0,
    ipfs_hash: "bafybeiew7lgz73oyuktamaenu2rcxjrcijk3pspzzoa6i77mcuhcuvv4rm",
    created_at: "2025-11-11T16:25:22.124Z",
    position: [13.35, 74.73], // rural outskirts
  },
  {
    id: "0x4659db3b248cae1bb6856ee63308af6c9c15239e3bb76f425fbacdd84bb15330",
    title: "Onboard Himalayan Herbs as a Verified Supplier",
    proposer_address: "0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73",
    status: "open",
    budget: 0,
    ipfs_hash: "bafybeiduyyflwywkyd3hwq5o4ulizojmkk5h7qlw5waivv52s4idipouvu",
    created_at: "2025-11-12T16:15:14.684Z",
    position: [13.338, 74.75], // near Udupi market
  },
  {
    id: "0x4f6eeeca2c2f08ad93acd3567d4513fdb2d5811badc88f0b16e349c652dcf257",
    title: "GreenConnect: Cultivating Community Through Technology",
    proposer_address: "0xed9d02e382b34818e88B88a309c7fe71E65f419d",
    status: "open",
    budget: 0,
    ipfs_hash: "bafkreidpwgtw2brijldt4t72sadvk2nomh24tvtbsyzciycwxqmbldp2qy",
    created_at: "2025-11-13T15:52:42.722Z",
    position: [13.32, 74.755], // near MIT Manipal
  },
  {
    id: "0xcac4298d34b1aeacd6174c118a10ed890dada1e6da5050756478f91187a33d05",
    title:
      "Project Nirmal: Smart Waste & Water Quality Initiative for Manipal Lake",
    proposer_address: "0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73",
    status: "open",
    budget: 0,
    ipfs_hash: "bafkreidpwgtw2brijldt4t72sadvk2nomh24tvtbsyzciycwxqmbldp2qy",
    created_at: "2025-11-16T02:39:02.538Z",
    position: [13.325, 74.7405], // Manipal Lake
  },
  {
    id: "0x38382ebd6e57051e4a014c6de79def4fa8973941ffd21d67db7c9051514b0c43",
    title: "Fix Potholes on Kalsanka-Manipal Road After Monsoon",
    proposer_address: "0xed9d02e382b34818e88B88a309c7fe71E65f419d",
    status: "open",
    budget: 0,
    ipfs_hash: "bafkreidpwgtw2brijldt4t72sadvk2nomh24tvtbsyzciycwxqmbldp2qy",
    created_at: "2025-11-16T14:18:37.932Z",
    position: [13.33, 74.745], // Kalsanka-Manipal Road
  },
  {
    id: "0xf8c50e7b61e220bcda407e07a46a21eaa169b6b269900d8d2fd4e955e856eb64",
    title: "Enhancing Urban Green Spaces with Smart Irrigation",
    proposer_address: "0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73",
    status: "open",
    budget: 0,
    ipfs_hash: "bafybeictixni3pshli6wop3xth2tqqznftrjv5c6ma24doneniwhub2pcu",
    created_at: "2025-11-20T07:09:34.045Z",
    position: [13.34, 74.735], // near Udupi park
  },
];

const getIcon = (type: "pending" | "active") =>
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
            icon={getIcon(project.status === "open" ? "pending" : "active")}
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

// components/ProjectModal.tsx
"use client";

export default function ProjectModal({ project, onClose }: any) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "300px",
        height: "100%",
        backgroundColor: "#111",
        color: "#39FF14",
        fontFamily: "monospace",
        padding: "20px",
        boxShadow: "-2px 0 5px rgba(0,0,0,0.5)",
        zIndex: 1000,
      }}
    >
      <button
        onClick={onClose}
        style={{
          background: "none",
          border: "1px solid #39FF14",
          color: "#39FF14",
          padding: "4px 8px",
          cursor: "pointer",
          marginBottom: "10px",
        }}
      >
        Close
      </button>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
    </div>
  );
}

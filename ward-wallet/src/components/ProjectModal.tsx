"use client";

import styles from "./ProjectModal.module.css";
import { useAuditor } from "@/context/AuditorContext";
import { Project } from "./InteractiveMapClient";
import { useRouter } from "next/navigation";

type Props = {
  project: Project;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  const router = useRouter();
  const { addXp } = useAuditor();

  const handleViewHistory = () => {
    addXp(30, "Viewed Project History");
    router.push(`/history/${project.id}`);
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>

        <h2 className={styles.title}>{project.title}</h2>

        <div className={styles.details}>
          <p>
            <strong>Status:</strong> {project.status}
          </p>
          <p>
            <strong>Budget:</strong> ₹{project.budget.toLocaleString()}
          </p>
          <p>
            <strong>Proposer:</strong> {project.proposer_address}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(project.created_at).toLocaleString()}
          </p>
          <p>
            <strong>IPFS Hash:</strong> <code>{project.ipfs_hash}</code>
          </p>
        </div>

        <button
          onClick={handleViewHistory}
          className="mt-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 rounded-lg shadow-lg transition hover:scale-[1.02]"
        >
          📜 View Project History{" "}
          <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded">
            +30 XP
          </span>
        </button>
      </div>
    </div>
  );
}

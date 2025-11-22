"use client";

import styles from "./ProjectModal.module.css";
import { Project } from "./InteractiveMapClient";
import { useRouter } from "next/navigation";

type Props = {
  project: Project;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  const router = useRouter();

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
          className={styles.historyButton}
          onClick={() => router.push(`/history/${project.id}`)}
        >
          View Project History
        </button>
      </div>
    </div>
  );
}

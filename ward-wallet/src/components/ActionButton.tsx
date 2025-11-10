import { ReactNode } from "react";
import styles from "./ActionButton.module.css";

type ActionButtonProps = {
  onClick: () => void;
  children: ReactNode;
  variant?: "approve" | "complete";
  className?: string;
};

export function ActionButton({
  onClick,
  children,
  variant = "approve",
  className,
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${styles.actionButton} ${styles[variant]} ${className || ""}`}
    >
      {children}
    </button>
  );
}

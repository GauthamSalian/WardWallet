import { ReactNode } from "react";
import styles from "./ActionButton.module.css";

type ActionButtonProps = {
  onClick: () => void;
  children: ReactNode;
  variant?: "approve" | "complete" | "reject";
  className?: string;
  disabled?: boolean;
};

export function ActionButton({
  onClick,
  children,
  variant = "approve",
  className,
  disabled = false,
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.actionButton} ${styles[variant]} ${className || ""}`}
    >
      {children}
    </button>
  );
}

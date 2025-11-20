import React from "react";
import styles from "./BidCard.module.css";
import { Bid } from "@/types/bid";

type BidCardProps = {
  bid: Bid;
};

export function BidCard({ bid }: BidCardProps) {
  return (
    <div className={styles.bidCard}>
      <div className={styles.left}>
        <div className={styles.company}>{bid.companyName}</div>
        <div className={styles.meta}>
          {bid.bidderAddress ? `${bid.bidderAddress} · ` : ""}
          {new Date(Number(bid.timestamp)).toLocaleString()}
        </div>
      </div>
      <div className={styles.amount}>₹{bid.bidAmount}</div>
    </div>
  );
}

export default BidCard;

"use client";

import { useConnect } from "wagmi";
import { injected } from "wagmi/connectors";

export function ConnectWallet() {
  const { connect, connectors, isPending } = useConnect();

  return (
    <button onClick={() => connect({ connector: injected() })}>
      {isPending ? "Connecting..." : "Connect Wallet"}
    </button>
  );
}

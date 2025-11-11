import { ProvidersClient } from "./components/ProvidersClient";
import { WalletStatus } from "./components/WalletStatus";

export default function App() {
  return (
    <ProvidersClient>
      <WalletStatus />
    </ProvidersClient>
  );
}

import { ProvidersClient } from "../components/ProvidersClient";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { AuditorProvider } from "@/context/AuditorContext";

export const metadata = {
  title: "Ward Wallet",
  description: "My Awesome dApp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* ProvidersClient sets up WagmiProvider and RainbowKit */}
        <ProvidersClient>
          {/* AuditorProvider must be inside WagmiProvider */}
          <AuditorProvider>{children}</AuditorProvider>
        </ProvidersClient>
      </body>
    </html>
  );
}

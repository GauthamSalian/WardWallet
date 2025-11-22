import { ProvidersClient } from "../components/ProvidersClient"; // Import from components directory
import "./globals.css";
import "leaflet/dist/leaflet.css";

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
        {/* This wrapper provides wagmi and Web3Modal to your whole app */}
        <ProvidersClient>{children}</ProvidersClient>
      </body>
    </html>
  );
}

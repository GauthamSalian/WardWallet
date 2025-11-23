# WardWallet 🛡️
### Transparent, Citizen-Driven Governance on Blockchain

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg) ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![Solidity](https://img.shields.io/badge/Solidity-^0.8.0-363636) ![Status](https://img.shields.io/badge/Status-Beta-green)

**WardWallet** is a blockchain-powered "Governance Command Center" designed to transform municipal administration. By visualizing public funds in real-time and gamifying the auditing process, we aim to rebuild citizen trust and make corruption mathematically impossible.

Our vision is a future **"where every citizen is an auditor and every decision is transparent."**

---

## ⚠️ The Problem: Broken Trust in Public Governance

Current systems for managing public projects are "Black Boxes" that fail our communities:
* **Corruption & Misuse:** Funds disappear into opaque ledgers with no accountability.
* **Opaque Bidding:** Contractor selection is often rigged behind closed doors.
* **Citizen Exclusion:** Communities have no real-time visibility into the projects affecting their neighborhoods.
* **Passive Apathy:** Citizens feel powerless to check government work because the process is boring and bureaucratic.

---

## ✨ Core Features

WardWallet combines a futuristic user interface with robust blockchain logic:

### 🎮 The Citizen Command Center (User Experience)
* **🟢 Live Governance Ticker:** A real-time "Pulse of Democracy" broadcasting every vote, bid, and fund release as it happens on the blockchain.
* **🗺️ Geospatial Map:** An interactive Dark Mode map that visualizes public spending by location. See exactly which neighborhood projects are active, pending, or delayed.
* **🛡️ Civilian Auditor System (Gamification):** Users earn **XP and Levels** for verifying proof-of-work. We turn passive residents into active "City Guardians" who validate real-world progress to earn reputation.

### 🏛️ The Governance Engine (Blockchain Logic)
* **💰 Staged "Trustless" Payments:** Funds are not released all at once. The Smart Contract escrows the budget and releases it in 4 tranches (25%, 50%, 75%, 100%) **only** after milestone verification.
* **⚖️ Transparent Bidding:** A fair, open-bidding system where contractors submit sealed bids that are revealed simultaneously, preventing backroom deals and favoritism.
* **🔏 Verified Approvals:** Every government approval is cryptographically signed and logged. We replace paper signatures with digital signatures that can never be forged.
* **📂 Immutable History (IPFS):** All project evidence—photos, invoices, inspection reports—is pinned to IPFS. Once uploaded, history cannot be deleted or altered by corrupt officials.
* **🗳️ Community Proposals:** A direct democratic channel for citizens to propose new infrastructure projects and vote on their priority.

---

## 🚀 How It Works: The Trust Protocol

1.  **Citizen Proposal:** A community member submits a project proposal via the dashboard.
2.  **Transparent Bidding:** Contractors submit sealed bids. The Smart Contract reveals them all simultaneously to ensure fair competition.
3.  **Official Approval:** Municipal officials sign off using their digital wallet identity.
4.  **Execution & Verification:**
    * Contractor uploads proof (photo/video) to IPFS.
    * **Civilian Auditors** (You!) verify the proof on the Interactive Map.
    * Smart Contract unlocks the next tranche of funds automatically based on consensus.

---

## 🛠️ Tech Stack

WardWallet is built with an enterprise-grade, secure, and scalable architecture:

* **Smart Contracts:** `Solidity` (Manages escrow, bidding logic, and reputation scoring).
* **Frontend:** `Next.js` + `TypeScript` (The responsive Command Center dashboard).
* **Mapping Engine:** `Leaflet.js` with Custom Dark Mode filters for geospatial visualization.
* **Gamification Logic:** React Context API + LocalStorage persistence for XP tracking.
* **Blockchain Integration:** `Wagmi` / `Viem` for seamless wallet connectivity.
* **Decentralized Storage:** `IPFS` / `Pinata` for tamper-proof evidence storage.
* **Infrastructure:** `Docker` + `Hyperledger Besu` (Private Chain) for municipal deployment testing.

---

## 📦 Prerequisites

* Node.js (v18.x or later)
* npm / pnpm / yarn
* Docker (Optional, for private chain setup)
* A browser-based wallet (e.g., MetaMask, Rainbow)

## ⚡ Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/WardWallet.git](https://github.com/YOUR_USERNAME/WardWallet.git)
    cd WardWallet
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open the Command Center:**
    Navigate to `http://localhost:3000` to start auditing.

---

## 📄 License

This project is licensed under the **MIT License**. See the `LICENSE.md` file for details.

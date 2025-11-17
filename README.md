# WardWallet
> Transparent, Citizen-Driven Governance on Blockchain

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Solidity](https://img.shields.io/badge/Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white)](https://soliditylang.org/)
[![IPFS](https://img.shields.io/badge/IPFS-65C2CB?style=for-the-badge&logo=ipfs&logoColor=white)](https://ipfs.tech/)

WardWallet is a blockchain-powered platform designed to transform municipal governance by placing transparency and accountability at the center of every decision. It aims to rebuild citizen trust by reducing corruption and making governance accessible to everyone.

Our vision is a future "where every citizen is an auditor and every decision is transparent."

## ⚠️ The Problem: Broken Trust in Public Governance

Current systems for managing public projects often fail our communities:
* **Corruption & Misuse:** Public projects suffer from fund mismanagement, which erodes community trust.
* **Opaque Bidding:** Contractor selection processes lack transparency, creating opportunities for favoritism.
* **No Accountability:** A lack of immutable records makes it impossible to verify project history and expenditures.
* **Citizens Excluded:** Communities have no voice in the governance decisions that directly impact their neighborhoods.

## ✨ Core Features

WardWallet addresses these problems with a suite of features built on a foundation of transparency:

* **Citizen Proposals:** Community members can create and submit project proposals, complete with built-in reward incentives.
* **Transparent Bidding:** Contractors submit bids in an open, auditable system visible to all stakeholders, eliminating backroom deals.
* **Verified Approvals:** All government approvals are logged permanently and cryptographically signed on-chain, creating an immutable audit trail.
* **Staged Payments:** Funds are released in four phases (e.g., 25%, 50%, 75%, 100%) tied to verified milestones, protecting budgets and ensuring accountability.
* **Immutable History:** All documents, progress photos, invoices, and project updates are stored on IPFS, ensuring tamper-proof verification.
* **Community Governance:** Citizens can vote on proposals, report issues in real-time, and provide feedback, creating true participatory democracy.

## 🚀 How It Works: From Proposal to Completion

The project lifecycle is transparent from start to finish:

1.  **Citizen Submission:** A community member uses the web interface to submit a detailed proposal, including budget, timeline, and expected impact.
2.  **Transparent Bidding:** Qualified contractors review the requirements and submit competitive bids, which are visible to all.
3.  **Official Approval:** Municipal officials review the bids, verify contractor credentials, and approve the project on-chain with a digital signature.
4.  **Milestone Payments:** A smart contract automatically releases funds to the contractor as verified proof-of-work is provided for each milestone (25%, 50%, 75%, 100%).
5.  **Immutable Storage:** All progress photos, inspection reports, and invoices are uploaded to IPFS with permanent hashes.
6.  **Citizen Accountability:** Community members vote on the final project quality, report any issues, and provide feedback that influences contractor reputation.

## 🛠️ Tech Stack

WardWallet is built with an enterprise-grade, secure, and scalable architecture:

* **Smart Contracts:** **Solidity** manages all proposals, bidding logic, payment distribution, and governance rules.
* **Frontend:** **Next.js + TypeScript** powers the responsive, type-safe project dashboard for all users.
* **Blockchain Integration:** **Wagmi / Viem** provides seamless blockchain connectivity and wallet management.
* **Decentralized Storage:** **IPFS / Pinata** ensures permanent, tamper-proof storage for all project documentation and evidence files.
* **Database:** **AWS DynamoDB** handles real-time comments, feedback loops, and user notification systems.
* **Authentication:** **JWT** implements secure, role-based access control (RBAC) to distinguish between citizens, contractors, and officials.
* **Blockchain Infrastructure:** **Docker + Hyperledger Besu / Quorum** is used to deploy a private blockchain infrastructure optimized for municipal governance requirements.

### Prerequisites

* Node.js (v18.x or later)
* npm / pnpm / yarn
* Docker
* A browser-based wallet (e.g., MetaMask)

### Installation

1.  Clone the repository:
    ```sh
    git clone [https://github.com/](https://github.com/)[YOUR_USERNAME]/WardWallet.git
    cd WardWallet
    ```

2.  Install frontend dependencies:
    ```sh
    npm install
    # or
    pnpm install
    ```

3.  Run the development server:
    ```sh
    npm run dev
    ```


## 📄 License

This project is licensed under the **MIT License**. See the `LICENSE.md` file for details.

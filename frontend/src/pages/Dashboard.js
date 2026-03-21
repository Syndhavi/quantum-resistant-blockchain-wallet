import React, { useState } from "react";
import WalletCreate from "../components/WalletCreate";
import Balance from "../components/Balance";
import SendTransaction from "../components/SendTransaction";

const Dashboard = () => {
  const [wallet, setWallet] = useState(null);

  return (
    <div>
      <h1 className="title">💼 Quantum Resistant Wallet</h1>

      <div className="grid">
        <WalletCreate setWallet={setWallet} />
        <Balance wallet={wallet} />
        <SendTransaction wallet={wallet} />
      </div>
    </div>
  );
};

export default Dashboard;
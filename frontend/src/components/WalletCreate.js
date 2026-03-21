import React, { useState } from "react";

const API_BASE = "http://127.0.0.1:5000";

const WalletCreate = ({ setWallet }) => {
  const [loading, setLoading] = useState(false);

  const createWallet = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/create-wallet`, {
        method: "POST",
      });

      const data = await res.json();
      setWallet(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="card">
      <h2>🔐 Create Wallet</h2>
      <p>Generate a secure blockchain wallet.</p>

      <button onClick={createWallet}>
        {loading ? "Generating..." : "Generate Wallet"}
      </button>
    </div>
  );
};

export default WalletCreate;
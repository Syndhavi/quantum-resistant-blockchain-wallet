import React, { useEffect, useState } from "react";

const API_BASE = "http://127.0.0.1:5000";

const Balance = ({ wallet }) => {
  const [balance, setBalance] = useState(null);

  const fetchBalance = async () => {
    if (!wallet) return;

    try {
      const res = await fetch(
        `${API_BASE}/balance?address=${wallet.address}`
      );
      const data = await res.json();
      setBalance(data.balance);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [wallet]);

  return (
    <div className="card">
      <h2>💰 Balance</h2>

      {wallet ? (
        <>
          <div className="info-box">
            <b>Address:</b>
            <p className="mono">{wallet.address}</p>
          </div>

          <h3 className="balance">
            {balance !== null ? `${balance} ETH` : "Loading..."}
          </h3>

          <button onClick={fetchBalance}>🔄 Refresh</button>
        </>
      ) : (
        <p>No wallet created yet.</p>
      )}
    </div>
  );
};

export default Balance;
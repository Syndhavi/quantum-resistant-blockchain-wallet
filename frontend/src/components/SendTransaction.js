import React, { useState } from "react";

const API_BASE = "http://127.0.0.1:5000";

const SendTransaction = ({ wallet }) => {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const sendTransaction = async () => {
    try {
      const res = await fetch(`${API_BASE}/send-transaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: wallet?.address,
          to,
          amount,
        }),
      });

      const data = await res.json();
      setStatus(data.message);
    } catch (err) {
      console.error(err);
      setStatus("Transaction failed ❌");
    }
  };

  return (
    <div className="card">
      <h2>🚀 Send Transaction</h2>

      <input
        type="text"
        placeholder="Recipient Address"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={sendTransaction} disabled={!wallet}>
        Send
      </button>

      {status && <p className="status">{status}</p>}
    </div>
  );
};

export default SendTransaction;
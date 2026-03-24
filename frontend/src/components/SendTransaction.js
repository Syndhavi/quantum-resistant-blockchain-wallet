import React, { useState } from "react";

const API_BASE = "http://127.0.0.1:5000";

const SendTransaction = () => {
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const sendTransaction = async () => {
    if (!sender || !receiver || !privateKey || !amount) {
      setStatus("⚠️ Fill all fields");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/send-transaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: sender,
          receiver: receiver,
          private_key: privateKey,
          amount: amount,
        }),
      });

      const data = await res.json();

      if (res.status === 200) {
        setStatus(`✅ TX Hash: ${data.tx_hash}`);
      } else {
        setStatus(`❌ ${data.error}`);
      }

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
        placeholder="Sender Address"
        value={sender}
        onChange={(e) => setSender(e.target.value)}
      />

      <input
        type="text"
        placeholder="Receiver Address"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
      />

      <input
        type="text"
        placeholder="Sender Private Key"
        value={privateKey}
        onChange={(e) => setPrivateKey(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount (ETH)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={sendTransaction}>
        Send
      </button>

      {status && <p className="status">{status}</p>}
    </div>
  );
};

export default SendTransaction;
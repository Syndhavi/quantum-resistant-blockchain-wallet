import React, { useState } from "react";

const API_BASE = "http://127.0.0.1:5000";

const Balance = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBalance = async () => {
    if (!address) {
      alert("Please enter a valid Ganache address");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${API_BASE}/balance?address=${address}`
      );
      const data = await res.json();

      setBalance(data.balance);
    } catch (err) {
      console.error(err);
      setBalance("Error fetching balance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>💰 Balance</h2>

      {/* Address Input */}
      <input
        type="text"
        placeholder="Enter Ganache Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="input"
      />

      {/* Button */}
      <button onClick={fetchBalance} className="button">
        {loading ? "Checking..." : "Check Balance"}
      </button>

      {/* Result */}
      {balance !== null && (
        <h3 className="balance">
          {balance === "Error fetching balance"
            ? balance
            : `${balance} ETH`}
        </h3>
      )}
    </div>
  );
};

export default Balance;
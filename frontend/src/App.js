import React, { useState } from "react";
import {
  createWallet,
  signMessage,
  sendTransaction,
  getBalance,
} from "./api";

function App() {
  const [wallet, setWallet] = useState({});
  const [message, setMessage] = useState("");
  const [pqcKey, setPqcKey] = useState("");
  const [signature, setSignature] = useState("");

  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [ethKey, setEthKey] = useState("");
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState("");

  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

  return (
    <div style={styles.container}>
      <h1>🔐 PQC + Blockchain Wallet</h1>

      {/* Create Wallet */}
      <div style={styles.card}>
        <h3>Create Wallet</h3>
        <button onClick={async () => setWallet(await createWallet())}>
          Generate Wallet
        </button>
        <pre>{JSON.stringify(wallet, null, 2)}</pre>
      </div>

      {/* Sign Message */}
      <div style={styles.card}>
        <h3>Sign Message</h3>
        <input placeholder="Message" onChange={(e) => setMessage(e.target.value)} />
        <input placeholder="PQC Private Key" onChange={(e) => setPqcKey(e.target.value)} />
        <button
          onClick={async () => {
            const res = await signMessage(message, pqcKey);
            setSignature(res.signature || "Error");
          }}
        >
          Sign
        </button>
        <p>{signature}</p>
      </div>

      {/* Send Transaction */}
      <div style={styles.card}>
        <h3>Send Transaction</h3>
        <input placeholder="Sender Address" onChange={(e) => setSender(e.target.value)} />
        <input placeholder="Receiver Address" onChange={(e) => setReceiver(e.target.value)} />
        <input placeholder="Private Key" onChange={(e) => setEthKey(e.target.value)} />
        <input placeholder="Amount ETH" onChange={(e) => setAmount(e.target.value)} />
        <button
          onClick={async () => {
            const res = await sendTransaction(sender, receiver, ethKey, amount);
            setTxHash(res.tx_hash || JSON.stringify(res));
          }}
        >
          Send Transaction
        </button>
        <p>{txHash}</p>
      </div>

      {/* Check Balance */}
      <div style={styles.card}>
        <h3>Check Balance</h3>
        <input placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
        <button
          onClick={async () => {
            const res = await getBalance(address);
            setBalance(res.balance || "Error");
          }}
        >
          Check Balance
        </button>
        <p>{balance}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Arial",
    backgroundColor: "#f4f6f8",
  },
  card: {
    background: "#fff",
    padding: "20px",
    margin: "20px 0",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
};

export default App;
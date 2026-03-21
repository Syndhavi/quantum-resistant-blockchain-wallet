const BASE_URL = "http://127.0.0.1:5000";

// Create Wallet
export const createWallet = async () => {
  const res = await fetch(`${BASE_URL}/create-wallet`, { method: "POST" });
  return res.json();
};

// Sign Message
export const signMessage = async (message, private_key) => {
  const res = await fetch(`${BASE_URL}/sign-transaction`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, private_key }),
  });
  return res.json();
};

// Send Transaction
export const sendTransaction = async (sender, receiver, private_key, amount) => {
  const res = await fetch(`${BASE_URL}/send-transaction`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sender, receiver, private_key, amount }),
  });
  return res.json();
};

// Get Balance
export const getBalance = async (address) => {
  const res = await fetch(`${BASE_URL}/balance?address=${address}`);
  return res.json();
};
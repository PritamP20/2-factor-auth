import React, { useState } from "react";
import { ethers } from "ethers";
import { motion } from "framer-motion";

const Wallet = ({ setTab }) => {
  const [wallet, setWallet] = useState(null);
  const [copied, setCopied] = useState(false);

  const createWallet = () => {
    const newWallet = ethers.Wallet.createRandom();
    setWallet(newWallet);
    localStorage.setItem("address", newWallet.address); 
    localStorage.setItem("privateKey", newWallet.privateKey);
    setTab("login"); // Redirect to login page after wallet creation
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.div className="flex flex-col items-center justify-center p-5 bg-gray-900 text-white rounded-lg shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-bold mb-4">Create Your Wallet</h2>
      <button
        onClick={createWallet}
        className="bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-600 transition"
      >
        Generate Wallet
      </button>

      {wallet && (
        <div className="mt-4 p-4 bg-gray-800 rounded-md w-full">
          <p><strong>Address:</strong> {wallet.address}</p>
          <button
            onClick={() => copyToClipboard(wallet.address)}
            className="text-sm text-blue-400 underline"
          >
            {copied ? "Copied!" : "Copy Address"}
          </button>

          <p className="mt-2"><strong>Private Key:</strong> {wallet.privateKey}</p>
          <button
            onClick={() => copyToClipboard(wallet.privateKey)}
            className="text-sm text-red-400 underline"
          >
            {copied ? "Copied!" : "Copy Private Key"}
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default Wallet;
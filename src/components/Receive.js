import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Copy, CheckCircle } from "lucide-react";

const Receive = ({ setTab }) => {
  const [address, setAddress] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const storedAddress = localStorage.getItem("address");
    if (storedAddress) {
      setAddress(storedAddress);
    }
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.div className="flex flex-col h-full p-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div className="flex items-center mb-6">
        <button onClick={() => setTab("home")} className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 mr-4">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-bold">Receive ETH</h2>
      </motion.div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-white p-4 rounded-xl mb-6 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-20 rounded-xl"></div>
          <div className="relative">
            <p className="text-sm text-gray-400 mb-2 text-center">Your Wallet Address</p>
            <div className="flex items-center justify-between bg-gray-900/70 p-3 rounded-lg border border-gray-700/50">
              <p className="text-sm font-mono text-gray-300 truncate mr-2">{address}</p>
              <button onClick={copyToClipboard} className="text-gray-400 hover:text-white">
                {copied ? <CheckCircle size={18} className="text-green-400" /> : <Copy size={18} />}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 w-full max-w-md relative overflow-hidden">
          <p className="text-blue-300 text-sm">
            <strong>Tip:</strong> Share this address to receive ETH and other tokens on the Sepolia network.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Receive;
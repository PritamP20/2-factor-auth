import React, { useState, useEffect } from "react";
import { ArrowUpRight, ArrowDownLeft, RefreshCw, Settings, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { ethers } from "ethers";

const Home = ({ setTab }) => {
  const [balance, setBalance] = useState("0");
  const [address, setAddress] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const storedAddress = localStorage.getItem("address");
    if (storedAddress) {
      setAddress(storedAddress);
    }
    const getBalance = async () => {
      if (!address) return; // Ensure address is valid

      try {
        const provider = new ethers.JsonRpcProvider(
          "https://eth-sepolia.g.alchemy.com/v2/demo"
        );
        const balanceWei = await provider.getBalance(address);
        const balanceEther = ethers.formatEther(balanceWei); // Convert to Ether
        setBalance(balanceEther);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    getBalance();
  }, []);

  const formatAddress = (addr) => {
    if (!addr) return "";
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const refreshBalance = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <motion.div className="flex flex-col h-full p-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold">S</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-200">Account 4</p>
            <p className="text-xs text-gray-400">{formatAddress(address)} &nbsp;
              <button onClick={() => copyToClipboard(address)}>Copy</button>
            </p>
          </div>
        </div>
        <button onClick={() => setTab("settings")} className="p-2 rounded-full bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 transition-all">
          <Settings size={18} className="text-gray-300" />
        </button>
      </motion.div>

      <motion.div className="glass-morphism rounded-2xl p-6 mb-6">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-gray-400">Total Balance</p>
          <button onClick={refreshBalance} className="text-gray-400 hover:text-gray-200">
            <RefreshCw size={16} />
          </button>
        </div>
        <h2 className="text-3xl font-bold mb-1">{balance} <span className="text-xl">SepoliaETH</span></h2>
        <div className="flex items-center text-sm text-gray-400">
          <span>≈ $0.00 USD</span>
          <span className="ml-2 text-green-400 flex items-center">
            <TrendingUp size={14} className="mr-1" />
            +$0 (0.00%)
          </span>
        </div>
      </motion.div>

      <motion.div className="grid grid-cols-3 gap-3 mb-6">
        <button onClick={() => setTab("swap")} className="flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600/80 to-indigo-800/80 backdrop-blur-sm p-4 rounded-xl shadow-lg">
          <div className="bg-indigo-500/30 p-2 rounded-full mb-2">
            <RefreshCw size={20} className="text-white" />
          </div>
          <span className="text-sm font-medium">Swap</span>
        </button>
        
        <button onClick={() => setTab("send")} className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-600/80 to-blue-800/80 backdrop-blur-sm p-4 rounded-xl shadow-lg">
          <div className="bg-blue-500/30 p-2 rounded-full mb-2">
            <ArrowUpRight size={20} className="text-white" />
          </div>
          <span className="text-sm font-medium">Send</span>
        </button>
        
        <button onClick={() => setTab("receive")} className="flex flex-col items-center justify-center bg-gradient-to-br from-purple-600/80 to-purple-800/80 backdrop-blur-sm p-4 rounded-xl shadow-lg">
          <div className="bg-purple-500/30 p-2 rounded-full mb-2">
            <ArrowDownLeft size={20} className="text-white" />
          </div>
          <span className="text-sm font-medium">Receive</span>
        </button>
      </motion.div>

      <motion.div className="flex-1 overflow-hidden">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-gray-300">Assets</h3>
          <button className="text-xs text-blue-400">View all</button>
        </div>
        
        <div className="space-y-3 overflow-y-auto max-h-[180px] pr-1">
          <div className="flex justify-between items-center glass-morphism p-4 rounded-xl border border-gray-700/30 relative overflow-hidden">
            <div className="flex items-center space-x-3 relative z-10">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center border border-gray-600">
                <span className="text-white font-medium">S</span>
              </div>
              <div>
                <p className="font-medium">SepoliaETH</p>
                <p className="text-xs text-gray-400">Sepolia Testnet</p>
              </div>
            </div>
            <div className="text-right relative z-10">
              <p className="font-medium">{balance}</p>
              <p className="text-xs text-gray-400">≈ $0.00</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
// import React from 'react'

// const Home = () => {
//   return (
//     <div>
//       Home
//     </div>
//   )
// }

// export default Home

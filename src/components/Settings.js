import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Moon, Sun, Shield, LogOut, Trash2, AlertTriangle } from "lucide-react";

const Settings = ({ setTab }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const storedAddress = localStorage.getItem("address");
    if (storedAddress) {
      setAddress(storedAddress);
    }
  }, []);

  const formatAddress = (addr) => {
    if (!addr) return "";
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const handleDeleteWallet = () => {
    if (showDeleteConfirm) {
      // Clear wallet data
      localStorage.removeItem("address");
      localStorage.removeItem("privateKey");
      setTab("login"); // Redirect to login page after deleting the wallet
    } else {
      setShowDeleteConfirm(true);
    }
  };

  const handleLogout = () => {
    setTab("login"); // Redirect to login page on logout
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <motion.div 
      className="flex flex-col h-full p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div 
        className="flex items-center mb-6"
        variants={itemVariants}
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.9, rotate: 0 }}
          onClick={() => setTab("home")}
          className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 mr-4 button-3d"
        >
          <ArrowLeft size={20} />
        </motion.button>
        <h2 className="text-xl font-bold neon-purple">Settings</h2>
      </motion.div>

      <div className="flex-1">
        {/* Account Section */}
        <motion.div 
          className="glass-morphism rounded-xl p-4 mb-6 border border-gray-700/50 relative overflow-hidden"
          variants={itemVariants}
          whileHover={{ 
            y: -5, 
            boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.3)"
          }}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-blue-500/10 blur-xl opacity-70"></div>
          <div className="relative z-10">
            <h3 className="text-sm font-medium text-gray-300 mb-3">Account</h3>
            
            <motion.div 
              className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg mb-3 card-3d"
              whileHover={{ 
                scale: 1.02,
                rotateX: 2,
                rotateY: 2
              }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg holographic">
                <span className="text-white font-bold">S</span>
              </div>
              <div>
                <p className="font-medium">Account 4</p>
                <p className="text-xs text-gray-400">{formatAddress(address)}</p>
              </div>
            </motion.div>
            
            <div className="space-y-2">
              <motion.button 
                className="w-full flex items-center justify-between p-3 bg-gray-700/30 hover:bg-gray-700/50 rounded-lg transition-colors button-3d"
                whileHover={{ 
                  scale: 1.02,
                  x: 5
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center">
                  <Shield size={18} className="mr-2 text-blue-400" />
                  Security Settings
                </span>
                <span className="text-gray-400">›</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
        
        {/* Danger Zone */}
        <motion.div 
          className="glass-morphism rounded-xl p-4 mb-6 border border-gray-700/50 relative overflow-hidden"
          variants={itemVariants}
          whileHover={{ 
            y: -5, 
            boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.3)"
          }}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 blur-xl opacity-70"></div>
          <div className="relative z-10">
            <h3 className="text-sm font-medium text-red-400 mb-3 flex items-center">
              <AlertTriangle size={16} className="mr-1" />
              Danger Zone
            </h3>
            
            <div className="space-y-3">
              <motion.button 
                onClick={handleLogout}
                className="w-full flex items-center justify-between p-3 bg-gray-700/30 hover:bg-gray-700/50 rounded-lg transition-colors button-3d"
                whileHover={{ 
                  scale: 1.02,
                  x: 5
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center text-gray-300">
                  <LogOut size={18} className="mr-2 text-yellow-400" />
                  Log Out
                </span>
                <span className="text-gray-400">›</span>
              </motion.button>
              
              <motion.button 
                onClick={handleDeleteWallet}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors button-3d ${
                  showDeleteConfirm 
                    ? 'bg-red-600/70 hover:bg-red-600 pulse-glow' 
                    : 'bg-red-900/30 hover:bg-red-900/50'
                }`}
                whileHover={{ 
                  scale: 1.02,
                  x: showDeleteConfirm ? 0 : 5
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center text-white">
                  <Trash2 size={18} className="mr-2 text-red-300" />
                  {showDeleteConfirm ? 'Confirm Delete Wallet' : 'Delete Wallet'}
                </span>
                {!showDeleteConfirm && <span className="text-gray-400">›</span>}
              </motion.button>
              
              {showDeleteConfirm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-start relative overflow-hidden"
                >
                  <div className="absolute inset-0 shimmer"></div>
                  <div className="relative z-10 flex items-start">
                    <AlertTriangle size={16} className="text-red-400 mr-2 mt-0.5" />
                    <p className="text-red-300 text-xs">
                      This action is irreversible. Make sure you have backed up your private key before deleting your wallet.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
        
        {/* Version Info */}
        <motion.div 
          className="text-center text-gray-500 text-xs"
          variants={itemVariants}
        >
          <p>Crypto Wallet Extension v1.0.0</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Settings;
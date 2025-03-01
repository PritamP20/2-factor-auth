import React, { useState, useEffect } from "react";
import Wallet from "./components/Wallet";
import Home from "./components/Home";
import Send from "./components/Send";
import Receive from "./components/Receive";
import Swap from "./components/Swap";
import Settings from "./components/Settings";
import Login from "./components/Login"; 
import PasswordEntry from "./components/PasswordEntry"; // Import the new component
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [tab, setTab] = useState("passwordEntry"); // Start with PasswordEntry
  const [previousTab, setPreviousTab] = useState("");

  useEffect(() => {
    const address = localStorage.getItem("address");
    if (address) {
      setTab("passwordEntry"); // If address exists, show password entry
    } else {
      setTab("wallet"); // If no address, show wallet creation
    }
  }, []);

  const handleTabChange = (newTab) => {
    setPreviousTab(tab);
    setTab(newTab);
  };

  const getSlideDirection = () => {
    const tabOrder = ["passwordEntry", "wallet", "login", "home", "send", "receive", "swap", "settings"];
    const currentIndex = tabOrder.indexOf(tab);
    const previousIndex = tabOrder.indexOf(previousTab);
    
    return currentIndex > previousIndex ? 1 : -1;
  };

  return (
    <div className="h-[600px] w-[400px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden relative perspective-container">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2232&auto=format&fit=crop')] opacity-10 bg-cover bg-center"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[100px] rotating-bg opacity-20">
          <div className="absolute top-1/4 left-1/4 w-full h-full rounded-full bg-blue-600/20 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-2/3 h-2/3 rounded-full bg-purple-600/20 blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-1/2 h-1/2 rounded-full bg-indigo-600/20 blur-3xl"></div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900/80"></div>
      <div className="relative z-10 h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ 
              opacity: 0,
              x: 100 * getSlideDirection(),
              rotateY: 5 * getSlideDirection(),
              scale: 0.95
            }}
            animate={{ 
              opacity: 1,
              x: 0,
              rotateY: 0,
              scale: 1,
              transition: { 
                duration: 0.4,
                type: "spring",
                damping: 20
              }
            }}
            exit={{ 
              opacity: 0,
              x: -100 * getSlideDirection(),
              rotateY: -5 * getSlideDirection(),
              scale: 0.95,
              transition: { 
                duration: 0.3
              }
            }}
            className="h-full"
          >
            {tab === "passwordEntry" && <PasswordEntry setTab={handleTabChange} />}
            {tab === "login" && <Login setTab={handleTabChange} />}
            {tab === "home" && <Home setTab={handleTabChange} />}
            {tab === "wallet" && <Wallet setTab={handleTabChange} />}
            {tab === "send" && <Send setTab={handleTabChange} />}
            {tab === "receive" && <Receive setTab={handleTabChange} />}
            {tab === "swap" && <Swap setTab={handleTabChange} />}
            {tab === "settings" && <Settings setTab={handleTabChange} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
import React, { useState } from "react";
import { ArrowLeft, ArrowDownUp, Settings } from "lucide-react";
import { motion } from "framer-motion";

const Swap = ({ setTab }) => {
  const [fromToken, setFromToken] = useState("SepoliaETH");
  const [toToken, setToToken] = useState("LINK");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleFromAmountChange = (e) => {
    const value = e.target.value;
    setFromAmount(value);
    if (value) {
      setToAmount((parseFloat(value) * 50).toFixed(2));
    } else {
      setToAmount("");
    }
  };

  const handleToAmountChange = (e) => {
    const value = e.target.value;
    setToAmount(value);
    if (value) {
      setFromAmount((parseFloat(value) / 50).toFixed(4));
    } else {
      setFromAmount("");
    }
  };

  const switchTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleSwap = () => {
    if (!fromAmount) {
      setStatus("Please enter an amount to swap");
      return;
    }

    setIsLoading(true);
    setStatus("Preparing swap...");

    setTimeout(() => {
      setStatus("Swapping tokens...");
      setTimeout(() => {
        setStatus("Swap successful!");
        setIsLoading(false);
        setFromAmount("");
        setToAmount("");
      }, 1500);
    }, 1000);
  };

  return (
    <motion.div className="flex flex-col h-full p-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button onClick={() => setTab("home")} className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 mr-4">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-bold">Swap</h2>
        </div>
        <button onClick={() => {}} className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50">
          <Settings size={18} className="text-gray-300" />
        </button>
      </motion.div>

      <div className="flex-1">
        <motion.div className="glass-morphism rounded-xl p-5 mb-6 border border-gray-700/30 relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>From</span>
                <span>Balance: 0.0942</span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-800/70 p-3 rounded-xl border border-gray-700/50">
                <input
                  type="number"
                  className="w-full bg-transparent text-white text-xl focus:outline-none"
                  placeholder="0.0"
                  value={fromAmount}
                  onChange={handleFromAmountChange}
                />
                <div className="flex items-center space-x-2 bg-gray-700/50 px-3 py-2 rounded-lg">
                  <span>{fromToken}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button onClick={switchTokens} className="bg-gray-800/70 p-2 rounded-full border border-gray-700/50">
                <ArrowDownUp size={20} className="text-blue-400" />
              </button>
            </div>

            <div>
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>To (estimated)</span>
                <span>Balance: 0.00</span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-800/70 p-3 rounded-xl border border-gray-700/50">
                <input
                  type="number"
                  className="w-full bg-transparent text-white text-xl focus:outline-none"
                  placeholder="0.0"
                  value={toAmount}
                  onChange={handleToAmountChange}
                />
                <div className="flex items-center space-x-2 bg-gray-700/50 px-3 py-2 rounded-lg">
                  <span>{toToken}</span>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-400 flex justify-between">
              <span>Rate</span>
              <span>1 {fromToken} = 50 {toToken}</span>
            </div>
          </div>
        </motion.div>

        {status && (
          <motion.div className={`p-3 rounded-lg mb-6 flex items-center relative overflow-hidden ${status.includes("error") ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'}`}>
            <div className="relative z-10 flex items-center">
              <p className="text-sm">{status}</p>
            </div>
          </motion.div>
        )}

        <button
          onClick={handleSwap}
          disabled={isLoading || !fromAmount}
          className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl text-white font-medium shadow-lg flex items-center justify-center ${isLoading || !fromAmount ? 'opacity-70 cursor-not-allowed' : 'hover:from-blue-500 hover:to-indigo-500'} transition-all duration-300`}
        >
          {isLoading ? "Swapping..." : "Swap Tokens"}
        </button>
      </div>
    </motion.div>
  );
};

export default Swap;
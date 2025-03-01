import React, { useState } from "react";
import { motion } from "framer-motion";

const PasswordEntry = ({ setTab }) => {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handlePasswordSubmit = () => {
    const storedPassword = localStorage.getItem("password");
    if (password === storedPassword) {
      setTab("home"); // Redirect to home page
    } else {
      setStatus("❌ Incorrect password. Please try again.");
    }
  };

  return (
    <motion.div className="bg-black text-white p-6 w-80 rounded-lg shadow-lg mx-auto mt-20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-lg font-bold mb-4">Enter Password</h2>
      <input
        type="password"
        className="w-full p-2 mb-2 bg-gray-800 text-white border border-gray-600 rounded"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="w-full bg-blue-600 p-2 rounded hover:bg-blue-700"
        onClick={handlePasswordSubmit}
      >
        Submit
      </button>
      {status && <p className="text-sm mt-2 text-gray-400">{status}</p>}
    </motion.div>
  );
};

export default PasswordEntry;
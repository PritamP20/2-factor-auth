import React, { useState } from "react";
import { motion } from "framer-motion";

const Login = ({ setTab }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleLogin = () => {
    if (email && password) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      setTab("home"); // Redirect to home page
    } else {
      setStatus("Please enter both email and password.");
    }
  };

  return (
    <motion.div className="bg-black text-white p-6 w-80 rounded-lg shadow-lg mx-auto mt-20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-lg font-bold mb-4">Login</h2>
      <input
        type="email"
        className="w-full p-2 mb-2 bg-gray-800 text-white border border-gray-600 rounded"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="w-full p-2 mb-2 bg-gray-800 text-white border border-gray-600 rounded"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="w-full bg-blue-600 p-2 rounded hover:bg-blue-700"
        onClick={handleLogin}
      >
        Login
      </button>
      {status && <p className="text-sm mt-2 text-gray-400">{status}</p>}
    </motion.div>
  );
};

export default Login;
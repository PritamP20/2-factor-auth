import React, { useState } from "react";
import { ethers } from "ethers";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

const Send = ({ setTab }) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);

  const privateKey = localStorage.getItem("privateKey");
  const address = localStorage.getItem("address");
  const provider = new ethers.JsonRpcProvider("https://ethereum-sepolia.publicnode.com");

  const SERVICE_ID = "service_fw1vrkn";
  const TEMPLATE_ID = "template_zw3l5bf";
  const USER_ID = "C_fFbfUB_-nqAwaHm";

  function sendOTP(email) {
    const otpCode = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
    sessionStorage.setItem("otp", otpCode.toString()); // Store OTP temporarily

    const templateParams = {
      to_email: email,
      otp_code: otpCode,
    };

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID)
      .then(() => {
        setOtpSent(true);
        setStatus("OTP sent! Check your email.");
      })
      .catch(() => {
        setStatus("Error sending OTP.");
      });
  }

  const verifyOTP = () => {
    const storedOtp = sessionStorage.getItem("otp");
    if (otp === storedOtp) {
      setVerified(true);
      setStatus("✅ OTP verified! You can proceed with the transaction.");
    } else {
      setStatus("❌ Invalid OTP! Try again.");
    }
  };

  const sendTransaction = async () => {
    if (!privateKey) {
      setStatus("No wallet found. Please create a wallet first.");
      return;
    }
    
    if (!verified) {
      setStatus("Please verify OTP before sending the transaction.");
      return;
    }

    const balance = await provider.getBalance(address);
    if (balance < ethers.parseEther(amount)) {
      setStatus("Insufficient balance");
      return;
    }

    try {
      setStatus("Connecting to Sepolia network...");
      const signer = new ethers.Wallet(privateKey, provider);
      setStatus("Waiting for transaction confirmation...");
      const tx = await signer.sendTransaction({
        to: recipient,
        value: ethers.parseEther(amount),
      });

      setStatus(`Transaction sent! Hash: ${tx.hash}`);
      await tx.wait();
      setStatus("✅ Transaction confirmed!");
    } catch (error) {
      setStatus(`❌ Error: ${error.message}`);
    }
  };

  return (
    <motion.div className="bg-gray-900 text-white p-6 w-full max-w-md rounded-lg shadow-lg mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-bold mb-4 text-center">Send ETH (Sepolia)</h2>
      
      <input
        type="text"
        className="w-full p-3 mb-3 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      
      <input
        type="number"
        className="w-full p-3 mb-3 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
        placeholder="Amount (ETH)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      {!otpSent ? (
        <button
          className="w-full bg-yellow-600 p-3 rounded hover:bg-yellow-700 transition duration-200"
          onClick={() => sendOTP("recipient@example.com")} // Replace with actual recipient email
        >
          Send OTP
        </button>
      ) : (
        <>
          <input
            type="text"
            className="w-full p-3 mt-2 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            className="w-full bg-green-600 p-3 mt-2 rounded hover:bg-green-700 transition duration-200"
            onClick={verifyOTP}
          >
            Verify OTP
          </button>
        </>
      )}

      <button
        className="w-full bg-blue-600 p-3 mt-2 rounded hover:bg-blue-700 transition duration-200"
        onClick={sendTransaction}
        disabled={!verified}
      >
        Send
      </button>

      {status && <p className="text-sm mt-2 text-gray-400 text-center">{status}</p>}
    </motion.div>
  );
};

export default Send;
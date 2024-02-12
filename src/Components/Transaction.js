import React, { useRef, useState } from "react";
import ethLogo from "../Assets/ethereum-eth-logo.png";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { IoMdRefresh } from "react-icons/io";
import { useSelector } from "react-redux";
import { db } from "../Utils/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Transaction = () => {
  const user = useSelector((store) => store.user);
  const walletRef = useRef(null);
  const amountRef = useRef(null);
  const [walletError, setWalletError] = useState("");
  const [amountError, setAmountError] = useState("");

  const transactionCollectionRef = collection(db, "transactionData");
  const notify = () => toast("Transaction Successful");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const walletAddress = walletRef.current.value.trim();
    const amount = amountRef.current.value.trim();

    // Address Validation
    if (!walletAddress.trim()) {
      setWalletError("Wallet Address cannot be empty!");
      return;
    } else if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
      setWalletError("Invalid Ethereum address");
      return;
    } else {
      setWalletError("");
    }

    // Amount Validation
    if (!amount) {
      setAmountError("Amount cannot be empty");
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (parsedAmount < 0 || parsedAmount > 10000) {
      setAmountError("Amount must be a number between 0 and 10,000");
      return;
    } else {
      setAmountError("");
    }

    const transactionData = {
      walletAddress,
      amount: parseFloat(amount), // Check amount is a number
      userID: user.uid,
    };

    try {
      await addDoc(transactionCollectionRef, transactionData);
      notify();
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    // Reset form fields
    walletRef.current.value = "";
    amountRef.current.value = "";
  };

  return (
    <>
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-center bg-gradient-to-r from-violet-500 to-fuchsia-500 flex flex-col items-center justify-center gap-6 pt-10 pb-6 md:pb-10 md:flex-row">
        <p className="text-[#29233b] tracking-wide">Securely Deposit ETH</p>
        <span className="text-amber-500">
          <AiFillSafetyCertificate size={60} />
        </span>
      </div>
      <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 p-5 md:p-12 flex flex-col md:flex-row justify-around items-center">
        <div className="mb-8 md:mb-0">
          <div className="flex flex-col justify-center items-center gap-5 bg-slate-100 p-4 w-96 rounded shadow-md md:w-96 h-80 relative">
            <div className="absolute top-3 right-4 flex items-center gap-1 bg-indigo-900 px-2 p-1 rounded-sm cursor-pointer hover:bg-indigo-600">
              <h1 className="font-semibold text-sm text-white">Refresh</h1>
              <IoMdRefresh size={16} className="text-white" />
            </div>
            <img
              className="w-16 h-16 md:mr-4 rounded-full bg-indigo-600 p-2"
              src={ethLogo}
              alt="eth logo"
            />
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2 text-gray-800">
                Hi {user?.displayName}
              </h1>
              <hr className="pb-2 border-black" />
              <h1 className="text-3xl font-bold mb-2 text-gray-800">
                Your Balance
              </h1>
              <p className="text-lg text-green-600 font-semibold mb-1">
                10345234.43 ETH
              </p>
              <p className="text-lg text-blue-700 font-semibold">
                34523434 USD
              </p>
            </div>
          </div>
        </div>
        <div className="bg-slate-100 p-8 rounded shadow-md w-96 md:w-96">
          <h2 className="text-2xl font-semibold mb-4">Deposit</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="walletAddress"
                className="block text-sm font-medium text-gray-600"
              >
                Wallet Address
              </label>
              <input
                ref={walletRef}
                type="text"
                id="walletAddress"
                required
                name="walletAddress"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="0xb79..."
              />
            </div>
            {walletError && (
              <span className="pl-1 font-semibold text-red-500">
                {walletError}
              </span>
            )}
            <div className="mb-3">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-600"
              >
                Amount
              </label>
              <input
                ref={amountRef}
                type="number"
                max={10000}
                min={0.0001}
                step="0.0001"
                id="amount"
                name="amount"
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="0.0001 - 10000"
              />
            </div>
            {amountError && (
              <span className="pl-1 font-semibold text-red-500">
                {amountError}
              </span>
            )}
            <button
              type="submit"
              className="bg-indigo-900 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-400"
            >
              Insert Amount
            </button>
            <ToastContainer />
          </form>
        </div>
      </div>
    </>
  );
};

export default Transaction;

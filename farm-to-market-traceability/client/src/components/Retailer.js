import React, { useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import abi from "../contracts/FarmToMarket.json";

const Retailer = () => {
  const [productId, setProductId] = useState("");
  const [purchasedFrom, setPurchasedFrom] = useState("");
  const [info, setInfo] = useState("");

  const handleSubmit = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(process.env.REACT_APP_CONTRACT_ADDRESS, abi.abi, signer);

      // Updated call to include purchasedFrom
      await contract.updateRetailer(productId, info, purchasedFrom);

      alert("Retailer details updated successfully.");
    } catch (err) {
      console.error(err);
      alert("Error updating retailer details.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-300 to-indigo-600">
      <div className="bg-white rounded-xl shadow-lg p-10 max-w-lg w-full">
        <h2 className="text-4xl font-bold text-center text-indigo-800 mb-6">🛍️ Retailer Panel</h2>
        <p className="text-center text-lg text-gray-700 mb-8">
          Enter the product details and purchase information to update the blockchain
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="productId">
              Product ID
            </label>
            <input
              id="productId"
              placeholder="Enter Product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="purchasedFrom">
              Purchased From
            </label>
            <input
              id="purchasedFrom"
              placeholder="Enter Purchase Details"
              value={purchasedFrom}
              onChange={(e) => setPurchasedFrom(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="info">
              Retailer Details
            </label>
            <input
              id="info"
              placeholder="Enter Retailer Info"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-4 px-8 bg-indigo-600 text-white font-semibold text-lg rounded-xl hover:bg-indigo-700 transition duration-300"
          >
            Submit Retailer Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Retailer;


import React, { useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import abi from "../contracts/FarmToMarket.json";

const Farmer = () => {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [fertilizerUsed, setFertilizerUsed] = useState("");
  const [soilType, setSoilType] = useState("");
  const [info, setInfo] = useState("");

  const handleSubmit = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new Contract(
      process.env.REACT_APP_CONTRACT_ADDRESS,
      abi.abi,
      signer
    );

    try {
      const tx = await contract.addProduct(
        productId,
        name,
        location,
        fertilizerUsed,
        soilType,
        info
      );
      await tx.wait();
      alert("✅ Farmer data added to blockchain");
    } catch (err) {
      console.error("❌ Transaction failed:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-100 to-teal-400 flex items-center justify-center px-6 py-12">
    <div className="bg-white shadow-lg rounded-xl w-full max-w-xl p-8">
      <div className="flex justify-center mb-8">
        <h1 className="text-4xl font-bold text-teal-700">🌾 Farmer Panel</h1>
      </div>

      <div className="space-y-6">
        <p className="text-center text-lg text-gray-600 mb-6">Enter your product information to add it to the blockchain</p>

        <div className="space-y-4">
          {/* Product ID */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2" htmlFor="productId">
              Product ID
            </label>
            <input
              id="productId"
              placeholder="Enter Product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2" htmlFor="name">
              Product Name
            </label>
            <input
              id="name"
              placeholder="Enter Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2" htmlFor="location">
              Location
            </label>
            <input
              id="location"
              placeholder="Enter Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Fertilizer Used */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2" htmlFor="fertilizerUsed">
              Fertilizer Used
            </label>
            <input
              id="fertilizerUsed"
              placeholder="Enter Fertilizer Used"
              value={fertilizerUsed}
              onChange={(e) => setFertilizerUsed(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Soil Type */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2" htmlFor="soilType">
              Soil Type
            </label>
            <input
              id="soilType"
              placeholder="Enter Soil Type"
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Additional Info */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2" htmlFor="info">
              Additional Info
            </label>
            <input
              id="info"
              placeholder="Enter Additional Info"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              onClick={handleSubmit}
              className="w-full py-4 px-6 bg-teal-600 text-white font-semibold text-xl rounded-xl hover:bg-teal-700 transition duration-300 transform hover:scale-105 shadow-md"
            >
              Submit Product
            </button>
          </div>
        </div>
      </div>
    </div>
   </div>
  );
};

export default Farmer;


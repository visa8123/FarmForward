import React, { useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import abi from "../contracts/FarmToMarket.json";

const Processor = () => {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [storageMethod, setStorageMethod] = useState("");
  const [transportMode, setTransportMode] = useState("");
  const [info, setInfo] = useState("");

  const handleSubmit = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(process.env.REACT_APP_CONTRACT_ADDRESS, abi.abi, signer);
      await contract.updateProcessor(productId, info);
      alert("✅ Processor details updated successfully.");
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Something went wrong while updating processor details.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-200 via-green-100 to-lime-200 flex items-center justify-center px-6 py-16">
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-3xl p-12 border border-teal-200">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-teal-700 tracking-tight mb-3">🔧 Processor Panel</h1>
          <p className="text-gray-600 text-lg font-medium">
            Enter product & processing details to record on the blockchain
          </p>
        </div>

        <div className="space-y-8">
          {[
            { label: "Product ID", value: productId, setter: setProductId, id: "productId", placeholder: "Enter Product ID" },
            { label: "Quantity", value: quantity, setter: setQuantity, id: "quantity", placeholder: "Enter Quantity" },
            { label: "Storage Method", value: storageMethod, setter: setStorageMethod, id: "storageMethod", placeholder: "Enter Storage Method" },
            { label: "Transport Mode", value: transportMode, setter: setTransportMode, id: "transportMode", placeholder: "Enter Transport Mode" },
            { label: "Processor Info", value: info, setter: setInfo, id: "info", placeholder: "Enter Additional Processor Info" },
          ].map((field, idx) => (
            <div key={idx}>
              <label htmlFor={field.id} className="block text-lg font-semibold text-gray-800 mb-2">
                {field.label}
              </label>
              <input
                id={field.id}
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                placeholder={field.placeholder}
                className="w-full px-6 py-5 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-md text-gray-800 text-lg transition duration-200"
              />
            </div>
          ))}

          <div className="pt-4">
            <button
              onClick={handleSubmit}
              disabled={!productId || !quantity || !storageMethod || !transportMode || !info}
              className={`w-full py-5 text-white text-xl font-bold rounded-2xl shadow-lg transition-transform duration-300 ${
                !productId || !quantity || !storageMethod || !transportMode || !info
                  ? "bg-teal-300 cursor-not-allowed"
                  : "bg-teal-600 hover:bg-teal-700 hover:scale-105"
              }`}
            >
              🚀 Submit Processor Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Processor;


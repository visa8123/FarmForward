import React, { useEffect, useState, useCallback } from "react";
import { BrowserProvider, Contract } from "ethers";
import abi from "../contracts/FarmToMarket.json";
import { QRCodeCanvas } from "qrcode.react";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [showQR, setShowQR] = useState(null);

  const parseProduct = (data, id) => ({
    id,
    productId: data[0],
    name: data[1],
    location: data[2],
    fertilizerUsed: data[3],
    soilType: data[4],
    farmerInfo: data[5],
    isShipped: data[6],
    quantity: data[7],
    storageMethod: data[8],
    transportMode: data[9],
    processorInfo: data[10],
    isProcessed: data[11],
    purchasedFrom: data[12],
    retailerInfo: data[13],
    isRetailed: data[14],
  });

  const fetchAllProducts = useCallback(async () => {
    try {
      const provider = new BrowserProvider(window.ethereum);
      const contract = new Contract(
        process.env.REACT_APP_CONTRACT_ADDRESS,
        abi.abi,
        provider
      );
      const productIds = await contract.getAllProductIds();

      const productData = await Promise.all(
        productIds.map(async (id) => {
          const data = await contract.getProduct(id);
          return parseProduct(data, id);
        })
      );

      setProducts(productData);
    } catch (err) {
      console.error("Error fetching products", err);
      alert("Error fetching product details");
    }
  }, []);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-700">
      <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-6xl w-full">
        <h2 className="text-4xl font-extrabold text-center text-indigo-800 mb-12">
          Admin Dashboard - Product Traces
        </h2>

        {products.length === 0 ? (
          <p className="text-center text-xl text-gray-700">No products found.</p>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-50 rounded-xl p-8 mb-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <h4 className="text-3xl font-semibold text-indigo-700 mb-6">
                Product ID: {product.productId}
              </h4>
              <div className="space-y-6">
                <p className="text-xl text-gray-800">
                  <strong className="text-indigo-600">Name:</strong> {product.name}
                </p>
                <p className="text-xl text-gray-800">
                  <strong className="text-indigo-600">Location:</strong> {product.location}
                </p>
                <p className="text-xl text-gray-800">
                  <strong className="text-indigo-600">Fertilizer Used:</strong> {product.fertilizerUsed}
                </p>
                <p className="text-xl text-gray-800">
                  <strong className="text-indigo-600">Soil Type:</strong> {product.soilType}
                </p>
                <p className="text-xl text-gray-800">
                  <strong className="text-indigo-600">Farmer Info:</strong> {product.farmerInfo}
                </p>
                <p className="text-xl text-gray-800">
                  <strong className="text-indigo-600">Verified by Farmer:</strong> {product.isShipped ? "Yes" : "No"}
                </p>
                <p className="text-xl text-gray-800">
                  <strong className="text-indigo-600">Verified by Processor:</strong> {product.isProcessed ? "Yes" : "No"}
                </p>
                <p className="text-xl text-gray-800">
                  <strong className="text-indigo-600">Verified by Retailer:</strong> {product.isRetailed ? "Yes" : "No"}
                </p>

                <div className="flex justify-center mt-6">
                  <button
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition duration-200 focus:outline-none"
                    onClick={() => setShowQR(product.id === showQR ? null : product.id)}
                  >
                    {showQR === product.id ? "Hide QR" : "View QR Code"}
                  </button>
                </div>

                {showQR === product.id && (
                  <div className="flex justify-center mt-6">
                    <QRCodeCanvas
                      value={JSON.stringify(product)}
                      size={256}
                      bgColor="#ffffff"
                      fgColor="#4c51bf"
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Admin;


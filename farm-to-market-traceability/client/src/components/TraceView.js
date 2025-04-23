// src/components/TraceView.js
import { useEffect, useState } from "react";

export default function TraceView({ contract }) {
  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    const prod = await contract.getProduct();
    setProduct(prod);
  };

  useEffect(() => {
    fetchProduct();
  }, [contract]);

  return product ? (
    <div className="space-y-4 p-4 border bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800">Product Trace</h3>
      <ul className="space-y-2">
        <li><strong>Product ID:</strong> {product.productId}</li>
        <li><strong>Name:</strong> {product.name}</li>
        <li><strong>Farm:</strong> {product.farmLocation}</li>
        <li><strong>Harvest:</strong> {product.harvestDate}</li>
        <li><strong>Processor:</strong> {product.processorDetails}</li>
        <li><strong>Distributor:</strong> {product.distributorDetails}</li>
        <li><strong>Retailer:</strong> {product.marketDetails}</li>
      </ul>
    </div>
  ) : (
    <p className="text-gray-700">Loading product trace...</p>
  );
}


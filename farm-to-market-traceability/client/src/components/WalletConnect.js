import { useState } from "react";
import { BrowserProvider } from "ethers";

export default function ConnectWallet() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  const connect = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError("");

    try {
      if (!window.ethereum) throw new Error("MetaMask is not installed.");

      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      setProvider(provider);
      setSigner(signer);

      const userAddress = await signer.getAddress();
      setAddress(userAddress);
    } catch (err) {
      setError(err.message || "Wallet connection failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <button
        onClick={connect}
        disabled={isLoading}
        className={`px-8 py-3 text-lg font-semibold rounded-full transition duration-300 shadow-md focus:outline-none ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700 text-white"
        }`}
      >
        {isLoading ? (
          <span className="animate-spin text-xl">🔄 Connecting...</span>
        ) : (
          "🔗 Connect Wallet"
        )}
      </button>

      {address && (
        <div className="text-green-800 font-medium bg-green-50 px-4 py-2 rounded-md shadow-inner">
          ✅ Connected:{" "}
          <span className="text-green-700 font-mono break-all">{address}</span>
        </div>
      )}

      {error && (
        <div className="text-red-700 bg-red-100 px-4 py-2 rounded-md shadow-inner font-medium">
          ❌ Error: <span className="italic">{error}</span>
        </div>
      )}
    </div>
  );
}

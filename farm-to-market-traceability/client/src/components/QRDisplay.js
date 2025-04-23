// src/components/QRDisplay.js
import { QRCodeSVG } from "qrcode.react";

export default function QRDisplay({ data }) {
  return (
    <div className="space-y-4 p-4 border bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800">QR Code (Scan to Verify)</h3>
      <QRCodeSVG value={JSON.stringify(data)} size={200} />
    </div>
  );
}
  

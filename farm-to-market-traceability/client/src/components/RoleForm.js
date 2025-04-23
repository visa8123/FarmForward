// src/components/RoleForm.js
import { useState } from "react";

export default function RoleForm({ contract, role, updateFunc }) {
  const [info, setInfo] = useState("");

  const handleSubmit = async () => {
    try {
      const tx = await contract[updateFunc](info);
      await tx.wait();
      alert(`${role} updated successfully!`);
    } catch (err) {
      console.error(err);
      alert("Error updating role");
    }
  };

  return (
    <div className="space-y-4 border p-4 rounded-lg shadow-md bg-white">
      <h3 className="text-xl font-semibold text-gray-800">{role} Stage</h3>
      <input
        type="text"
        placeholder={`Enter ${role.toLowerCase()} details`}
        value={info}
        onChange={(e) => setInfo(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSubmit}
        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Submit
      </button>
    </div>
  );
}

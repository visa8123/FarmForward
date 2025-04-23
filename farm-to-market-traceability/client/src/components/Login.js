import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    localStorage.setItem("role", role);
    navigate(`/${role.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-200 via-teal-100 to-sky-100 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-teal-400 p-10 md:p-16 space-y-12 animate-fade-in">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center gap-8">
        
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-500 tracking-tight">
              Farm To Market Traceability 
            </h1>
            <p className="mt-2 text-gray-600 text-lg font-medium">
              Login to begin traceable, sustainable farming.
            </p>
          </div>
        </div>

        {/* Login Buttons */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 mt-6">
          <RoleButton role="Farmer" emoji="👨‍🌾" color="green" onClick={handleLogin} />
          <RoleButton role="Processor" emoji="🏭" color="blue" onClick={handleLogin} />
          <RoleButton role="Retailer" emoji="🛒" color="amber" onClick={handleLogin} />
          <RoleButton role="Admin" emoji="🛡️" color="purple" onClick={handleLogin} />
        </div>

       </div>

      </div>
    
  );
}

function RoleButton({ role, emoji, color, onClick }) {
  const colorMap = {
    green: "bg-green-600 hover:bg-green-700",
    blue: "bg-blue-600 hover:bg-blue-700",
    amber: "bg-amber-500 hover:bg-amber-600",
    purple: "bg-purple-600 hover:bg-purple-700",
  };

  return (
    <button
      onClick={() => onClick(role)}
      className={`w-full sm:w-auto py-4 px-6 text-white font-semibold text-lg rounded-xl transform transition-all duration-300 shadow-md hover:scale-105 focus:outline-none ${colorMap[color]}`}
    >
      {emoji} Login as {role}
    </button>
  );
}


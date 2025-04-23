import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Farmer from "./components/Farmer";
import Processor from "./components/Processor";
import Retailer from "./components/Retailer";
import Admin from "./components/Admin";
import Header from "./components/header";
import Footer from "./components/footer";
import "./app.css"; // Custom styles

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-green-50 text-gray-900 font-sans flex flex-col">
        <Header />

        {/* Main Content */}
        <main className="flex-grow w-full max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl mt-12 mb-12 p-8 md:p-12">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/farmer" element={<Farmer />} />
            <Route path="/processor" element={<Processor />} />
            <Route path="/retailer" element={<Retailer />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

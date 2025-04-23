// src/components/Header.js
function Header() {
    return (
      <header className="bg-green-100 shadow-md py-8 px-6 md:px-16 flex items-center justify-between border-b-4 border-green-600">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-4xl font-extrabold text-green-800 tracking-wide">
              🌱 Farm Forward
            </h1>
            <p className="text-base text-gray-600 font-medium">
              Empowering agriculture with blockchain technology.
            </p>
          </div>
        </div>
      </header>
    );
  }
  
  export default Header;
  
import { assets } from "../assets/assets.js";

const Navbar = ({ setToken }) => {
  const handleLogout = () => {
    setToken(""); // Clear token in state, triggering a logout
  };

  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img
        className="w-[max(10%,150px)] rounded-[200px]"
        src={assets.alogo}
        alt="Company Logo"
      />
      <button
        onClick={handleLogout} // Call handleLogout on button click
        className="bg-gray-900 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full   text-xs sm:text-sm hover:bg-gray-400 "
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;

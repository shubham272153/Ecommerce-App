import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const { setShowSearch, getCartCount } = useContext(ShopContext);

  return (
    <div className="flex items-center justify-between border-b border-x-slate-400  mt-[-15px]   font-medium">
      <Link to="/">
        <img src={assets.logo} className="h-14" alt="" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>Collection</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>About</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>Contact</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="Search"
        />

        <div className="group relative">
          <Link to="/login">
            <img
              src={assets.profile_icon}
              className="w-5 cursor-pointer"
              alt="profile"
            />
          </Link>
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4  ">
            <div className="flex flex-col gap-2 w-36 py--3 px-5 bg-slate-100 text-gray-700 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Order</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5 " alt="" />
          <p className="absolute right-[-9px] top-[-4px] w-4 text-center leading-4 bg-red-600 text-white aspect-square rounded-full text-[10px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5  cursor-pointer sm:hidden "
          alt=""
        />
      </div>

      {/* sidebar menu for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div className="flex item-center gap-4 p-4">
            <img
              onClick={() => setVisible(false)}
              className="h-5  rotate-180 cursor-pointer "
              src={assets.dropdown_icon}
              alt=""
            />
            <p
              onClick={() => setVisible(false)}
              className="text-black font-sb cursor-pointer mt-[-3px]"
            >
              Back
            </p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/collection"
          >
            Collection
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

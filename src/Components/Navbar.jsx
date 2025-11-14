import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Home, Package, Heart } from "lucide-react";
import { TiLocation } from "react-icons/ti";
import { IoCartOutline } from "react-icons/io5";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useEffect, useCallback } from "react";
import { useCart } from "../Context/CartContext";
import LocationDropdown from "./LocationDropdown"; // 👈 new memoized dropdown

function Navbar({
  address,
  getLocation,
  openDropdown,
  setOpenDropdown,
  setAddress,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItem } = useCart();

  // Memoized toggle to avoid new function refs each render
  const toggleDropdown = useCallback(() => {
    requestAnimationFrame(() => setOpenDropdown((prev) => !prev));
  }, [setOpenDropdown]);

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/products", label: "Products", icon: Package },
    { path: "/wishlist", label: "Wishlist", icon: Heart },
  ];

  useEffect(() => {
    if (location.pathname !== "/") {
      navigate("/");
    }
  }, []);

  return (
    <div className="bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 md:px-0 py-3">
        {/* Logo + Location */}
        <div className="flex justify-center items-center gap-5">
          <Link to="/">
            <h1 className="font-bold text-3xl text-black hover:text-gray-800 transition-colors">
              Trendora
            </h1>
          </Link>

          <div
            onClick={toggleDropdown}
            className="flex justify-center items-center cursor-pointer text-gray-600 pt-1"
          >
            <TiLocation className="text-red-500 w-6 h-6" />
            <span className="font-medium text-sm">
              {address ? (
                <div className="flex space-x-1">
                  <p>{address.city}</p>,<p>{address.state}</p>
                </div>
              ) : (
                "Add Address"
              )}
            </span>
          </div>

          {/* Dropdown rendered via portal */}
          {openDropdown && (
            <LocationDropdown
              toggleDropdown={toggleDropdown}
              getLocation={getLocation}
              setAddress={setAddress}
            />
          )}
        </div>

        {/* Navigation + Cart + Sign In */}
        <div className="flex items-center gap-6">
          {/* Nav Items */}
          <ul className="flex gap-3 bg-gray-100 p-2 rounded-full items-center">
            {navItems.map(({ path, label, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/"}
                onMouseEnter={() => {
                  //Preload corresponding route lazily
                  switch (path) {
                    case "/":
                      import("../Pages/Home");
                      break;
                    case "/products":
                      import("../Pages/Products");
                      break;
                    case "/cart":
                      import("../Pages/Cart");
                      break;
                    case "/wishlist":
                      import("../Pages/Wishlist");
                      break;
                    // add others as needed
                    default:
                      break;
                  }
                }}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-6 py-2 rounded-full cursor-pointer transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md shadow-red-500/30 scale-105"
                      : "text-gray-600 hover:bg-white hover:text-red-500 hover:shadow-md"
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span className="font-semibold text-sm">{label}</span>
              </NavLink>
            ))}
          </ul>

          {/* Sign In / User */}
          <div className="flex items-center justify-center">
            <SignedOut>
              <SignInButton
                className="flex items-center gap-2 px-6 py-2 rounded-full cursor-pointer 
                 bg-gray-100 text-gray-600 font-semibold
                  hover:scale-105 hover:shadow-md hover:text-red-500 hover:font-semibold transition-all duration-300"
              />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          {/* Cart */}
          <Link
            to="/cart"
            onMouseEnter={() => import("../Pages/Cart")}
            className="relative flex items-center"
          >
            <IoCartOutline className="text-3xl text-gray-700" />
            <span
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1.5 text-xs font-bold shadow-md"
              style={{
                minWidth: "16px",
                minHeight: "16px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {cartItem.length}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

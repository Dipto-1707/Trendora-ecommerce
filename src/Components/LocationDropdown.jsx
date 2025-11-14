import React from "react";
import ReactDOM from "react-dom";
import { CgClose } from "react-icons/cg";

const LocationDropdown = React.memo(function LocationDropdown({
  toggleDropdown,
  getLocation,
  setAddress,
}) {
  return ReactDOM.createPortal(
    <div className="w-64 shadow-xl z-50 bg-white fixed top-16 left-60 border border-gray-200 p-5 rounded-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-semibold text-gray-600 text-lg tracking-tight">
          Change Location
        </h1>
        <span
          onClick={toggleDropdown}
          className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
        >
          <CgClose size={20} />
        </span>
      </div>

      {/* Detect Location */}
      <button
        onClick={() => requestAnimationFrame(getLocation)}
        className="w-full bg-gray-200 text-gray-600 font-medium shadow-md transition-all duration-300 px-4 py-2 rounded-md cursor-pointer hover:shadow-xl"
      >
        Detect My Location
      </button>

      {/* Delete Location */}
      <button
        onClick={() => {
          setAddress("");
          localStorage.removeItem("userLocation");
        }}
        className="w-full mt-2 bg-gray-200 text-gray-600 font-medium shadow-md transition-all duration-300 px-4 py-2 rounded-md cursor-pointer hover:shadow-xl"
      >
        Delete My Location
      </button>
    </div>,
    document.body
  );
});

export default LocationDropdown;

import { useUser } from "@clerk/clerk-react";
import { useCart } from "../Context/CartContext";
import React from "react";
import { useNavigate } from "react-router-dom";
import emptyCart from "../assets/emptyCart.webp";
import { RxCross2 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";

function Cart({ address, getLocation }) {
  const { cartItem, handleDeleteItem, updatedQuantity } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  const totalPrice = cartItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen min-w-full bg-black text-white py-10 px-4 sm:px-6 lg:px-8">
      {cartItem.length > 0 ? (
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">My Cart</h1>
          <p className="text-neutral-400 mt-2">
            {cartItem.length} {cartItem.length === 1 ? "item" : "items"} saved
          </p>
        </div>
      ) : null}
      {cartItem.length > 0 ? (
        <div className="max-w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SECTION — CART ITEMS (Wishlist-style) */}

          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {cartItem.map((item) => (
                <div
                  key={item._id}
                  className="group bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 transition-all duration-300 flex flex-col h-full hover:shadow-lg"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square bg-black overflow-hidden ">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="eager"
                      fetchpriority="high"
                      onClick={() => navigate(`/products/${item._id}`)}
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                    />

                    {/* Remove from Cart */}
                    <button
                      onClick={() => handleDeleteItem(item)}
                      className="absolute top-1 right-1 p-1 rounded-full bg-black/30 backdrop-blur-sm hover:text-white transition-all duration-300 hover:scale-110 ease-in-out cursor-pointer"
                    >
                      <RxCross2 className="text-sm text-white" />
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className=" flex flex-col flex-grow relative space-y-1 mt-1">
                    <h2 className="text-base text-center font-medium text-white line-clamp-1 ">
                      {item.title}
                    </h2>

                    <p className="text-base text-center font-bold text-white mb-2">
                      ₹{item.price.toFixed(2)}
                    </p>

                    <h1 className="text-center mb-2">Select Quantity</h1>
                    <div className="flex justify-center items-center gap-3 mb-4 ">
                      <button
                        onClick={() =>
                          updatedQuantity(cartItem, item._id, "decrease")
                        }
                        className="bg-neutral-800 px-2 py-2 rounded-md hover:bg-neutral-700"
                      >
                        <FaMinus className="text-sm" />
                      </button>
                      <span className="text-lg font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updatedQuantity(cartItem, item._id, "increase")
                        }
                        className="bg-neutral-800 px-2 py-2 rounded-md hover:bg-neutral-700"
                      >
                        <FaPlus className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SECTION — BILL + ADDRESS */}
          <div className="w-auto space-y-6 ">
            {/* Delivery Info */}
            <div className="bg-neutral-900 rounded-md p-6 space-y-2 ">
              <h1 className="text-gray-100 font-bold text-xl mb-3">
                Delivery Info
              </h1>

              <div className="flex ">
                <label>Full Name - </label>
                <h1 className="px-3">{user?.fullName || "Not Provided"}</h1>
              </div>

              <div className="flex ">
                <label>Address - </label>
                <h1 className="px-3">{address?.city || "Not Provided"}</h1>
              </div>
              <div className="flex">
                <label>Phone No. - </label>
                <h1 className="px-3">
                  {address?.phoneNumber || "Not Provided"}
                </h1>
              </div>

              <div className="flex gap-3">
                <div className="flex  w-full">
                  <label>State - </label>
                  <h1 className="px-3">{address?.state || ""}</h1>
                </div>
                <div className="flex  w-full">
                  <label>Postcode - </label>
                  <h1 className="px-3">{address?.postcode || ""}</h1>
                </div>
              </div>

              <button
                onClick={getLocation}
                className="hover:bg-neutral-700 bg-neutral-800 text-white px-3 py-2 rounded-md w-full mt-3 cursor-pointer"
              >
                Detect Location
              </button>
            </div>

            {/* Bill Summary */}
            <div className="bg-neutral-900  rounded-md p-6 space-y-4">
              <h1 className="text-gray-100 font-bold text-xl mb-3">
                Bill Details
              </h1>

              <div className="flex justify-between items-center">
                <span className="text-gray-400">Items Total</span>
                <p>₹{totalPrice.toFixed(2)}</p>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400">Delivery Charge</span>
                <p className="text-pink-600 font-semibold">
                  <span className="text-gray-600 line-through">₹25</span> FREE
                </p>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400">Handling Charge</span>
                <p className="text-pink-600 font-semibold">₹5</p>
              </div>

              <hr className="border-gray-700 my-2" />

              <div className="flex justify-between items-center">
                <h1 className="font-semibold text-lg text-gray-100">
                  Grand Total
                </h1>
                <p className="font-semibold text-lg text-gray-100">
                  ₹{(totalPrice + 5).toFixed(2)}
                </p>
              </div>

              <button className="bg-neutral-800 hover:bg-gradient-to-r from-red-500 to-pink-500 hover:text-white shadow-md  transition-all duration-600 uppercase px-3 py-2 rounded-md w-full mt-3">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center text-center h-[600px] space-y-6">
          <h1 className="text-white font-bold text-3xl md:text-5xl tracking-wide ]">
            Oh no! Your cart is empty
          </h1>

          <div className="relative h-[280px] w-[280px] md:h-[350px] md:w-[350px] bg-white  rounded-full flex items-center justify-center">
            <img
              src={emptyCart}
              alt="Empty cart illustration"
              className="h-[280px] w-[280px] md:h-[350px] md:w-[350px] object-cover p-3 pl-12"
            />
          </div>

          <p className="text-zinc-400 text-lg max-w-md font-light">
            Looks like you haven't added anything to your cart yet. Start
            exploring our products and fill it up!
          </p>

          <button
            onClick={() => navigate("/products")}
            className="bg-neutral-800 w-64 text-white  py-4 text-sm rounded-md cursor-pointer font-medium bg-gradient-to-r from-red-500 to-pink-500 hover:text-white  transition-all hover:scale-105 duration-500 uppercase"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}

export default React.memo(Cart);

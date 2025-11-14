import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RiStarSmileFill } from "react-icons/ri";
import { getdata } from "../Context/DataContext";
import { FaTruckLoading } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import { HiBadgeCheck } from "react-icons/hi";
import { useCart } from "../Context/CartContext";

function SingleProduct() {
  const params = useParams();
  const [singleProduct, setSingleProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const { isInWishlist, handleAddtoWishlist, handleRemoveFromWishlist } =
    getdata();
  const { handleAddtoCart, isInCart, handleDeleteItem } = useCart();

  const getSingleProduct = async () => {
    try {
      const response = await axios.get(
        `https://fakestoreapiserver.reactbd.org/api/products/${params.id}`
      );
      console.log(response.data);
      setSingleProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    getSingleProduct();
    window.scrollTo(0, 0);
  }, [params.id]);

  if (!singleProduct) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-center ">
          {/* Left - Product Image */}
          <div className="relative group ">
            <img
              fetchPriority="high"
              src={singleProduct.image}
              alt={singleProduct.title}
              className="w-full h-auto max-h-[530px] object-contain hover:scale-105 transition-transform duration-500 cursor-zoom-in"
            />
          </div>

          {/* Right - Product Details */}
          <div className="space-y-4">
            {/* Brand & Title */}
            <div className="space-y-1">
              <p className="text-White text-3xl font-bold uppercase">
                {singleProduct.brand}
              </p>
              <h1 className="text-xl font-light tracking-wide">
                {singleProduct.title}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2 pb-3 border-b border-neutral-800">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <RiStarSmileFill
                    key={i}
                    className={`w-4 h-4 ${
                      i < singleProduct.rating
                        ? "text-yellow-400"
                        : "text-neutral-800"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-zinc-400">
                {singleProduct.rating}/5 Stars
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-bold text-white">
                  ₹{singleProduct.discountedPrice}
                </span>
                <span className="text-lg text-zinc-500 line-through">
                  ₹{singleProduct.oldPrice}
                </span>
              </div>
              <div className="inline-flex items-center px-2 py-1 bg-red-500/10 border border-red-500/20 rounded-full">
                <span className="text-xs font-semibold text-red-400">
                  {Math.round(
                    ((singleProduct.oldPrice - singleProduct.discountedPrice) /
                      singleProduct.oldPrice) *
                      100
                  )}
                  % OFF • Save ₹
                  {singleProduct.oldPrice - singleProduct.discountedPrice}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-zinc-400 leading-relaxed text-sm">
              {singleProduct.description}
            </p>

            {/* Sizes */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-zinc-300 tracking-wide uppercase">
                Select Size
              </h3>
              <div className="flex flex-wrap gap-2">
                {singleProduct.size.map((s, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(s)}
                    className={`min-w-[3rem] px-4 py-2 text-sm rounded-lg font-medium transition-all duration-300 cursor-pointer ${
                      selectedSize === s
                        ? "bg-gradient-to-r from-red-500 to-pink-500 text-white"
                        : "bg-zinc-900 text-white hover:bg-neutral-800"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-3">
              <button
                onClick={() =>
                  isInCart(singleProduct)
                    ? handleDeleteItem(singleProduct)
                    : handleAddtoCart(singleProduct)
                }
                className={`flex-1 px-6 py-3  bg-neutral-800 w-40 text-white text-sm rounded-md cursor-pointer font-medium hover:bg-gradient-to-r from-red-500 to-pink-500 hover:text-white shadow-md transition-all hover:scale-105 duration-500  uppercase ${
                  isInCart(singleProduct)
                    ? "bg-gradient-to-r from-red-500 to-pink-500"
                    : "bg-neutral-800 w-40 text-white"
                } `}
              >
                {isInCart(singleProduct) ? "Added to Cart" : "Add To Cart"}
              </button>
              <button
                onClick={() =>
                  isInWishlist(singleProduct)
                    ? handleRemoveFromWishlist(singleProduct)
                    : handleAddtoWishlist(singleProduct)
                }
                className={`flex-1 px-6 py-3  bg-neutral-800 w-40 text-white text-sm rounded-md cursor-pointer font-medium hover:bg-gradient-to-r from-red-500 to-pink-500 hover:text-white shadow-md transition-all hover:scale-105 duration-500 uppercase ${
                  isInWishlist(singleProduct)
                    ? "bg-gradient-to-r from-red-500 to-pink-500"
                    : "bg-neutral-800 w-40 text-white"
                }`}
              >
                {isInWishlist(singleProduct) ? "Wishlisted" : "Add To Wishlist"}
              </button>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-zinc-800">
              <div className="text-center flex flex-col items-center space-y-1">
                <p className="text-lg">
                  <FaTruckLoading className="text-2xl" />
                </p>
                <p className="text-xs text-zinc-500">Free Delivery</p>
              </div>
              <div className="text-center flex flex-col items-center space-y-1">
                <p className="text-lg">
                  <GiReturnArrow className="text-2xl" />
                </p>
                <p className="text-xs text-zinc-500">Easy Returns</p>
              </div>
              <div className="text-center flex flex-col items-center space-y-1">
                <p className="text-lg">
                  <HiBadgeCheck className="text-2xl text-green-400" />
                </p>
                <p className="text-xs text-zinc-500">Authentic</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SingleProduct);

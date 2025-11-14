import { IoMdHeart } from "react-icons/io";
import { getdata } from "../Context/DataContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { LiaStarSolid } from "react-icons/lia";
import React from "react";

function ProductCard({ product }) {
  const { isInWishlist, handleAddtoWishlist, handleRemoveFromWishlist } =
    getdata();
  const navigate = useNavigate();
  const { handleAddtoCart } = useCart();

  return (
    <div className="bg-neutral-900 rounded-lg text-white h-[380px] flex flex-col border border-neutral-800 overflow-hidden">
      {/* Product Image */}
      <div className="relative aspect-square rounded-tr-lg rounded-tl-lg overflow-hidden flex justify-center items-center flex-shrink-0 p-1">
        <img
          onClick={() => navigate(`/products/${product._id}`)}
          src={product.image}
          alt={product.title}
          loading="lazy"
          fetchPriority="high"
          className="h-full w-full object-cover rounded-tr-lg rounded-tl-lg overflow-hidden hover:scale-105 transition-transform duration-500 cursor-pointer "
        />
        <div
          onClick={() =>
            isInWishlist(product)
              ? handleRemoveFromWishlist(product)
              : handleAddtoWishlist(product)
          }
          className={`absolute top-2 right-2 hover:text-red-700 cursor-pointer transition-colors duration-300 ease-in-out 
            ${isInWishlist(product) ? "text-red-700" : "text-white"}`}
        >
          <IoMdHeart className="text-xl" />
        </div>
      </div>

      {/* Product Title */}
      <div className="flex items-center justify-between px-2 mt-1">
        <h1 className="line-clamp-1 text-lg font-bold tracking-wide text-neutral-200">
          {product.brand}
        </h1>
        <div className="flex items-center gap-0.5 text-sm">
          <LiaStarSolid className="text-yellow-400" />
          <span>{product.rating.toFixed(1)}/5</span>
        </div>
      </div>

      <h1 className="line-clamp-1 pl-2  font-light text-neutral-200 flex-shrink-0">
        {product.title}
      </h1>

      {/* Product Price */}
      <p className="pl-2 font-light text-neutral-200 flex-shrink-0 tracking-wider">
        Rs.{product.price.toFixed(0)}{" "}
        <del className="text-gray-500 font-light tracking-wider">
          Rs.{product.oldPrice}
        </del>
      </p>

      {/* Add to Cart Button */}
      <div
        onClick={() => handleAddtoCart(product)}
        className="mt-auto flex justify-center items-center"
      >
        <button className="bg-neutral-800 w-full text-white  py-3 text-sm  cursor-pointer font-medium hover:bg-gradient-to-r from-red-500 to-pink-500 hover:text-white shadow-md  transition-all duration-500 uppercase">
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default React.memo(ProductCard)

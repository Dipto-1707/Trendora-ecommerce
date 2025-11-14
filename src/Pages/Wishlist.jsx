import { useNavigate } from "react-router-dom";
import { getdata } from "../Context/DataContext";
import { RxCross2 } from "react-icons/rx";
import React, { useEffect } from "react";
import { useCart } from "../Context/CartContext";

function Wishlist() {
  const { wishlist, handleRemoveFromWishlist } = getdata();
  const navigate = useNavigate();
  const{handleAddtoCart}=useCart()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[70vh] bg-neutral-950 flex flex-col items-center justify-center text-neutral-400">
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-semibold text-neutral-300">
            Your Wishlist is Empty
          </h2>
          <p className="text-sm text-neutral-500">
            Start adding items you love to see them here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold ">My Wishlist</h1>
          <p className="text-neutral-400 mt-2">
            {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {wishlist.map((product) => (
            <div
              key={product._id}
              className="group bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 transition-all duration-300 flex flex-col h-full hover:shadow-lg "
            >
              {/* Product Image Container */}
              <div className="relative aspect-square bg-black overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  fetchPriority="high"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Remove from Wishlist Button */}
                <button
                  onClick={() => handleRemoveFromWishlist(product)}
                  className="absolute top-1 right-1 p-1 rounded-full bg-black/30 backdrop-blur-sm hover:text-white transition-all duration-300 hover:scale-110 ease-in-out cursor-pointer"
                >
                  <RxCross2 className="text-sm text-white" />
                </button>
              </div>

              {/* Product Details */}
              <div className="p-4 flex flex-col flex-grow">
                {/* Product Title */}
                <h2 className="text-medium text-center font-medium text-white line-clamp-1 min-h-[2rem]">
                  {product.title}
                </h2>

                {/* Product Price */}
                <p className="text-medium text-center font-bold text-white mb-4">
                  ₹{product.price.toFixed(2)}
                </p>

                {/* Action Buttons */}
                <div className="mt-auto space-y-2">
                  <button
                    onClick={() => navigate(`/products/${product._id}`)}
                    className="w-full bg-neutral-800 text-white py-2 rounded-lg font-medium  hover:bg-neutral-700 transition-all duration-300 active:scale-95 cursor-pointer    "
                  >
                    View Product
                  </button>

                  <button onClick={()=>handleAddtoCart(product)} className="w-full bg-neutral-800 text-white py-2 rounded-lg font-medium hover:bg-neutral-700 transition-all duration-300 active:scale-95 cursor-pointer">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default React.memo(Wishlist);

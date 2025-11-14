import React from "react";
import { getdata } from "../Context/DataContext";
import { Link, useNavigate } from "react-router-dom";

// import { getloader } from "../Context/LoadingContext";

function Category() {
  const { uniqueCategories } = getdata();
  // const { loadProductsPage } = getloader();
  const navigate = useNavigate();

  // console.log(uniqueCategories);

  // Taking only first 5 categories
  const displayCategories = React.useMemo(
    () => uniqueCategories.slice(0, 5),
    [uniqueCategories]
  );

  // No rendering if no categories
  if (displayCategories.length === 0) {
    return null;
  }

  return (
    <div className="bg-black p-14 px-8 lg:px-20">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-light text-white mb-4 tracking-tight">
            Shop by Category
          </h2>
          <p className="text-gray-400 text-lg font-light">
            Discover our curated collections
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {displayCategories.map((category, index) => (
            <div
              key={index}
              className="group cursor-pointer"
              onMouseEnter={() => import("../Pages/CategoryProduct.jsx")}
              onClick={() =>
                navigate(`/category/${encodeURIComponent(category.name)}`)
              }
            >
              <div className="relative overflow-hidden bg-zinc-900 aspect-square">
                {/* Category Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  className="h-full w-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-all duration-500 pointer-events-auto" />

                {/* Category Name */}
                <div className="absolute inset-0 flex items-end p-6">
                  <div className="w-full">
                    <h3 className="text-white text-lg font-medium uppercase tracking-wide group-hover:translate-x-2 transition-transform duration-300">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}

        <Link to="/products" className="flex justify-center mt-16">
          <button className="relative bg-white text-black font-medium px-12 py-4 rounded-none hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all duration-300 text-sm tracking-wider uppercase cursor-pointer shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.5)]">
            View All Products
          </button>
        </Link>
      </div>
    </div>
  );
}

export default React.memo(Category);

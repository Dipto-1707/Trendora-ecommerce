import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import { getdata } from "../Context/DataContext";

function CategoryProduct() {
  const params = useParams();
  const { data } = getdata();

  const category = params.category;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },[]);

  // Filter products directly by category
  const filteredByCategoryData = useMemo(
    () => data?.filter((item) => item.category === category) || [],
    [data, category]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 mb-10">
      {category === "women" && (
        <h1 className="text-white mt-12 uppercase font-light tracking-wider text-2xl text-center">
          Timeless fashion for every woman — discover your perfect look
        </h1>
      )}
      {category === "men" && (
        <h1 className="text-white mt-12 uppercase font-light tracking-wider text-2xl text-center">
          Elevate your look — Designed for the man who leads, not follows
        </h1>
      )}
      {category === "kids" && (
        <h1 className="text-white mt-12 uppercase font-light tracking-wider text-2xl text-center">
          Adorable styles for every little smile
        </h1>
      )}

      <div className="flex-1 mt-6 md:mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 auto-rows-fr">
          {filteredByCategoryData.length > 0 ? (
            filteredByCategoryData.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-white text-center col-span-full">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(CategoryProduct);

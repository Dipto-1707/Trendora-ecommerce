import React, { useCallback, useEffect, useRef, useState } from "react";
import { getdata } from "../Context/DataContext";
import FilterSection from "../Components/FilterSection";
import ProductCard from "../Components/ProductCard";
import Pagination from "../Components/Pagination";

function Products() {
  const { data } = getdata();
  const videoRef = useRef(null);

  // Filter states
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Original product array
  const productArray = Array.isArray(data) ? data : data?.products || [];

  // Filtered data
  const filteredData = React.useMemo(() => {
    return productArray.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) &&
        (category === "All" || item.category === category) &&
        (brand === "All" || item.brand === brand) &&
        item.price >= priceRange[0] &&
        item.price <= priceRange[1]
    );
  }, [productArray, search, category, brand, priceRange]);

  // Reset to first page whenever filters/search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, brand, priceRange]);

  // pagination
  const totalPages = filteredData.length
    ? Math.ceil(filteredData.length / itemsPerPage)
    : 0;

  const displayedProducts = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Video playback rate
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Handlers for filters
  const handleCategoryChange = useCallback(
    (e) => setCategory(e.target.value),
    []
  );
  const handleBrandChange = (e) => setBrand(e.target.value);

  return (
    <div className="max-w-7xl mx-auto mb-10">
      <h1 className="text-white mt-10 uppercase font-light tracking-wider text-2xl text-center">
        <span className="font-medium">Explore it all</span> — every product,
        every trend, all in one place
      </h1>

      {data?.length > 0 ? (
        <div className="flex flex-col md:flex-row gap-4">
          {/* Filter Section */}
          <div className="md:max-w-sm lg:max-w-min flex-shrink-0">
            <FilterSection
              search={search}
              setSearch={setSearch}
              category={category}
              setCategory={setCategory}
              brand={brand}
              setBrand={setBrand}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              handleCategoryChange={handleCategoryChange}
              handleBrandChange={handleBrandChange}
              disabled={!data || data.length === 0}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1 mt-10 md:mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr">
              {displayedProducts.length > 0 ? (
                displayedProducts.map((product) => (
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
      ) : (
        <div className="flex flex-col justify-center items-center h-[400px]">
          <h2 className="text-white text-center font-light tracking-widest animate-bounce">
            Loading
          </h2>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
}

export default React.memo(Products);

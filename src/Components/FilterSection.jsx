import { getdata } from "../Context/DataContext";
import { Search } from "lucide-react";

function FilterSection({
  search,
  setSearch,
  brand,
  setBrand,
  priceRange,
  setPriceRange,
  category,
  setCategory,
  handleBrandChange,
  handleCategoryChange,
}) {
  const { uniqueCategories, uniqueBrands } = getdata();
  const newUniqueCategories = [{ name: "All", image: "" }, ...uniqueCategories];
  const newUniqueBrands = ["All", ...uniqueBrands];

  console.log(uniqueBrands);
  return (
    <div className="bg-neutral-900 mt-10 p-8  rounded-lg border border-neutral-800 h-max">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-1.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-500" />
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-neutral-950 w-full pl-7 pr-4 py-2.5 rounded-lg border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-700 transition-colors text-sm"
        />
      </div>

      {/* Category Section */}
      <div className="mt-4">
        <h1 className="font-semibold text-lg text-white mb-3">Category</h1>
        <div className="flex flex-col gap-1">
          {newUniqueCategories?.map((item, index) => (
            <label
              key={index}
              className="flex items-center gap-3 cursor-pointer group hover:bg-neutral-800 px-2 py-1 rounded transition-colors"
            >
              <input
                type="checkbox"
                name={item.name}
                checked={category === item.name}
                value={item.name}
                onChange={handleCategoryChange}
                className="w-4 h-4 rounded border-neutral-600 cursor-pointer accent-white"
              />
              <span className="text-neutral-300 text-sm font-medium uppercase group-hover:text-white transition-colors">
                {item.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand Section */}
      <div className="mt-6">
        <h1 className="font-semibold text-lg text-white mb-4">Brand</h1>
        <div className="flex flex-col gap-1">
          {newUniqueBrands?.map((item, index) => (
            <label
              key={index}
              className="flex items-center gap-3 cursor-pointer group hover:bg-neutral-800 px-2 py-1 rounded transition-colors"
            >
              <input
                type="checkbox"
                name={item}
                checked={brand === item}
                value={item}
                onChange={handleBrandChange}
                className="w-4 h-4 rounded border-neutral-600 cursor-pointer accent-white"
              />
              <span className="text-neutral-300 text-sm font-medium uppercase group-hover:text-white transition-colors">
                {item}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Section */}
      <div className="mt-6">
        <h1 className="font-semibold text-lg text-white mb-3">Price Range</h1>
        <div className="flex flex-col gap-3">
          <label className="text-neutral-400 text-sm font-medium">
            ₹{priceRange[0]} - ₹{priceRange[1]}
          </label>
          <input
            type="range"
            min="0"
            max="5000"
            className="w-full h-2 mt-2"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
          />
        </div>
      </div>

      {/* Reset Button */}
      <button
        className="bg-white text-black rounded-lg px-4 py-3 mt-10 cursor-pointer w-full font-medium text-sm hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 hover:bg-gradient-to-r from-red-500 to-pink-500 hover:text-white transition:all hover:scale-105 ease-in-out"
        onClick={() => {
          setSearch("");
          setCategory("All");
          setBrand("All");
          setPriceRange([0, 5000]);
        }}
      >
        Reset Filters
      </button>
    </div>
  );
}

export default FilterSection;

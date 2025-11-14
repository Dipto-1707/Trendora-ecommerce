import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [uniqueBrands, setUniqueBrands] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(
        //Platzi-FakeStore
        // "https://api.escuelajs.co/api/v1/products?offset=0&limit=200"
        // "https://fakestoreapi.com/products/"
        "https://fakestoreapiserver.reactbd.org/api/products"
      );
      // console.log(response.data);

      // setData(response.data);
      setData(response.data.data);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (!data || !data.length) return;

    //Categories
    const uniqueCategories = Object.values(
      data.reduce((acc, item) => {
        const catName =
          typeof item.category === "string"
            ? item.category
            : item.category?.name;
        if (catName && !acc[catName]) {
          acc[catName] = {
            name: catName,
            image: item.image,
          };
        }
        return acc;
      }, {})
    );

    //Brands
    const uniqueBrands = Array.from(
      new Set(data?.map((product) => product.brand))
    );
    setUniqueBrands(uniqueBrands);
    setUniqueCategories(uniqueCategories);
  }, [data]);

  // console.log(data);

  // wishlist
  function isInWishlist(product) {
    return wishlist.some((item) => item._id === product._id);
  }

  function handleAddtoWishlist(product) {
    if (!isInWishlist(product)) setWishlist([...wishlist, product]);
  }

  function handleRemoveFromWishlist(product) {
    if (isInWishlist(product))
      setWishlist(wishlist.filter((item) => item._id != product._id));
  }

  // Load wishlist on mount
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  // Save wishlist whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
  fetchAllProducts();
}, []);


  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        fetchAllProducts,
        uniqueCategories,
        uniqueBrands,
        isInWishlist,
        handleAddtoWishlist,
        handleRemoveFromWishlist,
        wishlist,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export const getdata = () => useContext(DataContext);

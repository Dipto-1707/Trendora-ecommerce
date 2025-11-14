import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";
import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { getdata } from "./Context/DataContext";
import Footer from "./Components/Footer.jsx";
import { getloader } from "./Context/LoadingContext.jsx";
import { useCart } from "./Context/CartContext.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";

function App() {
  const [address, setAddress] = useState();
  const [openDropdown, setOpenDropdown] = useState(false);
  const { fetchAllProducts } = getdata();
  const {
    //   loadHomePage,
    //   loadProductsPage,
    //   loadWishlistPage,
    //   loadCartPage,
    HomePage,
    ProductsPage,
    WishlistPage,
    CartPage,
    SingleProductPage,
    CategoryProductPage,
  } = getloader();

  const { cartItem, setCartItem } = useCart();

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
        try {
          const response = await axios.get(url);
          const address = response.data.address;
          setAddress(address);
          setOpenDropdown(false);
        } catch (error) {
          console.error("Error fetching address:", error);
        }
      });
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  //Load cart from local storage
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItem");
    if (storedCart) setCartItem(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }, [cartItem]);

  //Load address from local storage
  useEffect(() => {
    const storedAddress = localStorage.getItem("userLocation");
    if (storedAddress && storedAddress !== "undefined") {
      try {
        setAddress(JSON.parse(storedAddress));
      } catch (error) {
        console.error("Invalid address data in localStorage:", error);
        localStorage.removeItem("userLocation");
      }
    }
  }, []);

  useEffect(() => {
    if (address) {
      localStorage.setItem("userLocation", JSON.stringify(address));
    }
  }, [address]);

  return (
    <div className="min-h-screen flex flex-col  bg-black">
      <BrowserRouter>
        <Navbar
          address={address}
          setAddress={setAddress}
          getLocation={getLocation}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
          // loadHomePage={loadHomePage}
          // loadProductsPage={loadProductsPage}
          // loadWishlistPage={loadWishlistPage}
          // loadCartPage={loadCartPage}
        />

        {/* Content takes remaining height */}
        <div className="flex-grow">
          <Suspense
            fallback={
              <h1 className="text-center text-white text-2xl font-light animate-ping p-10">
                Loading
              </h1>
            }
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route
                path="/cart"
                element={
                  <CartPage address={address} getLocation={getLocation} />
                }
              />
              <Route path="/products/:id" element={<SingleProductPage />} />
              <Route
                path="/category/:category"
                element={<CategoryProductPage />}
              />
            </Routes>
          </Suspense>
        </div>

        {/* Footer always at bottom */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

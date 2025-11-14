import { createContext, lazy, useContext, useEffect, useState } from "react";

export const LoadingContext = createContext(null);

const HomePage = lazy(() => import("../Pages/Home.jsx"));
const ProductsPage = lazy(() => import("../Pages/Products.jsx"));
const WishlistPage = lazy(() => import("../Pages/Wishlist.jsx"));
const CartPage = lazy(() => import("../Pages/Cart.jsx"));
const SingleProductPage = lazy(() => import("../Pages/SingleProduct.jsx"));
const CategoryProductPage = lazy(() => import("../Pages/CategoryProduct.jsx"));


const Carousel=lazy(()=>import("../Components/Carousel.jsx"))
const Category =lazy(()=>import("../Components/Category.jsx"))
const Features=lazy(()=>import ("../Components/Features"))

export const LoaderProvider = ({ children }) => {
  // const [HomePage, setHomePage] = useState(null);
  // const [ProductsPage, setProductsPage] = useState(null);
  // const [WishlistPage, setWishlistPage] = useState(null);
  // const [CartPage, setCartPage] = useState(null);

  // const loadHomePage = () =>
  //   import("../Pages/Home.jsx").then((m) => setHomePage(() => m.default));
  // const loadProductsPage = () =>
  //   import("../Pages/Products.jsx").then((m) => setProductsPage(() => m.default));
  // const loadWishlistPage = () =>
  //   import("../Pages/Wishlist.jsx").then((m) => setWishlistPage(() => m.default));
  // const loadCartPage = () =>
  //   import("../Pages/Cart.jsx").then((m) => setCartPage(() => m.default));

  // Preload home page
  // useEffect(() => {
  //   loadHomePage();
  // }, []);

  return (
    <LoadingContext.Provider
      value={{
        // loadHomePage,
        // loadProductsPage,
        // loadWishlistPage,
        // loadCartPage,
        HomePage,
        ProductsPage,
        WishlistPage,
        CartPage,
        SingleProductPage,
        CategoryProductPage,
        Carousel,
        Category,
        Features
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const getloader = () => useContext(LoadingContext);

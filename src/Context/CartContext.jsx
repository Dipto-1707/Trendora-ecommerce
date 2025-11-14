import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);

  function handleAddtoCart(product) {
    setCartItem((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        // Increase quantity of existing item
        toast.success("Product quantity increased!");
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item
        toast.success("Product added to cart!");
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  }

  function isInCart(product) {
    return cartItem.some((item) => item._id === product._id);
  }

  function handleDeleteItem(product) {
    toast.warning("Product removed from cart");
    setCartItem(cartItem.filter((item) => item._id != product._id));
  }

  const updatedQuantity = (cartItem, productId, action) => {
    setCartItem(
      cartItem
        .map((item) => {
          if (item._id === productId) {
            let newUnit = item.quantity;
            if (action === "increase") {
              newUnit = newUnit + 1;
            } else if (action === "decrease") {
              newUnit = newUnit - 1;
            }
            return newUnit > 0 ? { ...item, quantity: newUnit } : null;
          }
          return item;
        })
        .filter((item) => item != null)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItem,
        setCartItem,
        handleAddtoCart,
        isInCart,
        updatedQuantity,
        handleDeleteItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

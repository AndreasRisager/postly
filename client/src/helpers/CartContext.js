import React, { useContext, createContext } from "react";
import useLocalStorage from "./useLocalStorage";
import { navigate } from "@reach/router";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage("cart", []);

  const totalPrice = cart.reduce((acc, curVal) => acc + curVal.price * curVal.quantity, 0).toFixed(2);
  const totalItems = cart.reduce((acc, curVal) => acc + curVal.quantity, 0);

  const isCartEmpty = cart.length === 0;

  function addToCart(product) {
    var exist = cart.find((item) => item.id === product.id);
    if (exist) {
      setCart((prevCart) => {
        return prevCart.map((item) => (item.id === product.id ? { ...exist, quantity: exist.quantity + 1 } : item));
      });
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  }

  function removeFromCart(product) {
    setCart((prevCart) => {
      return prevCart.filter((item) => item.id !== product.id);
    });
  }

  function updateItemQuantity(product, quantity) {
    if (quantity <= 0) {
      removeFromCart(product);
      return;
    }

    setCart((prevCart) => {
      return prevCart.filter((item) => {
        if (item.id === product.id) {
          product.quantity = quantity;
        }
        return product;
      });
    });
  }

  function checkout() {
    // TODO
    navigate("/checkout");
  }

  const value = {
    cart,
    totalItems,
    isCartEmpty,
    totalPrice,
    updateItemQuantity,
    addToCart,
    removeFromCart,
    checkout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

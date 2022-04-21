import React, { useContext, createContext } from "react";
import useLocalStorage from "./useLocalStorage";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage("cart", []);

  const totalPrice = cart.reduce((acc, curVal) => acc + curVal.price * curVal.quantity, 0);
  const totalItems = cart.reduce((acc, curVal) => acc + curVal.quantity, 0);

  const isCartEmpty = cart.length === 0;

  function addToCart(product) {
    const exist = cart.find(
      (p) =>
        p.id === product.id &&
        JSON.stringify(p.productVariant) === JSON.stringify(product.productVariant)
    );

    if (exist) {
      setCart((prevCart) => {
        return prevCart.map((item) =>
          item.id === product.id &&
          JSON.stringify(item.productVariant) === JSON.stringify(product.productVariant)
            ? {
                ...exist,
                quantity: exist.quantity + 1,
                price:
                  product.price +
                  (product.productVariant.frame ? product.productVariant.frame.price : 0) +
                  (product.productVariant.size ? product.productVariant.size.price : 0),
              }
            : item
        );
      });
    } else {
      setCart((prevCart) => [
        ...prevCart,
        {
          ...product,
          quantity: 1,
          price:
            product.price +
            (product.productVariant.frame ? product.productVariant.frame.price : 0) +
            (product.productVariant.size ? product.productVariant.size.price : 0),
        },
      ]);
    }
  }

  const removeFromCart = (product) => {
    // remove product from cart, if id and product.productVariant object match
    setCart((prevCart) =>
      prevCart.filter(
        (p) =>
          p.id !== product.id ||
          JSON.stringify(p.productVariant) !== JSON.stringify(product.productVariant)
      )
    );
  };

  // function removeFromCart(product) {
  //   setCart((prevCart) => {
  //     return prevCart.filter((item) => item.id !== product.id);
  //   });
  // }

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

  function resetCart() {
    setCart([]);
  }

  const value = {
    cart,
    totalItems,
    isCartEmpty,
    totalPrice,
    updateItemQuantity,
    addToCart,
    removeFromCart,
    resetCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

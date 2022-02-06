import React, { useContext, createContext, useState } from "react";

const CheckoutContext = createContext();

export function useCheckout() {
  return useContext(CheckoutContext);
}

export function CheckoutProvider({ children }) {
  const [checkout, setCheckout] = useState({
    step: 1,
    email: "",
    country: "DK",
    firstname: "",
    lastname: "",
    shipping_address1: "",
    shipping_address2: "",
    zip_code: "",
    city: "",
    phone: "",
    remember_me: true,
    delivery_method: "",
    delivery_price: undefined,
    billing_country: "",
    billing_firstname: "",
    billing_lastname: "",
    billing_address1: "",
    billing_address2: "",
    billing_zip_code: "",
    billing_city: "",
  });

  const value = {
    checkout,
    setCheckout,
  };

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
}

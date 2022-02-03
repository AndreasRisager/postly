import React, { useContext, createContext, useEffect, useState } from "react";

const CheckoutContext = createContext();

export function useCheckout() {
  return useContext(CheckoutContext);
}

export function CheckoutProvider({ children }) {
  const [checkout, setCheckout] = useState(
    JSON.parse(localStorage.getItem("checkout")) || {
      step: 1,
      email: "",
      country: "",
      firstname: "",
      lastname: "",
      business: "",
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
      billing_business: "",
      billing_address1: "",
      billing_address2: "",
      billing_zip_code: "",
      billing_city: "",
      billing_phone: "",
    }
  );

  useEffect(() => {
    if (checkout.remember_me) {
      localStorage.setItem("checkout", JSON.stringify(checkout));
    } else {
      localStorage.removeItem("checkout");
    }
  }, [checkout]);

  const value = {
    checkout,
    setCheckout,
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
}

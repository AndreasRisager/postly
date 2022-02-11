import React, { useState } from "react";
import InputField from "./InputField";

import { BASE_URL } from "../../utils/urls";
import axios from "axios";

export default function DiscountField({ setCheckout }) {
  const [discountInput, setDiscountInput] = useState("");
  const [discountError, setDiscountError] = useState("");
  async function handleDiscount(e) {
    e.preventDefault();

    // reset
    setCheckout((prev) => ({ ...prev, discount: undefined }));
    setDiscountError("");

    try {
      const { data } = await axios.get(`${BASE_URL}/discounts/${discountInput}`);
      setCheckout((prev) => ({ ...prev, discount: data }));
    } catch (error) {
      setDiscountError("Indtast en gyldig rabatkode");
      setCheckout((prev) => ({ ...prev, discount: undefined }));
    }
  }

  return (
    <form onSubmit={handleDiscount} className="checkout__discount">
      <div className="checkout__discount-field">
        <InputField
          type="text"
          id="discount"
          style={{ flex: "1" }}
          value={discountInput}
          onChange={(e) => {
            setDiscountInput(e.target.value);
          }}>
          Rabatkode
        </InputField>
        <button type="submit" className="checkout__discount-btn" disabled={!discountInput}>
          Brug
        </button>
      </div>
      {discountError && <p className="checkout__statusMessage">{discountError}</p>}
    </form>
  );
}

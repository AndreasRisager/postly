import { useState } from "react";
import InputField from "../layout/InputField";

export default function DiscountField({ setState }) {
  const [discountInput, setDiscountInput] = useState("");
  const [discountError, setDiscountError] = useState("");
  async function handleDiscount(e) {
    e.preventDefault();

    // reset
    setState((prev) => ({ ...prev, discount: "" }));
    setDiscountError("");

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/discounts/${discountInput}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      setState((prev) => ({ ...prev, discount: data }));
    } else {
      setDiscountError("Indtast en gyldig rabatkode");
      setState((prev) => ({ ...prev, discount: "" }));
    }
  }

  return (
    <form
      onSubmit={handleDiscount}
      noValidate
      autoComplete="off"
      className="pb-4 border-b border-inputBorder">
      <div className="flex gap-2">
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
        <button
          type="submit"
          className="bg-checkoutActiveColor rounded-md text-white font-semibold px-5 disabled:bg-[#a3a3a3] disabled:cursor-not-allowed"
          disabled={!discountInput}>
          Brug
        </button>
      </div>
      {discountError && <p className="text-red-600">{discountError}</p>}
    </form>
  );
}

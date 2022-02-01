import React from "react";
import "./InputField.scss";

export default function CheckoutField({
  children,
  id,
  type,
  value,
  style,
  ...rest
}) {
  const inputFocus = (e) => {
    e.target.parentNode.classList.add("checkout__field-wrapper--focus");
  };
  const inputRemoveFocus = (e) => {
    e.target.parentNode.classList.remove("checkout__field-wrapper--focus");
  };
  return (
    <div className="checkout__field-wrapper" style={style}>
      <label
        htmlFor={id}
        className={
          value ? "checkout__label checkout__label--float" : "checkout__label"
        }>
        {children}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        {...rest}
        placeholder={children}
        className="checkout__input"
        onFocus={inputFocus}
        onBlur={inputRemoveFocus}
      />
    </div>
  );
}

import React from "react";

const InputField = ({
  children,
  id,
  value,
  style,
  className,
  disabled,
  placeholder,
  blue,
  infoText,
  ...rest
}) => {
  const inputFocus = (e) => {
    e.target.parentNode.classList.add(
      `${!blue && "border-checkoutActiveColor"}`,
      `${blue ? `shadow-[0_0_0_1px_#2563eb]` : "shadow-input"}`
    );
  };
  const inputRemoveFocus = (e) => {
    e.target.parentNode.classList.remove(
      `${!blue && "border-checkoutActiveColor"}`,
      `${blue ? `shadow-[0_0_0_1px_#2563eb]` : "shadow-input"}`
    );
  };

  return (
    <div
      className={`relative border border-inputBorder rounded-md transition-all duration-200 ease-out col-span-2 ${
        className ? className : ""
      }`}
      style={style}>
      <label
        htmlFor={id}
        className={`transition-all duration-200 absolute left-3 pr-3 text-checkoutTextColor w-full truncate pointer-events-none ${
          value ? "opacity-100 top-1 text-sm peer" : "opacity-0 top-[14px] text-md"
        } ${disabled ? "cursor-not-allowed" : "cursor-text"}`}>
        {children}
      </label>
      <input
        id={id}
        name={id}
        value={value}
        disabled={disabled}
        aria-disabled={disabled}
        {...rest}
        placeholder={placeholder ? children + ": " + placeholder : children}
        className={`text-black border-none rounded-md block w-full py-3 px-3 text-[16px] outline-none transition-all duration-100 ease-out peer-first:pt-5 peer-first:px-3 peer-first:pb-1 placeholder:text-checkoutTextColor ${
          disabled ? "cursor-not-allowed" : "cursor-text"
        }`}
        onFocus={inputFocus}
        onBlur={inputRemoveFocus}
      />
    </div>
  );
};
export default InputField;

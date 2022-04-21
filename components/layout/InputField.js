import { DotsCircleHorizontalIcon } from "@heroicons/react/outline";
import React, { useState } from "react";

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
  const [open, setOpen] = useState(false);

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
      {disabled && infoText && (
        <button
          type="button"
          onClick={() => setOpen(!open)}
          onBlur={() => setOpen(false)}
          className="absolute right-1 top-1.5">
          {open && (
            <div className="absolute bottom-6 right-0 bg-white border border-black rounded-md p-1 w-[200px] cursor-default">
              {infoText}
            </div>
          )}
          <DotsCircleHorizontalIcon className="w-5 h-5 text-red-700" />
        </button>
      )}
    </div>
  );
};
export default InputField;

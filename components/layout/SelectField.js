function SelectField({ value, id, label, children, disabled, ...rest }) {
  const inputFocus = (e) => {
    e.target.parentNode.classList.add("border-checkoutActiveColor", "shadow-input");
  };
  const inputRemoveFocus = (e) => {
    e.target.parentNode.classList.remove("border-checkoutActiveColor", "shadow-input");
  };
  return (
    <div className="relative border border-inputBorder rounded-md transition-all duration-200 ease-out col-span-2 truncate">
      <label
        htmlFor={id}
        className={`transition-all duration-200 absolute w-full pr-3 left-3 pointer-events-none text-checkoutTextColor truncate opacity-100 top-1 text-sm peer ${
          disabled ? "cursor-not-allowed" : "cursor-default"
        }`}>
        {label}
      </label>
      <select
        id={id}
        name={id}
        disabled={disabled}
        {...rest}
        className={`text-black appearance-none border-none rounded-md block w-full pb-1 pt-[1.438rem] px-3 text-[16px] outline-none transition-all duration-100 ease-out ${
          disabled ? "cursor-not-allowed" : "cursor-default"
        }`}
        onFocus={inputFocus}
        onBlur={inputRemoveFocus}>
        {children}
      </select>
    </div>
  );
}
export default SelectField;

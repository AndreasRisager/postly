export default function RadioField({ children, id, style, ...rest }) {
  return (
    <div
      style={style}
      className="flex items-center border-t border-r border-l border-inputBorder first-of-type:rounded-t-md last-of-type:rounded-b-md last-of-type:border-b ">
      <input
        type="radio"
        id={id}
        {...rest}
        className="appearance-none border border-inputBorder rounded-full cursor-pointer h-[18px] w-[18px] ml-4 relative transition-all checked:border-[7px] peer checked:border-checkoutActiveColor"
      />
      <label
        htmlFor={id}
        className="flex flex-[1_1] cursor-pointer p-4 leading-5 gap-4 text-checkoutTextColor justify-between transition-all peer-checked:text-checkoutActiveColor">
        {children}
      </label>
    </div>
  );
}

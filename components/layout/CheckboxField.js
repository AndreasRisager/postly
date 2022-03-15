import { CheckIcon } from "@heroicons/react/solid";

export default function CheckboxField({ children, id, ...rest }) {
  return (
    <div className="flex items-center my-4">
      <div className="relative">
        <input
          type="checkbox"
          name={id}
          id={id}
          {...rest}
          className="w-[18px] h-[18px] border border-inputBorder appearance-none rounded flex items-center justify-center text-white transition-all duration-200 ease-in-out peer checked:border-[9px] checked:border-checkoutActiveColor "
        />
        <CheckIcon className="h-[18px] w-[18px] pointer-events-none text-white scale-0 opacity-0 transition-all duration-200 ease-in-out absolute top-0 left-0 peer-checked:scale-100 peer-checked:opacity-100 peer-checked:delay-200" />
      </div>
      <label htmlFor={id} className="pl-3 text-black text-md">
        {children}
      </label>
    </div>
  );
}

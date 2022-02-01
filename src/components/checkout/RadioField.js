import "./RadioField.scss";

export default function RadioField({
  children,
  name,
  id,
  value,
  icon,
  price,
  ...rest
}) {
  return (
    <div className="checkout__radio-wrapper">
      <input
        type="radio"
        name={name}
        id={id}
        {...rest}
        className="checkout__radio"
      />
      <label htmlFor={id} className="checkout__label">
        <span>
          {icon}
          {children}
        </span>
        {price && <span>{price}&nbsp;kr</span>}
      </label>
    </div>
  );
}

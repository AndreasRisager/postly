import "./RadioField.scss";

export default function RadioField({
  children,
  name,
  id,
  value,
  price,
  style,
  ...rest
}) {
  return (
    <div className="checkout__radio-wrapper" style={style}>
      <input
        type="radio"
        name={name}
        value={value}
        id={id}
        {...rest}
        className="checkout__radio"
      />
      <label htmlFor={id} className="checkout__label">
        {children}
      </label>
    </div>
  );
}

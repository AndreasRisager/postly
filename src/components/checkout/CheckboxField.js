export default function CheckboxField({ children, id, ...rest }) {
  return (
    <div className="checkout__checkbox-wrapper">
      <input
        type="checkbox"
        name={id}
        id={id}
        {...rest}
        className="checkout__checkbox"
      />
      <label htmlFor={id} className="checkout__label">
        {children}
      </label>
    </div>
  );
}

import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { useCart } from "../helpers/CartContext";
import "./Cart.scss";
import { Link } from "@reach/router";

export default function Cart() {
  const { cart, isCartEmpty, removeFromCart, totalPrice, updateItemQuantity } = useCart();

  if (isCartEmpty)
    return (
      <>
        <SiteHeader />
        <div className="cartEmpty">
          <i className="fab fa-opencart cartEmpty__icon" />
          <h1 className="cartEmpty__heading">Din indkøbskurv er tom!</h1>
          <Link to="/shop" className="cartEmpty__link">
            Gå til shop
          </Link>
        </div>
      </>
    );

  return (
    <>
      <SiteHeader />
      <main className="cart">
        <h1>Din indkøbskurv</h1>
        <section className="cart__products">
          <header className="cartHeader">
            <p className="cartHeader__product">Product</p>
            <p className="cartHeader__price">Pris</p>
            <p className="cartHeader__quantity">Antal</p>
            <p className="cartHeader__total">I alt</p>
          </header>
          {cart.map((item) => (
            <article className="cartProduct" key={item.id}>
              <div className="cartProduct__product">
                <img src={item.image?.url} alt={item.title} className="cartProduct__image" />
                <div className="cartProduct__info">
                  <Link to={`/product/${item.slug}`}>
                    <h3 className="cartProduct__title">{item.title}</h3>
                  </Link>
                  <p className="cartProduct__description">{item.description}</p>
                  <p className="cartProduct__description">Størrelse: {item.size}, Ramme: {item.frame}.</p>
                  {item.message && <p className="cartProduct__description">Besked: {item.message}</p>}
                  <button className="cartProduct__remove" onClick={() => removeFromCart(item)} aria-label={"Fjern " + item.title}>
                    Fjern
                  </button>
                </div>
              </div>
              <div className="cartProduct__price">
                <p>Pris</p>
                <span>{item.price.toFixed(2)}</span>&nbsp;kr
              </div>
              <div className="cartProduct__quantity">
                <p>Antal</p>
                <label htmlFor="quantity" className="screenreader">
                  Antal
                </label>
                <input
                  id="quantity"
                  type="number"
                  defaultValue={item.quantity}
                  min="0"
                  pattern="[0-9]*"
                  onChange={(e) => e.target.value !== "" && updateItemQuantity(item, Number(e.target.value))}
                />
              </div>
              <div className="cartProduct__totalPrice">
                <p>I alt</p>
                <span>{(item.price * item.quantity).toFixed(2)}</span>&nbsp;kr
              </div>
            </article>
          ))}
        </section>
        <section className="cartCheckout">
          <p className="cartCheckout__additionalCosts cartCheckout__text">Moms bliver medregnet og levering bliver beregnet ved kassen</p>
          <div className="cartCheckout__info">
            <p className="cartCheckout__text">Subtotal</p>
            <p className="cartCheckout__price">{totalPrice}&nbsp;kr</p>
          </div>
          <div className="cartCheckout__buttons">
            <Link to="/shop" className="cartCheckout__shop">
              Shop mere
            </Link>
            <Link to="/checkout" className="cartCheckout__checkout">
              Til kassen
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

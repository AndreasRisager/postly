import "./Product.scss";
import { useCart } from "../helpers/CartContext";
import { Link } from "@reach/router";

export default function Product({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} className="product__image" />
        <p className="product__name">{product.name}</p>
        <p className="product__price">fra {product.price.toFixed(2)} kr</p>
      </Link>
      <button className="product__button" onClick={() => addToCart(product)}>
        tilføj til kurv
      </button>
    </div>
  );
}

import "./Product.scss";
import { Link } from "@reach/router";

export default function Product({ product, listView }) {
  if (product.status !== "published") return;

  if (listView)
    return (
      <article className="product productList">
        <img src={product.image.url} alt={product.title} className="product__image" />
        <div className="product__info">
          <p className="product__title">{product.title}</p>
          <p className="product__price">{product.price.toFixed(2)}&nbsp;kr</p>
          <p className="product__description">{product.description}</p>
          <Link to={`/product/${product.slug}`} className="product__button">
            vis produkt
          </Link>
        </div>
      </article>
    );

  return (
    <article className="product">
      <Link to={`/product/${product.slug}`}>
        <img src={product.image.url} alt={product.title} className="product__image" />
        <div className="product__info">
          <p className="product__title">{product.title}</p>
          <p className="product__price">{product.price.toFixed(2)}&nbsp;kr</p>
          <Link to={`/product/${product.slug}`} className="product__button">
            vis produkt
          </Link>
        </div>
      </Link>
    </article>
  );
}

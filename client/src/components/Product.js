import "./Product.scss";
import { Link } from "@reach/router";

export default function Product({ product, listView }) {
  if (product.status !== "published") return;

  if (listView)
    return (
      <article className="productList">
        <img src={product.image.url} alt={product.title} className="productList__image" />
        <div className="productList__content">
          <p className="productList__name">{product.title}</p>
          <p className="productList__price">fra {product.price.toFixed(2)} kr</p>
          <p className="productList__description">{product.description}</p>
          <Link to={`/product/${product.slug}`} className="productList__button">
            vis produkt
          </Link>
        </div>
      </article>
    );

  return (
    <article className="product">
      <Link to={`/product/${product.slug}`}>
        <img src={product.image.url} alt={product.title} className="product__image" />
        <p className="product__name">{product.title}</p>
        <p className="product__price">fra {product.price.toFixed(2)} kr</p>
      </Link>
    </article>
  );
}

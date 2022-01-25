import axios from "axios";
import { useEffect, useState } from "react";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { useCart } from "../helpers/CartContext";
import "./ProductView.scss";

export default function ProductView({ slug }) {
  const { addToCart } = useCart();

  const [product, setProduct] = useState([]);
  useEffect(() => {
    async function getProduct() {
      const { data } = await axios.get(`https://postly-dk.herokuapp.com/products/${slug}`);
      setProduct(data);
    }
    getProduct();
  }, [slug]);

  return (
    <>
      <SiteHeader />
      <main>
        <section className="productView">
          <img src={product.image?.url} alt={product.title} />
          <div className="productView__content">
            <h2 className="productView__title">{product.title}</h2>
            <p className="productView__price">{product.price} kr</p>
            <p className="productView__description">{product.description}</p>
            <button className="product__button" onClick={() => addToCart(product)}>
              tilføj til kurv
            </button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

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
      const { data } = await axios.get(
        `https://postly-dk.herokuapp.com/products/${slug}`
      );
      setProduct(data);
    }
    getProduct();
  }, [slug]);

  const [size, setSize] = useState("50x70");
  const [frame, setFrame] = useState("Ingen ramme");
  const [message, setMessage] = useState("");
  
  function handleSubmit(e) {
    e.preventDefault();

    addToCart({ ...product, size, frame, message });
  }

  return (
    <>
      <SiteHeader />
      <main className="productPage">
        <section className="productView">
          <img
            src={product.image?.url}
            alt={product.title}
            className="productView__image"
          />
          <div className="productView__content">
            <h2 className="productView__title">{product.title}</h2>
            <p className="productView__price">{product.price}&nbsp;kr</p>
            <p className="productView__description">{product.description}</p>
            <form onSubmit={handleSubmit}>
              <div className="productView__size">
                <h4>Vælg størrelse:</h4>
                <label
                  htmlFor="size-s"
                  className={
                    size === "50x70"
                      ? "productView__option productView__option--active"
                      : "productView__option"
                  }
                >
                  50x70
                  <input
                    type="radio"
                    name="size"
                    id="size-s"
                    value="50x70"
                    checked={size === "50x70"}
                    onChange={(e) => setSize(e.target.value)}
                  />
                </label>
                <label
                  htmlFor="size-m"
                  className={
                    size === "A3"
                      ? "productView__option productView__option--active"
                      : "productView__option"
                  }
                >
                  A3
                  <input
                    type="radio"
                    name="size"
                    id="size-m"
                    value="A3"
                    checked={size === "A3"}
                    onChange={(e) => setSize(e.target.value)}
                  />
                </label>
                <label
                  htmlFor="size-l"
                  className={size === "A2" ? "productView__option productView__option--active" : "productView__option"}
                >
                  A2
                  <input
                    type="radio"
                    name="size"
                    id="size-l"
                    value="A2"
                    checked={size === "A2"}
                    onChange={(e) => setSize(e.target.value)}
                  />
                </label>
              </div>
              <div className="productView__frame">
                <h4>Vælg ramme:</h4>
                <label htmlFor="no-frame" className={frame === "Ingen ramme" ? "productView__option productView__option--active" : "productView__option"}>
                <p>Ingen</p>
                  <img src="../images/no-frame.png" alt="ingen ramme" />
                  <input
                    type="radio"
                    name="frame"
                    id="no-frame"
                    value="Ingen ramme"
                    checked={frame === "Ingen ramme"}
                    onChange={(e) => setFrame(e.target.value)}
                  />
                </label>
                <label htmlFor="oak-frame" className={frame === "Eg" ? "productView__option productView__option--active" : "productView__option"}>
                <p>Eg</p>
                  <img src="../images/oak-frame.jpg" alt="eg ramme" />
                  <input
                    type="radio"
                    name="frame"
                    id="oak-frame"
                    value="Eg"
                    checked={frame === "Eg"}
                    onChange={(e) => setFrame(e.target.value)}
                  />
                </label>
                <label htmlFor="white-frame" className={frame === "Hvid" ? "productView__option productView__option--active" : "productView__option"}>
                <p>Hvid</p>
                  <img src="../images/white-frame.jpg" alt="hvid ramme" />
                  <input
                    type="radio"
                    name="frame"
                    id="white-frame"
                    value="Hvid"
                    checked={frame === "Hvid"}
                    onChange={(e) => setFrame(e.target.value)}
                  />
                </label>
                <label htmlFor="black-frame" className={frame === "Sort" ? "productView__option productView__option--active" : "productView__option"}>
                  <p>Sort</p>
                  <img src="../images/black-frame.jpg" alt="sort ramme" />
                  <input
                    type="radio"
                    name="frame"
                    id="black-frame"
                    value="Sort"
                    checked={frame === "Sort"}
                    onChange={(e) => setFrame(e.target.value)}
                  />
                </label>
              </div>
              <div className="productView__message">
                <label htmlFor="message"><h4>Besked og særlige ønsker:</h4></label>
                <textarea id="message" onChange={(e) => setMessage(e.target.value)}></textarea>
              </div>
              <button className="product__button" type="submit" >tilføj til kurv</button>
            </form>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

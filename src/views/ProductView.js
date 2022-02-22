import { navigate } from "@reach/router";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCart } from "../helpers/CartContext";
import { BASE_URL } from "../utils/urls";
import "./ProductView.scss";
import {Helmet} from "react-helmet";

export default function ProductView({ slug }) {
  const { addToCart } = useCart();

  const [currentSize, setCurrentSize] = useState(undefined);
  const [currentFrame, setCurrentFrame] = useState(undefined);
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function getProduct() {
      const { data } = await axios.get(`${BASE_URL}/products/${slug}`);
      setProduct(data);
    }
    getProduct();
  }, [slug]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!currentSize && !currentFrame) return setStatusMessage("Vælg størrelse og ramme");
    if (!currentSize) return setStatusMessage("Vælg størrelse");
    if (!currentFrame) return setStatusMessage("Vælg ramme");
    setStatusMessage("");

    addToCart({ ...product, sizes: currentSize, frames: currentFrame, message });

    navigate("/cart");
  }

  return (
    <>
      <Helmet>
        <title>{product.title}</title>
        <meta name="description" content={`Fremragende '${product.title}' plakat.  Køb online hos POSTLY.`} />

        <meta property="og:url" content={`https://postly.netlify.app/product/${product.slug}`} />
        <meta property="og:title" content={`Postly | ${product.title}`} />
        <meta property="og:description" content={`Fremragende '${product.title}' plakat.  Køb online hos POSTLY.`} />
        <meta property="og:image" content={product.image?.url} />

        <meta property="twitter:url" content={`https://postly.netlify.app/product/${product.slug}`} />
        <meta name="twitter:title" content={`Postly | ${product.title}`} />
        <meta name="twitter:description" content={`Fremragende '${product.title}' plakat.  Køb online hos POSTLY.`} />
        <meta name="twitter:image" content={product.image?.url} />
      </Helmet>
      <main className="productPage">
        <section className="productView">
          <img src={product.image?.url} alt={product.title} className="productView__image" />
          <div className="productView__content">
            <h2 className="productView__title">{product.title}</h2>
            <p className="productView__price">
              {product.price !== undefined
                ? `${
                    product.price +
                    (currentSize ? currentSize.price : 0) +
                    (currentFrame ? currentFrame.price : 0)
                  }
              kr`
                : "loading..."}
            </p>
            <p className="productView__description">{product.description}</p>
            <form onSubmit={handleSubmit}>
              <div className="productView__size">
                <h4>
                  Vælg størrelse:{" "}
                  {`${currentSize && currentSize.price !== 0 ? "+ " + currentSize.price : ""}`}
                </h4>
                {product.sizes?.map((size) => (
                  <label
                    key={size.id}
                    htmlFor={"size-" + size.name}
                    className={
                      currentSize === size
                        ? "productView__option productView__option--active"
                        : "productView__option"
                    }>
                    {size.name}
                    <input
                      type="radio"
                      name="size"
                      id={"size-" + size.name}
                      value={size.name}
                      checked={currentSize === size}
                      onChange={() => setCurrentSize(size)}
                    />
                  </label>
                ))}
              </div>
              <div className="productView__frame">
                <h4>
                  Vælg ramme:{" "}
                  {`${currentFrame && currentFrame.price !== 0 ? "+ " + currentFrame.price : ""}`}
                </h4>
                {product.frames?.map((frame) => (
                  <label
                    key={frame.id}
                    htmlFor={frame.name + "-frame"}
                    className={
                      currentFrame === frame
                        ? "productView__option productView__option--active"
                        : "productView__option"
                    }>
                    <p>{frame.name}</p>
                    <img src={frame.image.url} alt={frame.name + " ramme"} />
                    <input
                      type="radio"
                      name="frame"
                      id={frame.name + "-frame"}
                      value={frame.name}
                      checked={currentFrame === frame}
                      onChange={() => setCurrentFrame(frame)}
                    />
                  </label>
                ))}
              </div>
              <div className="productView__message">
                <label htmlFor="message">
                  <h4>Besked og særlige ønsker:</h4>
                </label>
                <textarea id="message" onChange={(e) => setMessage(e.target.value)}></textarea>
              </div>
              <button className="product__button" type="submit">
                tilføj til kurv
              </button>
              {statusMessage && <p className="checkout__statusMessage">*{statusMessage}*</p>}
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

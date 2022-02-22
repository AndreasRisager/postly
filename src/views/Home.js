import axios from "axios";
import { useEffect, useState } from "react";
import ImageSlider from "../components/ImageSlider";
import Newsletter from "../components/Newsletter";
import Product from "../components/Product";
import "./Home.scss";
import {Helmet} from "react-helmet";

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getProducts() {
      const BASE_URL =
        process.env.NODE_ENV === "development"
          ? "http://localhost:1337"
          : "https://postly-dk.herokuapp.com";
      const { data } = await axios.get(`${BASE_URL}/categories/udvalgte`);
      setProducts(data.products);
    }
    getProducts();
  }, []);

  return (
    <>
      <Helmet>
        <meta name="title" content="Postly" />
      </Helmet>
      <ImageSlider />
      <main className="home">
        <section className="featured">
          <h2 className="featured__heading">Anbefalet til dig</h2>
          <div className="featured__products">
            {products.map((product) => (
              <Product product={product} key={product.id} />
            ))}
          </div>
        </section>
      </main>
      <Newsletter />
    </>
  );
}

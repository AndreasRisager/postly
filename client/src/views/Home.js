import axios from "axios";
import { useEffect, useState } from "react";
import ImageSlider from "../components/ImageSlider";
import Newsletter from "../components/Newsletter";
import Product from "../components/Product";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { SliderData } from "../components/SliderData";
import "./Home.scss";

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getProducts() {
      const { data } = await axios.get("https://postly-dk.herokuapp.com/categories/udvalgte");
      setProducts(data.products);
    }
    getProducts();
  }, []);

  return (
    <>
      <SiteHeader />
      <ImageSlider slides={SliderData} />
      <main className="home">
        <section className="featured">
          <h2 className="featured__heading">Udvalgte Produkter</h2>
          <div className="featured__products">
            {products.map((product) => (
              <Product product={product} key={product.id} />
            ))}
          </div>
        </section>
      </main>
      <Newsletter />
      <SiteFooter />
    </>
  );
}

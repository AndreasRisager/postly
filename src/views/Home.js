import axios from "axios";
import { useEffect, useState } from "react";
import ImageSlider from "../components/ImageSlider";
import Newsletter from "../components/Newsletter";
import Product from "../components/Product";
import "./Home.scss";

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getProducts() {
      const { data } = await axios.get("http://localhost:1337/categories/udvalgte");
      setProducts(data.products);
    }
    getProducts();
  }, []);

  return (
    <>
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

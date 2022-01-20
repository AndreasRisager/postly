import ImageSlider from "../components/ImageSlider";
import Newsletter from "../components/Newsletter";
import Product from "../components/Product";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { SliderData } from "../components/SliderData";
import "./Home.scss";
import products from "../items.json";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <ImageSlider slides={SliderData} />
      <main className="home">
        <section className="featuredProducts">
          {products.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </section>
      </main>
      <Newsletter />
      <SiteFooter />
    </>
  );
}

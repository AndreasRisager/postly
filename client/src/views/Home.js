import ImageSlider from "../components/ImageSlider";
import Newsletter from "../components/Newsletter";
import Product from "../components/Product";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { SliderData } from "../components/SliderData";
import "./Home.scss";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <ImageSlider slides={SliderData} />
      <main className="home">
        <section className="featuredProducts">
          <Product />
        </section>
      </main>
      <Newsletter />
      <SiteFooter />
    </>
  );
}

import ImageSlider from "../components/home/ImageSlider";
import Announcement from "../components/layout/Announcement";
import Layout from "../components/layout/Layout";
import Product from "../components/Product";
import { getAnnouncement } from "../lib/getAnnouncement";
import { getCategoryBySlug } from "../lib/getCategoryBySlug";
import { getSlides } from "../lib/getSlides";
import Link from "next/link";

function Home({ announcement, slides, products }) {
  return (
    <>
      <Announcement announcement={announcement} />
      <Layout newsletter>
        <ImageSlider slides={slides} />
        <section className="my-16">
          <div className="flex justify-between items-center">
            <h2 className="text-lg">Anbefalet til dig</h2>
            <Link href="/shop">Se mere</Link>
          </div>
          <div className="grid gap-1 items-end grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 ">
            {products.slice(0, 8).map((product) => (
              <Product product={product} key={product.id} />
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const announcement = await getAnnouncement();
  const slides = await getSlides();
  const products = await getCategoryBySlug("udvalgte");

  return { props: { announcement, slides, products } };
}

export default Home;

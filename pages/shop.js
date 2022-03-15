import { ViewGridIcon } from "@heroicons/react/solid";
import { ViewListIcon } from "@heroicons/react/outline";
import Head from "next/head";
import { useState } from "react";
import Announcement from "../components/layout/Announcement";
import Layout from "../components/layout/Layout";
import Product from "../components/Product";
import FilterShop from "../components/shop/FilterShop";
import { getAnnouncement } from "../lib/getAnnouncement";
import { getProducts } from "../lib/getProducts";
import { BsFilter } from "react-icons/bs";
import { getCategories } from "../lib/getCategories";

function Shop({ announcement, products, categories }) {
  const [filtered, setFiltered] = useState([]);
  const [listView, setListView] = useState(false);
  const [openFilterMenu, setOpenFilterMenu] = useState(false);
  const [priceLimit, setPriceLimit] = useState(undefined);
  const [category, setCategory] = useState(undefined);

  return (
    <>
      <Head>
        <title>Shop - Postly</title>
      </Head>
      <Announcement announcement={announcement} />
      <Layout className="max-w-screen-xl mx-auto flex flex-col sm:flex-row gap-6 p-8">
        <button
          className={`flex items-center max-w-max px-1 gap-2.5 sm:hidden border border-black rounded-md ${
            openFilterMenu ? "text-white bg-black" : "text-black"
          }`}
          onClick={() => setOpenFilterMenu(!openFilterMenu)}>
          Filter <BsFilter className="text-lg" />
        </button>
        <FilterShop
          open={openFilterMenu}
          categories={categories}
          setFiltered={setFiltered}
          products={products}
          category={category}
          setCategory={setCategory}
          priceLimit={priceLimit}
          setPriceLimit={setPriceLimit}
        />
        <div className="flex-1">
          <section className="flex flex-col sm:flex-row sm:items-center gap-3 sm:whitespace-nowrap">
            <div className="flex gap-1">
              <button
                className={
                  listView
                    ? "border rounded-md border-black"
                    : "border border-black rounded-md bg-black text-white"
                }
                onClick={() => setListView(false)}
                aria-label="change to product grid view">
                <ViewGridIcon className="h-[18px] w-[18px] m-0.5" />
              </button>
              <button
                className={
                  !listView
                    ? "border rounded-md border-black"
                    : "border border-black rounded-md bg-black text-white"
                }
                onClick={() => setListView(true)}
                aria-label="change to product list view">
                <ViewListIcon className="h-[18px] w-[18px] m-0.5" />
              </button>
            </div>
            <p>{filtered?.length} Produkter</p>
            <div className="flex-1 border-b border-grey" />
            <form>
              <label htmlFor="sort">Sorter efter</label>
              <select name="sort" id="sort" className="capitalize">
                <option value="price-lowest">Pris (laveste)</option>
                <option value="price-highest">Pris (højeste)</option>
                <option value="name-a">Navn (a-å)</option>
                <option value="name-å">Navn (å-a)</option>
              </select>
            </form>
          </section>
          <section className="mt-8">
            {filtered?.length === 0 && <h4>Beklager, ingen produkter matchede din søgning.</h4>}
            <div className="grid gap-1 grid-cols-2 md:grid-cols-shop items-end">
              {filtered?.map((product) => (
                <Product product={product} key={product.id} listView={listView} />
              ))}
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const announcement = await getAnnouncement();
  const products = await getProducts();
  const categories = await getCategories();

  return { props: { announcement, products, categories }, revalidate: 60 };
}

export default Shop;

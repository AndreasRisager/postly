import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import Product from "../components/Product";
import "./Shop.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import FilterShop from "../components/FilterShop";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [listView, setListView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFilterMenu, setOpenFilterMenu] = useState(false);

  useEffect(() => {
    async function getProducts() {
      setLoading(true);
      try {
        const { data } = await axios.get(`https://postly-dk.herokuapp.com/products`);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getProducts();
  }, []);

  return (
    <>
      <SiteHeader />
      <main className="shop">
        <button className={openFilterMenu ? "shopFilterMobile shopFilterMobile--active" : "shopFilterMobile"} onClick={() => setOpenFilterMenu(!openFilterMenu)}>Filter <i className="fas fa-funnel-dollar" /></button>
        <FilterShop open={openFilterMenu} />
        <div>
          <section className="shopSorting">
            <div className="shopSorting__views">
              <button
                className={`shopSorting__view${listView ? "" : " shopSorting__view--active"}`}
                onClick={() => setListView(false)}
                aria-label="change to product grid view">
                <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 2.5A1.5 1.5 0 012.5 1h3A1.5 1.5 0 017 2.5v3A1.5 1.5 0 015.5 7h-3A1.5 1.5 0 011 5.5v-3zm8 0A1.5 1.5 0 0110.5 1h3A1.5 1.5 0 0115 2.5v3A1.5 1.5 0 0113.5 7h-3A1.5 1.5 0 019 5.5v-3zm-8 8A1.5 1.5 0 012.5 9h3A1.5 1.5 0 017 10.5v3A1.5 1.5 0 015.5 15h-3A1.5 1.5 0 011 13.5v-3zm8 0A1.5 1.5 0 0110.5 9h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 13.5v-3z"></path>
                </svg>
              </button>
              <button
                className={`shopSorting__view${listView ? " shopSorting__view--active" : ""}`}
                onClick={() => setListView(true)}
                aria-label="change to product list view">
                <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 11.5A.5.5 0 013 11h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4A.5.5 0 013 7h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4A.5.5 0 013 3h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5z"></path>
                </svg>
              </button>
            </div>
            <p>{products.length} Produkter</p>
            <div className="shopSorting__line" />
            <form className="shopSorting__sort">
              <label htmlFor="sort">Sorter efter</label>
              <select name="sort" id="sort">
                <option value="price-lowest">Pris (laveste)</option>
                <option value="price-highest">Pris (højeste)</option>
                <option value="name-a">Navn (a-å)</option>
                <option value="name-å">Navn (å-a)</option>
              </select>
            </form>
          </section>
          <section className="shopProducts">
            {loading && <h4>Loading...</h4>} 
            {!loading && products.length === 0 && <h4>Beklager, ingen produkter matchede din søgning.</h4>}
            <div className={listView ? "products productsList" : "products"}>
                {products.map((product) => <Product product={product} key={product.id} listView={listView} />)}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

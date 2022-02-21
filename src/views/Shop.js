import Product from "../components/Product";
import "./Shop.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import FilterShop from "../components/FilterShop";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [listView, setListView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFilterMenu, setOpenFilterMenu] = useState(false);
  const [priceLimit, setPriceLimit] = useState(undefined);
  const [category, setCategory] = useState(undefined);

  useEffect(() => {
    async function getProducts() {
      setLoading(true);
      try {
        const { data } = await axios.get(`https://postly-dk.herokuapp.com/products`);
        setProducts(data);
        setFiltered(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getProducts();
  }, []);

  return (
    <main className="shop">
      <button
        className={
          openFilterMenu ? "shopFilterMobile shopFilterMobile--active" : "shopFilterMobile"
        }
        onClick={() => setOpenFilterMenu(!openFilterMenu)}>
        Filter <i className="fas fa-funnel-dollar" />
      </button>
      <FilterShop open={openFilterMenu} setFiltered={setFiltered} products={products} category={category} setCategory={setCategory} priceLimit={priceLimit} setPriceLimit={setPriceLimit} />
      <div>
        <section className="shopSorting">
          <div className="shopSorting__views">
            <button
              className={`shopSorting__view${listView ? "" : " shopSorting__view--active"}`}
              onClick={() => setListView(false)}
              aria-label="change to product grid view">
              <i className="fas fa-th-large" />
            </button>
            <button
              className={`shopSorting__view${listView ? " shopSorting__view--active" : ""}`}
              onClick={() => setListView(true)}
              aria-label="change to product list view">
              <i className="fas fa-bars" />
            </button>
          </div>
          <p>{filtered.length} Produkter</p>
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
          {!loading && filtered.length === 0 && (
            <h4>Beklager, ingen produkter matchede din søgning.</h4>
          )}
          <div className={listView ? "products productsList" : "products"}>
            {filtered.map((product) => (
              <Product product={product} key={product.id} listView={listView} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

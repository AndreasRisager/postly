import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import "./Shop.scss";

export default function Shop() {
  return (
    <>
      <SiteHeader />
      <main className="shop">
        <aside className="shopFilter">
          <div className="shopFilter__content">
            <form>
              <label htmlFor="searchFilter" className="screenreader">
                search
              </label>
              <input
                type="searchFilter"
                name="searchFilter"
                id="searchFilter"
                placeholder="Søg"
              />
            </form>
            <div className="shopFilter__filter">
              <h4 className="shopFilter__title">Kategori</h4>
              <button className="shopFilter__button shopFilter__button--active">
                alle
              </button>
              <button className="shopFilter__button">udvalgte</button>
              <button className="shopFilter__button">nyheder</button>
              <button className="shopFilter__button">vinter</button>
              <button className="shopFilter__button">sommer</button>
            </div>
            <div className="shopFilter__filter">
              <h4 className="shopFilter__title">Pris</h4>
              <button className="shopFilter__button shopFilter__button--active">
                alle
              </button>
              <button className="shopFilter__button">under 200 kr</button>
              <button className="shopFilter__button">under 300 kr</button>
              <button className="shopFilter__button">under 400 kr</button>
              <button className="shopFilter__button">under 500 kr</button>
            </div>
            <button className="shopFilter__clear">Fjern filtre</button>
          </div>
        </aside>
        <div>
          <section className="shopSorting">
            <div className="shopSorting__views">
              <button
                className="shopSorting__view shopSorting__view--active"
                aria-label="change to product grid view"
              >
                <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 2.5A1.5 1.5 0 012.5 1h3A1.5 1.5 0 017 2.5v3A1.5 1.5 0 015.5 7h-3A1.5 1.5 0 011 5.5v-3zm8 0A1.5 1.5 0 0110.5 1h3A1.5 1.5 0 0115 2.5v3A1.5 1.5 0 0113.5 7h-3A1.5 1.5 0 019 5.5v-3zm-8 8A1.5 1.5 0 012.5 9h3A1.5 1.5 0 017 10.5v3A1.5 1.5 0 015.5 15h-3A1.5 1.5 0 011 13.5v-3zm8 0A1.5 1.5 0 0110.5 9h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 13.5v-3z"></path>
                </svg>
              </button>
              <button
                className="shopSorting__view"
                aria-label="change to product list view"
              >
                <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 11.5A.5.5 0 013 11h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4A.5.5 0 013 7h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4A.5.5 0 013 3h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5z"></path>
                </svg>
              </button>
            </div>
            <p>6 Produkter</p>
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
            <article className="shopProduct">
              <img
                src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                alt="produkt navn"
              />
              <h3 className="shopProduct__name">Produkt navn</h3>
              <p className="shopProduct__price">385,75 kr</p>
            </article>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

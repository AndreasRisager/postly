import { useState } from "react";
import "./FilterShop.scss";

export default function FilterShop({open}) {  
  const [priceLimit, setPriceLimit] = useState(undefined);
  const [category, setCategory] = useState(undefined);

    return (
        <aside className={open ? "shopFilter shopFilter--open" : "shopFilter"}>
          <div className="shopFilter__content">
            <form>
              <label htmlFor="searchFilter" className="screenreader">
                søg
              </label>
              <input type="searchFilter" name="searchFilter" id="searchFilter" placeholder="Søg" />
            </form>
            <div className="shopFilter__filter">
              <h4 className="shopFilter__title">Kategori</h4>
              <button className={`shopFilter__button${category === undefined ? " shopFilter__button--active" : ""}`} onClick={() => setCategory()}>
                alle
              </button>
              <button
                className={`shopFilter__button${category === "Udvalgte" ? " shopFilter__button--active" : ""}`}
                onClick={() => setCategory("Udvalgte")}>
                udvalgte
              </button>
              <button
                className={`shopFilter__button${category === "Nyheder" ? " shopFilter__button--active" : ""}`}
                onClick={() => setCategory("Nyheder")}>
                nyheder
              </button>
              <button
                className={`shopFilter__button${category === "Vinter" ? " shopFilter__button--active" : ""}`}
                onClick={() => setCategory("Vinter")}>
                vinter
              </button>
              <button
                className={`shopFilter__button${category === "Sommer" ? " shopFilter__button--active" : ""}`}
                onClick={() => setCategory("Sommer")}>
                sommer
              </button>
            </div>
            <div className="shopFilter__filter">
              <h4 className="shopFilter__title">Pris</h4>
              <button
                className={`shopFilter__button${priceLimit === undefined ? " shopFilter__button--active" : ""}`}
                onClick={() => setPriceLimit(undefined)}>
                alle
              </button>
              <button className={`shopFilter__button${priceLimit === 200 ? " shopFilter__button--active" : ""}`} onClick={() => setPriceLimit(200)}>
                under 200 kr
              </button>
              <button className={`shopFilter__button${priceLimit === 300 ? " shopFilter__button--active" : ""}`} onClick={() => setPriceLimit(300)}>
                under 300 kr
              </button>
              <button className={`shopFilter__button${priceLimit === 400 ? " shopFilter__button--active" : ""}`} onClick={() => setPriceLimit(400)}>
                under 400 kr
              </button>
              <button className={`shopFilter__button${priceLimit === 500 ? " shopFilter__button--active" : ""}`} onClick={() => setPriceLimit(500)}>
                under 500 kr
              </button>
            </div>
            <button
              className="shopFilter__clear"
              onClick={() => {
                setPriceLimit(undefined);
                setCategory(undefined);
              }}>
              Fjern filtre
            </button>
          </div>
        </aside>
    )
}
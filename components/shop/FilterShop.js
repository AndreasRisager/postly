import { useEffect } from "react";

export default function FilterShop({
  open,
  setFiltered,
  categories,
  products,
  category,
  setCategory,
  priceLimit,
  setPriceLimit,
}) {
  useEffect(() => {
    setFiltered(products);
    if (category) {
      const filteredByCategory = products.filter((item) => {
        const categoryName = item.categories.map((category) => category.name);
        return categoryName.includes(category);
      });
      if (priceLimit) {
        const filtered = filteredByCategory.filter((item) => item.price <= priceLimit);
        setFiltered(filtered);
      } else {
        setFiltered(filteredByCategory);
      }
      return;
    }
    if (priceLimit) {
      const filtered = products.filter((item) => item.price <= priceLimit);
      setFiltered(filtered);
    }
  }, [setFiltered, products, category, priceLimit]);

  return (
    <aside className={open ? "sm:max-w-[200px] text-filterButton" : "hidden sm:block"}>
      <div className="flex flex-col sticky top-4 gap-6">
        <form>
          <label htmlFor="searchFilter" className="screenreader">
            søg
          </label>
          <input
            type="searchFilter"
            className="w-full bg-gray-100 py-1.5 px-3 rounded-md"
            name="searchFilter"
            id="searchFilter"
            placeholder="Søg"
          />
        </form>
        <div className="flex flex-col items-start">
          <h4 className="text-textColor text-lg font-medium">Kategori</h4>
          <button
            className={`capitalize py-1 my-0.5 text-left leading-5 text-filterButton border-b md:text-md ${
              category === undefined ? "border-filterButton" : "border-transparent"
            }`}
            onClick={() => setCategory()}>
            alle
          </button>
          {categories.map((btn) => (
            <button
              key={btn.id}
              className={`capitalize py-1 my-0.5 text-left leading-5 text-filterButton border-b md:text-md ${
                category === btn.name ? "border-filterButton" : "border-transparent"
              }`}
              onClick={() => setCategory(btn.name)}>
              {btn.name}
            </button>
          ))}
        </div>
        <div className="flex flex-col items-start">
          <h4 className="text-textColor text-lg font-medium">Pris</h4>
          <button
            className={`capitalize py-1 my-0.5 text-left leading-5 text-filterButton border-b md:text-md ${
              priceLimit === undefined ? "border-filterButton" : "border-transparent"
            }`}
            onClick={() => setPriceLimit(undefined)}>
            alle
          </button>
          <button
            className={`capitalize py-1 my-0.5 text-left leading-5 text-filterButton border-b md:text-md ${
              priceLimit === 300 ? "border-filterButton" : "border-transparent"
            }`}
            onClick={() => setPriceLimit(300)}>
            under 300 kr
          </button>
          <button
            className={`capitalize py-1 my-0.5 text-left leading-5 text-filterButton border-b md:text-md ${
              priceLimit === 500 ? "border-filterButton" : "border-transparent"
            }`}
            onClick={() => setPriceLimit(500)}>
            under 500 kr
          </button>
          <button
            className={`capitalize py-1 my-0.5 text-left leading-5 text-filterButton border-b md:text-md ${
              priceLimit === 1000 ? "border-filterButton" : "border-transparent"
            }`}
            onClick={() => setPriceLimit(1000)}>
            under 1000 kr
          </button>
        </div>
        <button
          className="bg-red-600 text-white rounded-sm self-start px-3 py-0.5"
          onClick={() => {
            setPriceLimit(undefined);
            setCategory(undefined);
          }}>
          Fjern filtre
        </button>
      </div>
    </aside>
  );
}

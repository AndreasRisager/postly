export async function getCategories() {
  const res = await fetch(`https://postly-dk.herokuapp.com/categories`);
  const data = await res.json();

  return data;
}

export async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
  const data = await res.json();

  return data;
}

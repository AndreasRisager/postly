export async function getCategoryBySlug(category) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${category}`);
  const data = await res.json();

  return data.products;
}

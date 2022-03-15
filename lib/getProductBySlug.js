export async function getProductBySlug(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`);
  const data = await res.json();

  return data;
}

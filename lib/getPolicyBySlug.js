export async function getPolicyBySlug(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/policies/${slug}`);
  const data = await res.json();

  return data;
}

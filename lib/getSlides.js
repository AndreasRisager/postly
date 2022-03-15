export async function getSlides() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/slides`);
  const data = await res.json();

  return data;
}

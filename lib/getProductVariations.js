export async function getProductVariations() {
  const frameRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/frames`);
  const sizeRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sizes`);
  const sizes = await sizeRes.json();
  const frames = await frameRes.json();

  return { sizes, frames };
}

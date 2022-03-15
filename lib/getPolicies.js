export async function getPolicies() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/policies`);
  const data = await res.json();

  return data;
}

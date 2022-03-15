export async function getAnnouncement() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/announcement`);
  const data = await res.json();

  return data.text;
}

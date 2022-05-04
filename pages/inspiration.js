import Announcement from "../components/layout/Announcement";
import Layout from "../components/layout/Layout";
import { getAnnouncement } from "../lib/getAnnouncement";

function Inspiration({ announcement }) {
  return (
    <>
      <Announcement announcement={announcement} />
      <Layout title="Find Inspiration">
        <h1 className="text-center text-xl py-40">Find Inspiration er ikke tilgængelig endnu</h1>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const announcement = await getAnnouncement();

  return { props: { announcement }, revalidate: 60 };
}

export default Inspiration;

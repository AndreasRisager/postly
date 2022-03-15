import Announcement from "../../components/layout/Announcement";
import Layout from "../../components/layout/Layout";
import { getAnnouncement } from "../../lib/getAnnouncement";
import Head from "next/head";

function giftCard({ announcement }) {
  return (
    <>
      <Head>
        <title>Gavekort - Postly</title>
      </Head>
      <Announcement announcement={announcement} />
      <Layout>
        <h1 className="text-center text-xl py-40">Gavekort er ikke tilgængelig lige nu</h1>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const announcement = await getAnnouncement();

  return { props: { announcement }, revalidate: 60 };
}

export default giftCard;

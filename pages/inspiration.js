import Announcement from "../components/layout/Announcement";
import Layout from "../components/layout/Layout";
import { getAnnouncement } from "../lib/getAnnouncement";
import Head from "next/head";

function Inspiration({ announcement }) {
  return (
    <>
      <Head>
        <title>Find Inspiration - Postly</title>
      </Head>
      <Announcement announcement={announcement} />
      <Layout>
        <h1 className="text-center text-xl py-40">Find Inspiration er ikke tilgængelig lige nu</h1>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const announcement = await getAnnouncement();

  return { props: { announcement } };
}

export default Inspiration;

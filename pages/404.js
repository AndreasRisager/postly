import Error from "next/error";
import Layout from "../components/layout/Layout";

export default function Error404() {
  return (
    <Layout>
      <Error statusCode={404} />
    </Layout>
  );
}

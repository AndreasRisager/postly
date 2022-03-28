import Error from "next/error";
import Layout from "../components/layout/Layout";

export default function Error500() {
  return (
    <Layout>
      <Error statusCode={500} />
    </Layout>
  );
}

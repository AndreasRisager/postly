import Link from "next/link";
import Layout from "../components/layout/Layout";

export default function success() {
  return (
    <Layout title="Tak for dit køb!">
      <div className="max-w-xs mx-auto my-40 p-4 flex flex-col items-center">
        <h1 className="text-2xl mb-4">Tak for dit køb!</h1>
        <Link href="/profile">
          <a className="bg-primaryColor rounded-md font-medium py-3 px-4">Se din ordre</a>
        </Link>
      </div>
    </Layout>
  );
}

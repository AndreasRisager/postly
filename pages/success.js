import Link from "next/link";
import Layout from "../components/layout/Layout";

export default function success() {
  return (
    <Layout title="Tak for dit køb!">
      <div className="max-w-sm mx-auto my-40 p-4">
        <h1 className="text-2xl">Tak for dit køb!</h1>
        <p className="text-gray-500">Du vil modtage en bekræftelse på din email.</p>
        <div className="flex flex-wrap-reverse gap-2 mt-5">
          <Link href="/">
            <a className="bg-primaryColor rounded-md font-medium py-3 px-4 flex-grow">
              Tilbage til forsiden
            </a>
          </Link>
          <Link href="/profile">
            <a className="bg-primaryColor rounded-md font-medium py-3 px-4 flex-grow">
              Se din ordre
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

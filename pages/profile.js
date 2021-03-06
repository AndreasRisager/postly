import { useSession } from "next-auth/react";
import Layout from "../components/layout/Layout";
import { ChevronRightIcon } from "@heroicons/react/solid";
import Orders from "../components/profile/Orders";
import Address from "../components/profile/Address";
import Account from "../components/profile/Account";
import { useRouter } from "next/router";
import Link from "next/link";
import Announcement from "../components/layout/Announcement";
import { getAnnouncement } from "../lib/getAnnouncement";
import Image from "next/image";

function Profile({ announcement }) {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push(`/auth/login?from=${router.asPath}`);
    },
  });
  const { page } = router.query;

  const user = session?.user?.data;

  const formatAddress = `
  ${user?.country ? user.country.split("-")[0] + "," : ""}
  ${user?.address1 ? user.address1 + "," : ""}
  ${user?.address2 ? user.address2 + "," : ""}
  ${user?.zip ? user.zip + "," : ""}
  ${user?.city ? user.city + "," : ""}
  ${user?.phone ? user.phone : ""}`;

  return (
    <>
      <Announcement announcement={announcement} />
      <Layout title="Profil">
        {status !== "authenticated" && <h1 className="text-2xl text-center my-40">Loading...</h1>}
        {session && (
          <div className="flex flex-col sm:flex-row gap-4 md:gap-8 my-10 max-w-5xl mx-auto">
            <aside className="sm:w-[250px] flex-shrink-0">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 shrink-0 rounded-xl bg-primaryColor text-white font-semibold text-xl flex items-center justify-center uppercase outline outline-2 outline-black">
                  {session?.user?.data?.username[0]}
                </div>
                <div className="ml-2 truncate">
                  <h2 className="text-base text-black font-medium truncate capitalize">
                    {session.user?.data?.username}
                  </h2>
                  <p className="text-sm text-black truncate">{session.user?.data?.email}</p>
                </div>
              </div>
              <div className="border border-inputBorder rounded-md">
                <Link
                  href={{
                    pathname: router.pathname,
                    query: { ...router.query, page: 1 },
                  }}>
                  <a>
                    <div className="flex items-center px-2 py-3 border-b border-inputBorder hover:bg-slate-100 rounded-t-md cursor-pointer">
                      <div className="flex-1">
                        <h3 className="font-medium text-black">Mine Ordrer</h3>
                        <p className="text-gray-500 text-sm">Her er dine ordrer</p>
                      </div>
                      <ChevronRightIcon className="w-6 h-6 text-inputBorder" />
                    </div>
                  </a>
                </Link>
                <Link
                  href={{
                    pathname: router.pathname,
                    query: { ...router.query, page: 2 },
                  }}>
                  <a>
                    <div className="flex items-center px-2 py-3 border-b border-inputBorder hover:bg-slate-100 cursor-pointer">
                      <div className="flex-1">
                        <h3 className="font-medium text-black">Leveringsadresse</h3>
                        <p className="text-gray-500 text-sm">
                          {formatAddress.trim() ? formatAddress : "Ingen adresse"}
                        </p>
                      </div>
                      <ChevronRightIcon className="w-6 h-6 text-inputBorder" />
                    </div>
                  </a>
                </Link>
                <Link
                  href={{
                    pathname: router.pathname,
                    query: { ...router.query, page: 3 },
                  }}>
                  <a>
                    <div className="flex items-center px-2 py-3 hover:bg-slate-100 rounded-b-md cursor-pointer">
                      <div className="flex-1">
                        <h3 className="font-medium text-black">Konto</h3>
                        <p className="text-gray-500 text-sm">Log ud, Instillinger</p>
                      </div>
                      <ChevronRightIcon className="w-6 h-6 text-inputBorder" />
                    </div>
                  </a>
                </Link>
              </div>
            </aside>
            <section className="flex-grow">
              {(page === "1" || !page) && <Orders />}
              {page === "2" && <Address />}
              {page === "3" && <Account />}
            </section>
          </div>
        )}
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const announcement = await getAnnouncement();

  return { props: { announcement }, revalidate: 60 };
}

export default Profile;

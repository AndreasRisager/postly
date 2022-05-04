import Link from "next/link";
import { useState } from "react";
import { useCart } from "../../helpers/CartContext";
import { ShoppingBagIcon, UserIcon } from "@heroicons/react/solid";
import { SearchIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import PrimaryNavigation from "./PrimaryNavigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function SiteHeader() {
  const [openMenu, setOpenMenu] = useState(false);
  const { totalItems } = useCart();
  const { data: session } = useSession();

  return (
    <>
      <header className="flex flex-col py-6 px-5 sm:px-8 border-b border-b-grey relative">
        <nav className="flex gap-1 items-center justify-between max-w-7xl w-full mx-auto sm:grid sm:grid-cols-3">
          <Link href="/">
            <a className="text-xl sm:text-4xl font-medium text-center col-start-2">
              <div className="h-14 w-28 sm:w-auto mx-auto relative">
                <Image
                  src="https://res.cloudinary.com/dffpafuyg/image/upload/v1650574451/logo_postly_aflangt_bed1c4331c.png"
                  alt="postly logo"
                  layout="fill"
                  objectFit="contain"
                  priority
                />
              </div>
            </a>
          </Link>
          <div className="flex justify-end items-center gap-3">
            <Link href="/shop?search=true">
              <a aria-label="open search">
                <SearchIcon className="h-6 w-6" />
              </a>
            </Link>

            <Link href="/profile">
              <a>
                {session ? (
                  <p className="h-6 w-6 rounded-full bg-primaryColor text-white text-md font-medium flex items-center justify-center uppercase outline outline-2 outline-black">
                    {session?.user?.data?.username[0]}
                  </p>
                ) : (
                  <UserIcon className="h-6 w-6 cursor-pointer" />
                )}
              </a>
            </Link>

            <Link href="/cart">
              <a className="relative cursor-pointer">
                <ShoppingBagIcon className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-primaryColor rounded-full w-5 h-5 text-sm text-center">
                  {totalItems > 100 ? "99" : totalItems}
                </span>
              </a>
            </Link>
            <button
              className="sm:hidden z-50"
              onClick={() => setOpenMenu(!openMenu)}
              aria-label="open the menu">
              {!openMenu ? <MenuIcon className="h-6 w-6" /> : <XIcon className="h-6 w-6" />}
            </button>
          </div>
        </nav>
        <PrimaryNavigation open={openMenu} setOpenMenu={setOpenMenu} />
      </header>
    </>
  );
}

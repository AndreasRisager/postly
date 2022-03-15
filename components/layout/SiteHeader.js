import Link from "next/link";
import { useState } from "react";
import { useCart } from "../../helpers/CartContext";
import { ShoppingBagIcon, UserIcon } from "@heroicons/react/solid";
import { SearchIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import PrimaryNavigation from "./PrimaryNavigation";
import { useSession } from "next-auth/react";

export default function SiteHeader() {
  const [openMenu, setOpenMenu] = useState(false);
  const { totalItems } = useCart();
  const { data: session } = useSession();

  return (
    <>
      <header className="flex flex-col py-6 px-5 sm:px-8 border-b border-b-grey relative">
        <nav className="flex gap-1 items-center justify-between max-w-7xl w-full mx-auto sm:grid sm:grid-cols-3">
          <Link href="/">
            <a className="text-xl sm:text-4xl font-medium col-start-2 text-center">POSTLY.DK</a>
          </Link>
          <div className="flex justify-end items-center gap-3">
            <button aria-label="open search">
              <SearchIcon className="h-6 w-6" />
            </button>

            <Link href="/profile">
              <a className="h-6 w-6 rounded-full overflow-hidden">
                {session ? (
                  <img src={session.user.image} alt={"profile pic of " + session.user.name} />
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
        <PrimaryNavigation open={openMenu} />
      </header>
    </>
  );
}

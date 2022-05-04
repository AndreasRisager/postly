import Link from "next/link";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";

export default function PrimaryNavigation({ open, setOpenMenu }) {
  return (
    <nav
      onClick={() => setOpenMenu(false)}
      className={
        open
          ? "bg-white flex flex-col justify-center w-full fixed top-0 bottom-0 right-0 left-0 sm:pt-6 sm:bg-transparent sm:static sm:block z-40"
          : "hidden sm:block pt-6"
      }
      aria-label="Main menu">
      <ul className="flex flex-col justify-between sm:justify-center mt-4 max-h-1/3 sm:flex-row items-center text-center sm:text-left sm:flex-wrap gap-5 max-w-7xl mx-auto">
        <li className="sm:ml-auto">
          <Link href="/shop">Shop</Link>
        </li>
        <li>
          <Link href="/inspiration">Find Inspiration</Link>
        </li>
        <li>
          <Link href="/products/gift-card">Gavekort</Link>
        </li>
        <li>
          <Link href="/#newsletter">Nyhedsbrev</Link>
        </li>
        <li className="sm:mr-auto">
          <Link href="/#kundeservice">Kundeservice</Link>
        </li>
        <li className="flex gap-5">
          <a
            href="https://www.facebook.com/Postlydk-106941115181644/"
            target="_blank"
            rel="noreferrer"
            title="Besøg vores facebook">
            <FaFacebookSquare className="text-xl" />
          </a>
          <a
            href="https://www.instagram.com/postly.dk/"
            target="_blank"
            rel="noreferrer"
            title="Besøg vores instagram">
            <FaInstagram className="text-xl" />
          </a>
        </li>
      </ul>
    </nav>
  );
}

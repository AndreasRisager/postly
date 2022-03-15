import Link from "next/link";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { CheckIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function SiteFooter() {
  const { data: session } = useSession();
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (e.target.footerNewsletter.value) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscribers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: e.target.footerNewsletter.value, activated: true }),
      });
      if (response.ok) {
        setSubscribed(true);
      }
    }
  };
  return (
    <footer className="bg-footerColor">
      <div className="max-w-7xl mx-auto flex flex-wrap p-8 border-b border-grey">
        <div className="flex-1 basis-full sm:basis-1/2 lg:basis-1/4 flex flex-col py-4 pr-4">
          <h3 className="text-base font-semibold mb-6 uppercase">Postly.dk</h3>
          <p className="mb-5">
            Postly.dk
            <br />
            Adresse
            <br />
            2650 Hvidovre
          </p>
          <p className="mb-5">CVR. nr. 12345678</p>
          <p className="uppercase">Presse </p>
          <a
            href="mailto:kontakt@postly.dk"
            className="underline"
            title="mailto:kontakt@postly.dk"
            aria-describedby="a11y-external-message">
            kontakt@postly.dk
          </a>
        </div>
        <div className="flex-1 basis-full sm:basis-1/2 lg:basis-1/4 flex flex-col py-4 pr-4">
          <h3 className="text-base font-semibold mb-6 uppercase">Kundeservice</h3>
          <p className="mb-5">
            Kontakt mig gerne på <br />
            <a
              href="mailto:kontakt@postly.dk"
              className="underline"
              title="mailto:kontakt@postly.dk"
              aria-describedby="a11y-external-message">
              kontakt@postly.dk
            </a>
          </p>
          <p className="mb-5">Jeg besvarer din mail indenfor 24 timer, mandag til fredag.</p>
        </div>
        <div className="flex-1 basis-full sm:basis-1/2 lg:basis-1/4 flex flex-col py-4 pr-4">
          <h3 className="text-base font-semibold mb-6 uppercase">Yderligere service</h3>
          <p className="uppercase">Betingelser</p>
          <Link href="/policies/terms-of-service">
            <a className="underline">Handelsbetingelser</a>
          </Link>
          <Link href="/policies/privacy-policy">
            <a className="underline">
              Privatlivspolitik/
              <br />
              Cookies
            </a>
          </Link>
        </div>
        <div className="flex-1 basis-full sm:basis-1/2 lg:basis-1/4 flex flex-col py-4">
          <h3 className="text-base font-semibold mb-6 uppercase">Nyhedsbrev</h3>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label htmlFor="footerNewsletter" className="screenreader">
              nyhedsbrev
            </label>
            <input
              type="email"
              name="footerNewsletter"
              id="footerNewsletter"
              placeholder="E-mailadresse"
              defaultValue={session?.user.data.email}
              className="w-full bg-white py-3 pl-5 pr-1 truncate rounded-sm border border-inputBorder sm:min-w-[185px] max-w-sm min-h-[46px]"
            />
            <button
              type="submit"
              className={`bg-primaryColor uppercase py-3 px-5 rounded-sm text-sm font-semibold mt-1 min-h-[46px] w-max`}>
              {subscribed ? "Tilmeldt" : "Tilmeld"}
              {subscribed ? <CheckIcon className="w-5 h-5 inline align-top -mr-1.5" /> : ""}
            </button>
          </form>
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-8">
        <ul className="flex py-4">
          <li className="pr-4">
            <a href="/">
              <FaFacebookSquare className="text-2xl" />
            </a>
          </li>
          <li className="pr-4">
            <a href="/">
              <FaInstagram className="text-2xl" />
            </a>
          </li>
        </ul>
        <p className="mb-5">&copy; 2022, Postly.dk</p>
      </div>
    </footer>
  );
}

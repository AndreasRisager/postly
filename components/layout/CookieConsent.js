import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaCookie } from "react-icons/fa";

export default function CookieConsent() {
  const [cookieConsent, setCookieConsent] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCookieConsent(localStorage.getItem("cookieConsent"));
    }
  }, []);

  function handleClick() {
    localStorage.setItem("cookieConsent", true);
    setCookieConsent(true);
  }

  return (
    <div
      className={`bg-white fixed bottom-0 left-0 right-0 transition-all duration-500 z-50 flex flex-wrap sm:flex-nowrap items-center justify-between py-2.5 px-4 shadow-[rgb(0_0_0_/_12%)_0px_0px_6px] rounded-md gap-2 ${
        cookieConsent ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}>
      <div className="flex items-center">
        <FaCookie className="w-7 h-7 text-[#d6a252] mr-2" />
        <p className="flex-1">
          Denne hjemmeside bruger cookies for at sikre, at du får den bedste oplevelse på vores
          hjemmeside.{" "}
          <Link href="/policies/privacy-policy">
            <a className="whitespace-nowrap border-b border-black">Læs mere</a>
          </Link>
        </p>
      </div>
      <button
        type="button"
        className="bg-blue-900 text-white cursor-pointer whitespace-nowrap py-3 px-6"
        onClick={handleClick}>
        Godkend
      </button>
    </div>
  );
}

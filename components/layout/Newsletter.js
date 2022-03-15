import { CheckIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Newsletter() {
  const { data: session } = useSession();
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (e.target.newsletterForm.value) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscribers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: e.target.newsletterForm.value, activated: true }),
      });
      if (response.ok) {
        setSubscribed(true);
      }
    }
  };
  return (
    <section className="bg-[#faf3ee] py-12 px-4 text-center" id="newsletter">
      <h2 className="text-2xl font-medium uppercase">
        Tilmeld dig vores nyhedsbrev <span>&#128077;</span>
      </h2>
      <p className="mb-5">
        Tilmeld dig for at modtage produktrabatter, produktnyheder og mere i din indbakke
      </p>
      <form className="flex justify-center" onSubmit={handleSubmit}>
        <label htmlFor="newsletterForm" className="screenreader">
          email
        </label>
        <input
          type="email"
          name="newsletterForm"
          id="newsletterForm"
          className={`w-full truncate bg-white py-3 pl-5 pr-1 rounded-sm border border-inputBorder sm:min-w-[185px] max-w-sm min-h-[46px]`}
          placeholder="E-mailadresse"
          defaultValue={session?.user.data.email}
        />
        <button
          type="submit"
          className={`bg-primaryColor uppercase py-3 px-5 rounded-sm text-sm font-semibold min-h-[46px] w-max`}>
          {subscribed ? "Tilmeldt" : "Tilmeld"}
          {subscribed ? <CheckIcon className="w-5 h-5 inline align-top -mr-1.5" /> : ""}
        </button>
      </form>
    </section>
  );
}

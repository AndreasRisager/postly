import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import CheckboxField from "../layout/CheckboxField";
import InputField from "../layout/InputField";
import SelectField from "../layout/SelectField";

export default function Information({ handleChange, state, nextStep, session }) {
  const [statusMessage, setStatusMessage] = useState("");
  const [acceptNewsletter, setAcceptNewsletter] = useState(false);
  const [saveInformation, setSaveInformation] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (state.email === "") {
      setStatusMessage("Udfyld Email Address");
      return;
    }
    var at = state.email.indexOf("@");
    var dot = state.email.lastIndexOf(".");
    if (at <= 0) {
      setStatusMessage("Skriv gyldig email");
      return;
    }
    if (dot < at + 2) {
      setStatusMessage("Skriv gyldig email");
      return;
    }
    if (state.email.length <= dot + 2) {
      setStatusMessage("Skriv gyldig email");
      return;
    }

    if (state.country === "") {
      setStatusMessage("Udfyld Land/område");
      return;
    }
    if (state.firstname === "") {
      setStatusMessage("Udfyld Fornavn");
      return;
    }
    if (state.lastname === "") {
      setStatusMessage("Udfyld Efternavn");
      return;
    }
    if (state.shipping_address1 === "") {
      setStatusMessage("Udfyld Addresse");
      return;
    }
    if (state.zip_code === "") {
      setStatusMessage("Udfyld Postnummer");
      return;
    }
    if (state.city === "") {
      setStatusMessage("Udfyld By");
      return;
    }
    if (state.phone === "") {
      setStatusMessage("Udfyld Telefonnummer");
      return;
    }
    if (state.phone.match(/[^0-9]/g)) {
      setStatusMessage("Udfyld Telefonnummer korrekt");
      return;
    }

    setStatusMessage("");

    let updateData = {};

    if (session && saveInformation) {
      if (
        state.country !== session.user.data.country ||
        state.firstname !== session.user.data.firstname ||
        state.lastname !== session.user.data.lastname ||
        state.address1 !== session.user.data.address1 ||
        state.address2 !== session.user.data.address2 ||
        state.zip !== session.user.data.zip ||
        state.city !== session.user.data.city ||
        state.city !== session.user.data.city ||
        state.phone !== session.user.data.phone
      ) {
        updateData = {
          ...updateData,
          country: state.country,
          firstname: state.firstname,
          lastname: state.lastname,
          address1: state.address1,
          address2: state.address2,
          zip: state.zip,
          city: state.city,
          phone: state.phone,
        };
      }
    }

    if (session && !saveInformation) {
      updateData = {
        ...updateData,
        country: "",
        firstname: "",
        lastname: "",
        address1: "",
        address2: "",
        zip: "",
        city: "",
        phone: "",
      };
    }

    if (acceptNewsletter) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscribers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: state.email, activated: true }),
      });
    }

    if (session && saveInformation && Object.keys(updateData).length > 0) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${session.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + session.jwt,
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const data = await response.json();
        setStatusMessage(data?.message);
        return;
      }
    }

    nextStep();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-1 justify-between items-center flex-wrap mb-4">
        <h2 className="text-xl font-medium text-black">Kontaktinformation</h2>
        {!session && (
          <p className="text-black text-md">
            Har du allerede en konto?{" "}
            <Link href="/auth/login?from=checkout">
              <a className="text-checkoutActiveColor">Log ind</a>
            </Link>
          </p>
        )}
      </div>

      {session ? (
        <div className="flex gap-4 py-2">
          <div className="h-12 w-12 shrink-0 rounded-xl bg-primaryColor text-white font-semibold text-xl flex items-center justify-center uppercase outline outline-2 outline-black">
            {session?.user?.data?.username[0]}
          </div>
          <p className="text-black truncate">
            {session?.user?.data?.username} ({session?.user?.data?.email})
            <br />
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/checkout" })}
              className="text-checkoutActiveColor font-normal">
              Log ud
            </button>
          </p>
        </div>
      ) : (
        <InputField type="email" id="email" value={state.email} onChange={handleChange}>
          Mail
        </InputField>
      )}
      <CheckboxField
        id="checkout-newsletter"
        defaultChecked={acceptNewsletter}
        onChange={(e) => setAcceptNewsletter(e.target.checked)}>
        Bliv V.I.P &amp; få adgang til kampagner før alle andre
      </CheckboxField>
      <h2 className="text-xl font-medium text-black mt-7 mb-4">Leveringsadresse</h2>
      <section className="grid grid-cols-2 gap-4">
        <SelectField
          name="country"
          id="country"
          label="Land/område"
          defaultValue={state.country}
          onChange={handleChange}>
          <option value="Danmark-DK">Danmark</option>
        </SelectField>
        <InputField
          type="text"
          id="firstname"
          style={{ gridColumn: "span 1" }}
          value={state.firstname}
          onChange={handleChange}>
          Fornavn
        </InputField>
        <InputField
          type="text"
          id="lastname"
          style={{ gridColumn: "span 1" }}
          value={state.lastname}
          onChange={handleChange}>
          Efternavn
        </InputField>
        <InputField type="text" id="address1" value={state.address1} onChange={handleChange}>
          Gade og husnummer
        </InputField>
        <InputField type="text" id="address2" value={state.address2} onChange={handleChange}>
          Lejlighed, etage osv. (valgfrit)
        </InputField>
        <InputField
          type="text"
          id="zip"
          style={{ gridColumn: "span 1" }}
          value={state.zip}
          onChange={handleChange}>
          Postnummer
        </InputField>
        <InputField
          type="text"
          id="city"
          style={{ gridColumn: "span 1" }}
          value={state.city}
          onChange={handleChange}>
          By
        </InputField>
        <InputField type="text" id="phone" value={state.phone} onChange={handleChange}>
          Telefon
        </InputField>
      </section>
      <CheckboxField
        id="save-information"
        defaultChecked={saveInformation}
        onChange={(e) => setSaveInformation(e.target.checked)}>
        Gem denne information for hurtigere udtjekning næste gang
      </CheckboxField>
      <p className="text-red-700 italic my-2 h-5">{statusMessage}</p>
      <div className="flex flex-wrap gap-y-4 items-center justify-between">
        <Link href="/cart">
          <a className="text-checkoutActiveColor font-normal">Tilbage til indkøbskurven</a>
        </Link>
        <button
          type="submit"
          className="bg-checkoutActiveColor text-black p-3.5 rounded-md font-normal">
          Fortsæt til levering
        </button>
      </div>
    </form>
  );
}

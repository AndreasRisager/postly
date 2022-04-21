import { useSession } from "next-auth/react";
import { useState } from "react";
import InputField from "../layout/InputField";
import { useRouter } from "next/router";
import SelectField from "../layout/SelectField";

export default function Address() {
  const { data: session } = useSession();
  const router = useRouter();

  const [statusMessage, setStatusMessage] = useState("");
  const [state, setState] = useState({
    country: session.user.data.country || "Danmark-DK",
    firstname: session.user.data.firstname || "",
    lastname: session.user.data.lastname || "",
    address1: session.user.data.address1 || "",
    address2: session.user.data.address2 || "",
    zip: session.user.data.zip || "",
    city: session.user.data.city || "",
    phone: session.user.data.phone || "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // VALIDATE FIELDS
    if (!state.country) {
      setStatusMessage("Udfyld Land/område");
      return;
    }
    if (!state.firstname) {
      setStatusMessage("Udfyld Fornavn");
      return;
    }
    if (!state.lastname) {
      setStatusMessage("Udfyld Efternavn");
      return;
    }
    if (!state.address1) {
      setStatusMessage("Udfyld Gade og husnummer");
      return;
    }
    if (!state.zip && state.phone.length < 4) {
      setStatusMessage("Udfyld Postnummer");
      return;
    }
    if (!state.city) {
      setStatusMessage("Udfyld By");
      return;
    }
    if (!state.phone && state.phone.length < 8) {
      setStatusMessage("Udfyld Telefon");
      return;
    }

    setStatusMessage("");

    // UPDATE USER
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${session.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + session.jwt,
        },
        body: JSON.stringify({
          country: state.country,
          firstname: state.firstname,
          lastname: state.lastname,
          address1: state.address1,
          address2: state.address2,
          zip: state.zip,
          city: state.city,
          phone: state.phone,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setStatusMessage(data?.message);
        return;
      }
      if (response.ok) {
        router.reload(window.location.pathname);
      }
    } catch (error) {
      setStatusMessage("Der opstod en fejl.");
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setState({ ...state, [name]: value });
  };

  return (
    <>
      <h1 className="text-2xl font-medium text-black">Leveringsadresse</h1>
      <h2 className="mb-3">Gem din leveringsadresse for hurtigere betaling</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <SelectField
          name="country"
          id="country"
          label="Land/område"
          value={state.country}
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
        <button
          type="submit"
          className="border border-inputBorder rounded-md text-black py-1 px-3 hover:bg-gray-100">
          Gem
        </button>
        {statusMessage && <p className="text-red-700 italic">{statusMessage}</p>}
      </form>
    </>
  );
}

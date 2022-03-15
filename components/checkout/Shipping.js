import { useState, useEffect } from "react";
import Review from "./Review";
import xml2js from "xml2js";
import RadioField from "../layout/RadioField";

export default function Shipping({
  nextStep,
  prevStep,
  state,
  setState,
  setStep,
  formatttedAddress,
}) {
  const [statusMessage, setStatusMessage] = useState("");
  const [shipping, setShipping] = useState([]);

  const country = state?.country?.split("-")?.[1];
  const street = `${state.address1} ${state.address2}`;

  useEffect(() => {
    async function getShipping() {
      const response = await fetch(
        `https://www.gls.dk/webservices_v4/wsShopFinder.asmx/GetParcelShopDropPoint?street=${street}&zipcode=${state.zip}&countryIso3166A2=${country}&Amount=5`
      );
      const data = await response.text();

      xml2js.parseString(data, (err, result) => {
        if (err) {
          throw err;
        }
        const pakkeshops = result.ParcelShopSearchResult.parcelshops[0].PakkeshopData;
        if (state.delivery_method === "") {
          const pakkeshopAddresse = `${pakkeshops[0].CompanyName[0]}, ${pakkeshops[0].Streetname[0]}, ${pakkeshops[0].ZipCode[0]} ${pakkeshops[0].CityName[0]}`;
          setState((prev) => ({
            ...prev,
            delivery_method: pakkeshopAddresse,
            delivery_price: 29.0,
          }));
        }
        setShipping(pakkeshops);
      });
    }
    getShipping();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (state.delivery_method === "") {
      setStatusMessage("Vælg en leveringsmetode");
      return;
    }
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Review state={state} setStep={setStep} formatttedAddress={formatttedAddress} />
      <h2 className="text-xl font-medium text-black mt-7 mb-4">Leveringsmetode</h2>
      <div className="mb-4">
        {shipping.map((shop) => {
          const address = `${shop.CompanyName[0]}, ${shop.Streetname[0]}, ${shop.ZipCode[0]} ${shop.CityName[0]}`;
          return (
            <RadioField
              key={shop?.Number[0]}
              name="delivery_method"
              id={shop?.Number[0]}
              value={address}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  delivery_method: e.target.value,
                  delivery_price: 29.0,
                }))
              }
              defaultChecked={state.delivery_method === address}>
              <div>GLS Pakkeshop - {address}</div>
              <div>29.00&nbsp;kr.</div>
            </RadioField>
          );
        })}
        <RadioField
          name="delivery_method"
          id="home_delivery"
          value={formatttedAddress}
          onChange={(e) =>
            setState((prev) => ({
              ...prev,
              delivery_method: e.target.value,
              delivery_price: 45.0,
            }))
          }
          defaultChecked={state.delivery_method === formatttedAddress}>
          <div>GLS Hjemmelevering</div>
          <div>45.00&nbsp;kr.</div>
        </RadioField>
      </div>
      <p className="text-red-700 italic my-2 h-6">{statusMessage}</p>
      <div className="flex flex-wrap gap-y-4 items-center justify-between">
        <button className="text-checkoutActiveColor" type="button" onClick={prevStep}>
          Tilbage til oplysninger
        </button>
        <button className="bg-checkoutActiveColor text-black p-3.5 rounded-md" type="submit">
          Fortsæt til betaling
        </button>
      </div>
    </form>
  );
}

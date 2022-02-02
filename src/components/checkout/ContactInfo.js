import RadioField from "../checkout/RadioField";
import CheckboxField from "../checkout/CheckboxField";
import InputField from "../checkout/InputField";
import { Link } from "@reach/router";

export default function ContactInfo({ checkout, setCheckout, nextStep }) {
  return (
    <form className="checkout__contactInfo" noValidate>
      <div className="checkout__section">
        <h2 className="checkout__title">Kontaktinformation</h2>
        <InputField
          type="email"
          id="email"
          value={checkout.email}
          onChange={(e) => {
            setCheckout((prev) => ({ ...prev, email: e.target.value }));
          }}>
          Mail
        </InputField>
        <CheckboxField id="newsletter" defaultChecked>
          Bliv V.I.P &amp; få adgang til kampagner før alle andre
        </CheckboxField>
      </div>
      <div className="checkout__section">
        <h2 className="checkout__title">Leveringsmetode</h2>
        <RadioField
          name="delivery_method"
          id="delivery_ship"
          defaultChecked
          value="ship"
          onClick={(e) => {
            console.log(e.target.value);
            setCheckout((prev) => ({
              ...prev,
              delivery_method: e.target.value,
            }));
          }}>
          <div>
            <i className="fas fa-truck" />
            Afsend
          </div>
        </RadioField>
        <RadioField
          name="delivery_method"
          id="delivery_pickup"
          value="pickup"
          onClick={(e) => {
            setCheckout((prev) => ({
              ...prev,
              delivery_method: e.target.value,
            }));
          }}>
          <div>
            <i className="fas fa-store" />
            Afhent
          </div>
        </RadioField>
      </div>
      <div className="checkout__section">
        <h2 className="checkout__title">Leveringsadresse</h2>
        <div className="checkout__fields">
          <InputField
            type="text"
            id="country"
            value={checkout.country}
            onChange={(e) => {
              setCheckout((prev) => ({ ...prev, country: e.target.value }));
            }}>
            Land/område
          </InputField>
          <InputField
            type="text"
            id="firstname"
            style={{ gridColumn: "span 1" }}
            value={checkout.firstname}
            onChange={(e) => {
              setCheckout((prev) => ({
                ...prev,
                firstname: e.target.value,
              }));
            }}>
            Fornavn
          </InputField>
          <InputField
            type="text"
            id="lastname"
            style={{ gridColumn: "span 1" }}
            value={checkout.lastname}
            onChange={(e) => {
              setCheckout((prev) => ({
                ...prev,
                lastname: e.target.value,
              }));
            }}>
            Efternavn
          </InputField>
          <InputField
            type="text"
            id="business"
            value={checkout.business}
            onChange={(e) => {
              setCheckout((prev) => ({
                ...prev,
                business: e.target.value,
              }));
            }}>
            Firma (valgfrit)
          </InputField>
          <InputField
            type="text"
            id="shipping_address1"
            value={checkout.shipping_address1}
            onChange={(e) => {
              setCheckout((prev) => ({
                ...prev,
                shipping_address1: e.target.value,
              }));
            }}>
            Gade og husnummer
          </InputField>
          <InputField
            type="text"
            id="shipping_address2"
            value={checkout.shipping_address2}
            onChange={(e) => {
              setCheckout((prev) => ({
                ...prev,
                shipping_address2: e.target.value,
              }));
            }}>
            Lejlighed, etage osv. (valgfrit)
          </InputField>
          <InputField
            type="text"
            id="zip_code"
            style={{ gridColumn: "span 1" }}
            value={checkout.zip_code}
            onChange={(e) => {
              setCheckout((prev) => ({
                ...prev,
                zip_code: e.target.value,
              }));
            }}>
            Postnummer
          </InputField>
          <InputField
            type="text"
            id="city"
            style={{ gridColumn: "span 1" }}
            value={checkout.city}
            onChange={(e) => {
              setCheckout((prev) => ({ ...prev, city: e.target.value }));
            }}>
            By
          </InputField>
          <InputField
            type="text"
            id="phone"
            value={checkout.phone}
            onChange={(e) => {
              setCheckout((prev) => ({ ...prev, phone: e.target.value }));
            }}>
            Telefon (du modtager en sms når din pakke sendes)
          </InputField>
        </div>
        <CheckboxField id="checkout_remember_me">
          Gem denne information for hurtigere udtjekning næste gang
        </CheckboxField>
      </div>
      <div className="checkout__stepButtons">
        <Link to="/cart" className="checkout__stepBack">
          Tilbage til indkøbskurven
        </Link>
        <button className="checkout__stepNext" onClick={nextStep}>
          Fortsæt til levering
        </button>
      </div>
    </form>
  );
}

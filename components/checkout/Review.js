export default function Review({ state, formatttedAddress, delivery, setStep }) {
  return (
    <div className="border border-inputBorder rounded-md mb-8 text-md">
      <div className="flex border-b border-inputBorder justify-between p-4">
        <p className="flex-[0_1_5em] text-checkoutTextColor">Kontakt</p>
        <p className="text-black flex-[1_1] px-4 break-all">{state.email}</p>
        <button
          className="cursor-pointer text-checkoutActiveColor text-sm"
          type="button"
          onClick={() => setStep(1)}>
          Skift
        </button>
      </div>
      <div className="flex border-b border-inputBorder justify-between p-4 last-of-type:border-none">
        <p className="flex-[0_1_5em] text-checkoutTextColor">Send til</p>
        <p className="text-black flex-[1_1] px-4">{formatttedAddress.trim()}</p>
        <button
          className="cursor-pointer text-checkoutActiveColor text-sm"
          type="button"
          onClick={() => setStep(1)}>
          Skift
        </button>
      </div>
      {delivery && (
        <div className="flex border-b border-inputBorder justify-between p-4 last-of-type:border-none">
          <p className="flex-[0_1_5em] text-checkoutTextColor">Metode</p>
          <p className="text-black flex-[1_1] px-4">
            {state.delivery_method} &bull; {state.delivery_price.toFixed(2)}&nbsp;kr.
          </p>
          <button
            className="cursor-pointer text-checkoutActiveColor text-sm"
            type="button"
            onClick={() => setStep(2)}>
            Skift
          </button>
        </div>
      )}
    </div>
  );
}

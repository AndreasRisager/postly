import { useCart } from "../../helpers/CartContext";
import DiscountField from "./DiscountField";

export default function Summary({ state, setState }) {
  const { totalPrice } = useCart();

  return (
    <aside className="sm:w-1/3">
      <DiscountField setState={setState} />
      <div className="my-4 text-checkoutTextColor">
        <p className="flex justify-between items-center gap-3 mb-4">
          <span>Subtotal</span>
          <span>{totalPrice.toFixed(2)}&nbsp;kr.</span>
        </p>
        {state.discount && (
          <p className="flex justify-between items-center gap-3 mb-4">
            <span>Rabatkode</span>
            <span>
              -{(totalPrice * parseFloat("0." + state.discount.percentage)).toFixed(2)}
              &nbsp;kr.
            </span>
          </p>
        )}
        <p className="flex justify-between items-center gap-3 mb-4">
          <span>Levering</span>
          {state.delivery_price ? (
            <span>{state.delivery_price.toFixed(2)}&nbsp;kr.</span>
          ) : (
            <span className="text-[0.8rem]">Beregnet ved næste trin</span>
          )}
        </p>
      </div>
      <div className="py-4 border-t border-inputBorder">
        <p className="flex justify-between items-center gap-3 mb-4">
          <span>I alt</span>
          <span className="state__summary-totalPrice">
            {(
              totalPrice +
              (state.delivery_price ? state.delivery_price : 0) -
              (state.discount ? totalPrice * parseFloat("0." + state.discount.percentage) : 0)
            ).toFixed(2)}
            &nbsp;kr.
          </span>
        </p>
      </div>
    </aside>
  );
}

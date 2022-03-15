import { ChevronRightIcon } from "@heroicons/react/solid";
import Link from "next/link";

export default function Breadcrumb({ step, setStep }) {
  return (
    <ol className="flex flex-wrap gap-1 items-center mb-5">
      <li className="whitespace-nowrap text-checkoutActiveColor text-[14px]">
        <Link href="/cart">Indkøbskurv</Link>
        <ChevronRightIcon
          className={`inline align-bottom w-[20px] h-[20px] text-checkoutTextColor`}
        />
      </li>
      <li
        className={`whitespace-nowrap text-[14px] ${
          step > 1 ? "text-checkoutActiveColor" : "text-black"
        }`}>
        <button onClick={() => (step > 1 ? setStep(1) : "")} type="button">
          Oplysninger
        </button>
        <ChevronRightIcon className="inline align-bottom w-[20px] h-[20px] text-checkoutTextColor" />
      </li>
      <li
        className={`whitespace-nowrap text-[14px] ${step > 2 ? "text-checkoutActiveColor" : ""} ${
          step === 2 ? "text-black" : "text-checkoutTextColor"
        }`}>
        <button onClick={() => (step > 2 ? setStep(2) : "")} type="button">
          Levering
        </button>
        <ChevronRightIcon className="inline align-bottom w-[20px] h-[20px] text-checkoutTextColor" />
      </li>
      <li
        className={`whitespace-nowrap text-[14px] ${
          step === 3 ? "text-black" : "text-checkoutTextColor"
        }`}>
        <button type="button">Betaling</button>
      </li>
    </ol>
  );
}

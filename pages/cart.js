import { useCart } from "../helpers/CartContext";
import Link from "next/link";
import Layout from "../components/layout/Layout";
import Image from "next/image";
import { getAnnouncement } from "../lib/getAnnouncement";
import Announcement from "../components/layout/Announcement";

export default function Cart({ announcement }) {
  const { cart, isCartEmpty, removeFromCart, totalPrice, updateItemQuantity } = useCart();

  return (
    <>
      <Announcement announcement={announcement} />
      <Layout title="Din indkøbskurv">
        {isCartEmpty ? (
          <div className="text-center my-40">
            <h1 className="text-2xl mb-4">Din indkøbskurv er tom!</h1>
            <Link href="/shop">
              <a className="bg-primaryColor rounded-md font-medium py-3 px-4">Gå til shop</a>
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-2xl my-8 lg:text-center">Din indkøbskurv</h1>
            <section className="text-textColor">
              <header className="hidden md:grid md:grid-cols-cart border-b border-grey py-6">
                <p className="px-2">Product</p>
                <p className="px-2">Pris</p>
                <p className="px-2 text-center">Antal</p>
                <p className="px-2 text-right">I alt</p>
              </header>
              {cart.map((item, i) => (
                <article
                  className="grid grid-cols-3 gap-y-8 sm:gap-y-4 md:grid-cols-cart items-center border-b border-grey py-4"
                  key={i + item.id}>
                  <div className="grid grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))] gap-4 col-span-3 md:col-span-1 sm:grid-cols-[120px_1fr]">
                    <Image
                      src={item.image?.url}
                      alt={item.title}
                      width={item.image?.width}
                      height={item.image?.height}
                      objectFit="contain"
                    />
                    <div className="md:mr-4">
                      <h3 className="text-lg font-normal text-black mb-1">
                        <Link href={`/product/${item.slug}`}>
                          <a className="inline-block hover:underline">{item.title}</a>
                        </Link>
                      </h3>
                      <p className="text-textColor pb-1 md:text-sm italic whitespace-pre-wrap">
                        {item.description}
                      </p>
                      <p className="text-textColor pb-1 md:text-sm italic whitespace-pre-wrap">
                        Størrelse: {item.sizes.name}, Ramme: {item.frames.name}.
                      </p>
                      {item.message && (
                        <p className="text-textColor pb-1 md:text-sm italic whitespace-pre-wrap break-all">
                          Besked: {item.message}
                        </p>
                      )}
                      <button
                        className="text-textColor border border-textColor py-1 px-2 uppercase font-semibold text-xs rounded-sm hover:bg-textColor hover:text-white"
                        onClick={() => removeFromCart(item)}
                        aria-label={"Fjern " + item.title}>
                        Fjern
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="mb-3 md:hidden">Pris</p>
                    <span className="break-all">{item.price.toFixed(2)}</span>&nbsp;kr
                  </div>
                  <div className="text-center px-2">
                    <p className="mb-3 md:hidden">Antal</p>
                    <label htmlFor="quantity" className="sr-only">
                      Antal
                    </label>
                    <input
                      className="text-center text-[16px] w-11 p-0 md:w-14 md:py-2 md:px-1 border border-inputBorder bg-white text-black max-w-full rounded-sm text-base"
                      id="quantity"
                      type="number"
                      defaultValue={item.quantity}
                      min="0"
                      pattern="[0-9]*"
                      onChange={(e) =>
                        e.target.value !== "" && updateItemQuantity(item, Number(e.target.value))
                      }
                    />
                  </div>
                  <div className="text-right">
                    <p className="mb-3 md:hidden">I alt</p>
                    <span className="break-all">{(item.price * item.quantity).toFixed(2)}</span>
                    &nbsp;kr
                  </div>
                </article>
              ))}
            </section>
            <section className="w-full sm:max-w-xs my-10 ml-auto">
              <p className="mb-8 text-md text-textColor">
                Levering og rabatkoder bliver beregnet ved kassen
              </p>
              <div className="flex flex-wrap justify-between items-center border-b border-black mb-3 pb-2">
                <p className="text-textColor">Subtotal</p>
                <p className="text-lg">{totalPrice.toFixed(2)}&nbsp;kr</p>
              </div>
              <div className="flex justify-between">
                <Link href="/shop">
                  <a className="border truncate border-black text-black uppercase w-full text-center text-md p-2">
                    Shop mere
                  </a>
                </Link>
                <Link href="/checkout">
                  <a className="bg-black truncate text-white uppercase w-full text-center text-md p-2">
                    Til kassen
                  </a>
                </Link>
              </div>
            </section>
          </>
        )}
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const announcement = await getAnnouncement();

  return { props: { announcement } };
}

import { useState } from "react";
import { getAnnouncement } from "../../lib/getAnnouncement";
import Layout from "../../components/layout/Layout";
import { useCart } from "../../helpers/CartContext";
import Announcement from "../../components/layout/Announcement";
import Image from "next/image";
import { getProductBySlug } from "../../lib/getProductBySlug";
import { getProductVariations } from "../../lib/getProductVariations";
import { getProducts } from "../../lib/getProducts";
import InputField from "../../components/layout/InputField";

function Product({ product, announcement, frames, sizes }) {
  const { addToCart } = useCart();
  const [statusMessage, setStatusMessage] = useState("");

  const [currentSize, setCurrentSize] = useState(null);
  const [currentFrame, setCurrentFrame] = useState(null);
  const [calendarName, setCalendarName] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (product.type === "plakat") {
      if (!currentSize && !currentFrame) return setStatusMessage("Vælg størrelse og ramme");
      if (!currentSize) return setStatusMessage("Vælg størrelse");
      if (!currentFrame) return setStatusMessage("Vælg ramme");
      setStatusMessage("");

      addToCart({ ...product, sizes: currentSize, frames: currentFrame, message });
    } else if (product.type === "kalender") {
      addToCart({ ...product, calendarName, message });
    } else {
      addToCart({ ...product, message });
    }
  }

  return (
    <>
      <Announcement announcement={announcement} />
      <Layout
        className="max-w-screen-xl mx-auto sm:p-8"
        title={`'${product.title}' Plakat`}
        description={product.description}
        image={product?.image?.url}>
        <section className="flex flex-col sm:flex-row gap-6 px-3 pb-8">
          <div className="sm:w-1/2 -mx-3 sm:mx-0">
            <Image
              src={product.image?.url}
              alt={product.title}
              width={product.image.width}
              height={product.image.height}
              layout="responsive"
              priority
            />
          </div>
          <div className="sm:w-1/2">
            <h2 className="text-2xl font-medium">{product.title}</h2>
            <p className="text-xl mb-3">
              {`${
                product.price +
                (currentSize ? currentSize.price : 0) +
                (currentFrame ? currentFrame.price : 0)
              }
              kr`}
            </p>
            <p className="mb-3">{product.description}</p>
            {product.type === "plakat" ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <h4 className="font-medium mb-1">
                    Vælg størrelse:
                    {`${currentSize && currentSize.price !== 0 ? "+ " + currentSize.price : ""}`}
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {sizes?.map((size, index) => {
                      if (!currentSize && index === 0) {
                        setCurrentSize(size);
                      }
                      return (
                        <label
                          key={size.id}
                          htmlFor={"size-" + size.name}
                          className={`text-center border border-productText text-productText ${
                            currentSize === size ? "outline outline-1 outline-blue-600" : ""
                          }`}>
                          <p className="truncate">{size.name}</p>
                          <input
                            type="radio"
                            name="size"
                            id={"size-" + size.name}
                            value={size.name}
                            checked={currentSize === size}
                            onChange={() => setCurrentSize(size)}
                            className="screenreader"
                          />
                        </label>
                      );
                    })}
                  </div>
                </div>
                <div className="mb-5">
                  <h4 className="font-medium mb-1">
                    Vælg ramme:
                    {`${currentFrame && currentFrame.price !== 0 ? "+ " + currentFrame.price : ""}`}
                  </h4>
                  <div className="grid grid-cols-4 gap-3">
                    {frames?.map((frame, index) => {
                      if (!currentFrame && index === 0) {
                        setCurrentFrame(frame);
                      }
                      return (
                        <label
                          key={frame.id}
                          htmlFor={frame.name + "-frame"}
                          className={`text-center border border-productText text-productText ${
                            currentFrame === frame ? "outline outline-1 outline-blue-600" : ""
                          }`}>
                          <p className="truncate border-b border-productText">{frame.name}</p>
                          <div className="pointer-events-none">
                            <Image
                              src={frame.image?.url}
                              alt={frame.name + " ramme"}
                              width={frame.image.width}
                              height={frame.image.height}
                              layout="responsive"
                            />
                          </div>
                          <input
                            type="radio"
                            name="frame"
                            id={frame.name + "-frame"}
                            value={frame.name}
                            checked={currentFrame === frame}
                            onChange={() => setCurrentFrame(frame)}
                            className="screenreader"
                          />
                        </label>
                      );
                    })}
                  </div>
                </div>
                <div className="mb-10 sm:mb-5">
                  <label htmlFor="message">
                    <h4>Besked og særlige ønsker:</h4>
                  </label>
                  <textarea
                    id="message"
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border border-productText rounded-sm p-1 text-black text-[16px] min-h-[80px]"></textarea>
                </div>
                <button
                  className="text-white bg-primaryColor font-medium py-3 w-full uppercase rounded"
                  type="submit">
                  tilføj til kurv
                </button>
                {statusMessage && <p className="text-red-500">*{statusMessage}*</p>}
              </form>
            ) : product.type === "kalender" ? (
              <form onSubmit={handleSubmit}>
                <div className="my-10 sm:mb-5">
                  <InputField
                    type="text"
                    style={{ borderColor: "#6e6e6e" }}
                    id="calendarName"
                    value={calendarName}
                    onChange={(e) => setCalendarName(e.target.value)}>
                    Kalender navn
                  </InputField>
                </div>
                <div className="mb-10 sm:mb-5">
                  <label htmlFor="message">
                    <h4>Besked og særlige ønsker:</h4>
                  </label>
                  <textarea
                    id="message"
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border border-productText rounded-sm p-1 text-black text-[16px] min-h-[80px]"></textarea>
                </div>
                <button
                  className="text-white bg-primaryColor font-medium py-3 w-full uppercase rounded"
                  type="submit">
                  tilføj til kurv
                </button>
                {statusMessage && <p className="text-red-500">*{statusMessage}*</p>}
              </form>
            ) : null}
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const products = await getProducts();
  const paths = products.map((product) => {
    return {
      params: { slug: `${product.slug}` },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const announcement = await getAnnouncement();
  const product = await getProductBySlug(params.slug);
  const { frames, sizes } = await getProductVariations();

  return { props: { product, announcement, frames, sizes }, revalidate: 60 };
}

export default Product;

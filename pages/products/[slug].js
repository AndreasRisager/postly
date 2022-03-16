import { useState } from "react";
import { getAnnouncement } from "../../lib/getAnnouncement";
import Layout from "../../components/layout/Layout";
import { useCart } from "../../helpers/CartContext";
import Announcement from "../../components/layout/Announcement";
import Image from "next/image";
import Head from "next/head";
import { getProductBySlug } from "../../lib/getProductBySlug";
import { getProductVariations } from "../../lib/getProductVariations";

function Product({ product, announcement, frames, sizes }) {
  const { addToCart } = useCart();
  const [statusMessage, setStatusMessage] = useState("");

  const [currentSize, setCurrentSize] = useState(null);
  const [currentFrame, setCurrentFrame] = useState(null);
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!currentSize && !currentFrame) return setStatusMessage("Vælg størrelse og ramme");
    if (!currentSize) return setStatusMessage("Vælg størrelse");
    if (!currentFrame) return setStatusMessage("Vælg ramme");
    setStatusMessage("");

    addToCart({ ...product, sizes: currentSize, frames: currentFrame, message });
  }

  return (
    <>
      <Head>
        <title>{`'${product.title}' Plakat - Postly`}</title>
        <meta name="description" content={product.description} />
        <link rel="canonical" href={`https://postly.netlify.app/${product.slug}`} />

        <meta property="og:url" content={`https://postly.netlify.app/${product.slug}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`'${product.title}' Plakat - Postly`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image.url} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="postly.netlify.app" />
        <meta property="twitter:url" content={`https://postly.netlify.app/${product.slug}`} />
        <meta name="twitter:title" content={`'${product.title}' Plakat - Postly`} />
        <meta name="twitter:description" content={product.description} />
        <meta name="twitter:image" content={product.image.url} />
      </Head>
      <Announcement announcement={announcement} />
      <Layout className="max-w-screen-xl mx-auto sm:p-8">
        <section className="flex flex-col sm:flex-row gap-6 px-3">
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
                  className="w-full border border-productText rounded-sm p-1 text-black min-h-[80px]"></textarea>
              </div>
              <div className="fixed bottom-0 right-0 left-0 shadow-[0_-4px_8px_#33333330] bg-white p-4 sm:static sm:shadow-none sm:p-0">
                <button
                  className="text-white bg-primaryColor font-medium py-3 w-full uppercase rounded"
                  type="submit">
                  tilføj til kurv
                </button>
              </div>
              {statusMessage && <p className="text-red-500">*{statusMessage}*</p>}
            </form>
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  const data = await res.json();

  const paths = data.map((product) => ({
    params: { slug: `${product.slug}` },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const announcement = await getAnnouncement();
  const product = await getProductBySlug(params.slug);
  const { frames, sizes } = await getProductVariations();

  return { props: { product, announcement, frames, sizes }, revalidate: 60 };
}

export default Product;

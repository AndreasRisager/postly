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
import Link from "next/link";

function Product({ product, announcement, frames, sizes }) {
  const { addToCart } = useCart();
  const [errors, setErrors] = useState([]);
  const [productVariant, setProductVariant] = useState({});
  const [addedToCart, setAddedToCart] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setErrors([]);

    if (product.type === "plakat") {
      // make sure that the user has selected frame and size
      if (productVariant.frame === undefined || productVariant.size === undefined) {
        setErrors((prev) => [...prev, "Du skal vælge en ramme og en størrelse"]);
        return;
      }

      // put frame and size
      const frame = findVariation(frames, "id", productVariant.frame);
      const size = findVariation(sizes, "id", productVariant.size);

      addToCart({
        ...product,
        productVariant: {
          ...productVariant,
          frame: { id: frame.id, name: frame.name, title: "ramme", price: frame.price },
          size: { id: size.id, name: size.name, title: "størrelse", price: size.price },
        },
      });
    } else {
      addToCart({ ...product, productVariant });
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductVariant({ ...productVariant, [name]: value });
  };

  const findVariation = (variations, name, value) => {
    return variations.find((variation) => variation[name] === value);
  };

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
              src={product?.image?.url}
              alt={product.title}
              width={product?.image?.width}
              height={product?.image?.height}
              layout="responsive"
              priority
            />
          </div>
          <div className="sm:w-1/2">
            <h2 className="text-2xl font-medium">{product.title}</h2>
            <p className="text-xl mb-3">
              {`${
                product.price +
                (productVariant.size ? findVariation(sizes, "id", productVariant.size).price : 0) +
                (productVariant.frame ? findVariation(frames, "id", productVariant.frame).price : 0)
              }
              kr`}
            </p>
            <p className="mb-3 whitespace-pre-wrap">{product.description}</p>
            <form onSubmit={handleSubmit} noValidate>
              {product.type === "plakat" && (
                <>
                  <div className="mb-5">
                    <h4 className="font-medium mb-1">
                      Vælg størrelse:
                      {productVariant.size &&
                        " + " + findVariation(sizes, "id", productVariant.size)?.price}
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      {sizes?.map((size, index) => {
                        if (productVariant.size === undefined && index === 0) {
                          setProductVariant((prev) => ({ ...prev, size: size.id }));
                        }
                        return (
                          <label
                            key={size.id}
                            htmlFor={"size-" + size.name}
                            className={`text-center border border-productText text-productText ${
                              productVariant.size === size.id
                                ? "outline outline-1 outline-blue-600"
                                : ""
                            }`}>
                            <p className="truncate">{size.name}</p>
                            <input
                              type="radio"
                              name="size"
                              id={"size-" + size.name}
                              value={productVariant[size] || size.id}
                              checked={productVariant[size] === size.id}
                              onChange={handleChange}
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
                      {productVariant.frame &&
                        " + " + findVariation(frames, "id", productVariant.frame)?.price}
                    </h4>
                    <div className="grid grid-cols-4 gap-3">
                      {frames?.map((frame, index) => {
                        if (productVariant.frame === undefined && index === 0) {
                          setProductVariant((prev) => ({ ...prev, frame: frame.id }));
                        }
                        return (
                          <label
                            key={frame.id}
                            htmlFor={frame.name + "-frame"}
                            className={`text-center border border-productText text-productText ${
                              productVariant.frame === frame.id
                                ? "outline outline-1 outline-blue-600"
                                : ""
                            }`}>
                            <p className="truncate border-b border-productText">{frame.name}</p>
                            <div className="pointer-events-none relative aspect-square">
                              <Image
                                src={frame?.image?.url}
                                alt={frame.name + " ramme"}
                                layout="fill"
                                objectFit="cover"
                              />
                            </div>
                            <input
                              type="radio"
                              name="frame"
                              id={frame.name + "-frame"}
                              value={productVariant[frame] || frame.id}
                              checked={productVariant[frame] === frame.id}
                              onChange={handleChange}
                              className="sr-only"
                            />
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
              {product.input.length > 0 &&
                product.input.map((input) => {
                  if (input.type === "textarea") {
                    return (
                      <div className="mb-5" key={input.id}>
                        <label htmlFor={input.name}>
                          <h4>{input.name}</h4>
                        </label>
                        <textarea
                          id={input.name.toLowerCase()}
                          name={input.name.toLowerCase()}
                          value={productVariant[input.name.toLowerCase()] || ""}
                          onChange={handleChange}
                          className="w-full border border-productText rounded-sm p-1 text-black text-[16px] min-h-[80px] focus-visible:outline-[#1f51bd]"
                        />
                      </div>
                    );
                  }
                  return (
                    <div className="mb-5" key={input.id}>
                      <InputField
                        type="text"
                        placeholder={input.placeholder}
                        id={input.name.toLowerCase()}
                        value={productVariant[input.name.toLowerCase()] || ""}
                        onChange={handleChange}
                        className="border-[#6e6e6e] rounded-sm"
                        blue>
                        {input.name}
                      </InputField>
                    </div>
                  );
                })}
              {errors.length > 0 &&
                errors.map((error, index) => (
                  <p className="text-red-500" key={error + index}>
                    *{error}*
                  </p>
                ))}
              <button
                className="text-white bg-primaryColor font-medium py-3 w-full uppercase rounded"
                type="submit"
                onClick={() => setAddedToCart(true)}>
                {addedToCart ? "Tilføjet til kurv" : "tilføj til kurv"}
              </button>
            </form>
            <div
              className={`flex justify-between mt-3 transition-all duration-300 ease-out ${
                addedToCart ? "scale-x-100" : "scale-x-0"
              }`}>
              <Link href="/shop">
                <a className="border truncate border-black text-black uppercase w-full text-center text-md p-2">
                  Fortsæt indkøb
                </a>
              </Link>
              <Link href="/cart">
                <a className="bg-black truncate text-white uppercase w-full text-center text-md p-2">
                  Til indkøbskurv
                </a>
              </Link>
            </div>
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
  const { frames = {}, sizes = {} } = product.type === "plakat" && (await getProductVariations());

  return { props: { product, announcement, frames, sizes }, revalidate: 60 };
}

export default Product;

import Link from "next/link";
import Image from "next/image";

export default function Product({ product, listView }) {
  return (
    <article className="text-center max-w-md">
      <Link href={`/products/${product.slug}`}>
        <a>
          <Image
            src={product.image.url}
            alt={product.title}
            width={product.image.width}
            height={product.image.height}
            layout="responsive"
          />
        </a>
      </Link>
      <div>
        <p className="truncate px-4 text-black">{product.title}</p>
        <p className="text-black">{product.price.toFixed(2)}&nbsp;kr</p>
        {listView && <p className="truncate text-black">{product.description}</p>}
        <Link href={`/products/${product.slug}`}>
          <a className="bg-primaryColor p-2 uppercase text-white block truncate">vis produkt</a>
        </Link>
      </div>
    </article>
  );
}

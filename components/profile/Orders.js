import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Orders() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + session.jwt,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    };
    getOrders();
  }, [session.jwt]);

  return (
    <>
      <h1 className="text-2xl font-medium text-black mb-3">Mine Ordrer</h1>
      {orders.length === 0 && <p>Du har endnu ikke placeret en ordre.</p>}
      <ul className="flex flex-col gap-4">
        {orders?.map((order) => {
          return (
            <li key={order.id} className={`shadow p-3 rounded-lg text-gray-500`}>
              <div className="flex flex-wrap-reverse justify-between mb-3">
                <h4 className="font-bold text-black">Ordre ID: {order.id}</h4>
                <p>{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              {/* <div className="flex flex-wrap justify-between mb-2">
              <p>
                Tracking nummer:{" "}
                <a
                  href="https://gls-group.eu/DK/da/find-pakke"
                  className="font-semibold text-black">
                  IW438933
                </a>
              </p>
            </div> */}
              <div className="flex flex-wrap justify-between">
                <p>
                  Antal:{" "}
                  <span className="font-semibold text-black">
                    {order.products.reduce((acc, curVal) => acc + curVal.quantity, 0)}
                  </span>
                </p>
                <p>
                  Beløb:{" "}
                  <span className="font-semibold text-black">
                    {order.total}
                    &nbsp;kr
                  </span>
                </p>
              </div>
              {order.products.map((product, index) => {
                return (
                  <div key={product.id + index} className="grid grid-cols-[100px_1fr] mt-3">
                    <div className="rounded overflow-hidden">
                      <Image
                        src={product.image.url}
                        width={product.image.width}
                        height={product.image.height}
                        alt={product.title}
                      />
                    </div>
                    <div className="ml-2">
                      <h3 className="text-xl leading-none mb-2">
                        {product.title}{" "}
                        {product.quantity !== 1 && (
                          <span className="text-sm align-top">x{product.quantity}</span>
                        )}
                      </h3>
                      <p className="line-clamp-2">{product.description}</p>
                      <p className="mt-1">
                        {Object.keys(product.productVariant).map((variant, i) => {
                          return (
                            <span key={variant + i}>
                              {`${product.productVariant[variant].title || variant}: ${
                                product.productVariant[variant].name ||
                                product.productVariant[variant]
                              }${Object.keys(product.productVariant).length === i + 1 ? "" : ", "}`}
                            </span>
                          );
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </li>
          );
        })}
      </ul>
    </>
  );
}

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Orders() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + session.jwt,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders.reverse());
      }
    };
    getOrders();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-medium text-black mb-3">Mine Ordrer</h1>
      {orders.length === 0 && <p>Du har ikke nogle ordrer</p>}
      {orders?.map((order) => {
        if (order.paid === false) {
          return null;
        }
        return (
          <div key={order.id} className={`shadow p-3 rounded-lg text-gray-500 mb-4`}>
            <div className="flex flex-wrap-reverse justify-between mb-3">
              <h4 className="font-bold text-black">Ordre ID: {order.id}</h4>
              <p>{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex flex-wrap justify-between mb-2">
              <p>
                Tracking nummer:{" "}
                <a
                  href="https://gls-group.eu/DK/da/find-pakke"
                  className="font-semibold text-black">
                  IW438933
                </a>
              </p>
              {order.shipped ? (
                <p className="text-green-600 font-medium">Afsendt</p>
              ) : (
                <p className="text-red-600 font-medium">Ikke afsendt</p>
              )}
            </div>
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
                  {order.products.reduce((acc, curVal) => acc + curVal.price * curVal.quantity, 0)}
                  &nbsp;kr
                </span>
              </p>
            </div>
            {order.products.map((product) => {
              return (
                <div key={product.id} className="grid grid-cols-[100px_1fr] mt-3">
                  <div className="rounded overflow-hidden">
                    <img src={product.image.url} alt="" />
                  </div>
                  <div className="ml-2">
                    <h3 className="text-xl">
                      {product.title}{" "}
                      {product.quantity !== 1 && (
                        <span className="text-sm align-top">x{product.quantity}</span>
                      )}
                    </h3>
                    <p>{product.description} </p>
                    <p>
                      Størrelse: {product.sizes.name}, Ramme: {product.frames.name}
                    </p>
                    <p>Besked: {product.message}</p>
                  </div>
                  <div></div>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

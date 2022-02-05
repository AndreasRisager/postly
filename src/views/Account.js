import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "@reach/router";
import { useAuth } from "../helpers/AuthContext";

const useOrders = (user, token) => {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    const getOrders = async () => {
      if (user) {
        try {
          setLoadingOrders(true);
          const { data } = await axios.get(`https://postly-dk.herokuapp.com/orders`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setOrders(data);
        } catch (error) {
          setOrders([]);
        }
        setLoadingOrders(false);
      }
    };
    getOrders();
  }, [user, token]);

  return { orders, loadingOrders };
};

export default function Account() {
  const { user, token } = useAuth();
  const { orders, loadingOrders } = useOrders(user, token);
  console.log("Account orders", orders);

  if (!user) {
    return (
      <div>
        <p>Please log ind eller tilmeld dig</p>
        <Link to="/">Gå tilbage</Link>
      </div>
    );
  }
  return (
    <main>
      <h1>Account side</h1>
      <p>Logged ind som: {user.email}</p>
      <h2>Dine ordre:</h2>
      {loadingOrders && <p>indlæser dine ordrer...</p>}
      {orders.map((order) => (
        <div key={order.id}>
          {new Date(order.createdAt).toLocaleDateString()}
          {order.products.map((product) => (
            <p key={product.id}>{product.title}</p>
          ))}
          I alt {order.total}kr - {order.status}
        </div>
      ))}
      <hr />
    </main>
  );
}

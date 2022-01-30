import axios from "axios";
import { useEffect, useState } from "react";

const useOrder = (session_id) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const { data } = await axios.post(`http://localhost:1337/orders/confirm`, {
          checkout_session: session_id,
        });
        setOrder(data);
      } catch (error) {
        setOrder(null);
      }
      setLoading(false);
    };
    fetchOrder();
  }, [session_id]);
  return { order, loading };
};

export default function Success({ location }) {
  const session_id = new URLSearchParams(location.search).get("session_id");
  const { order, loading } = useOrder(session_id);
  return (
    <div>
      <h2>Tak for dit køb!</h2>
      {loading && <p>Loading...</p>}
      {order && <p>Din ordre er bekræftet, med ordrenummer: {order.id}</p>}
    </div>
  );
}

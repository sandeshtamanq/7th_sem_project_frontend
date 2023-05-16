import React, { useEffect, useState } from "react";
import { getOrder } from "../../../api/order/getOrder";

const ClientOrder = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const fetchOrder = async () => {
    setLoading(true);
    const response = await getOrder();
    if (response.status === 200) {
      setLoading(false);
      setOrders(response?.data);
    }
  };
  console.log(orders);

  useEffect(() => {
    fetchOrder();
  }, []);
  return (
    <>
      {loading && <div>fetching...</div>}
      {orders.map((order) => {
        return <div></div>;
      })}
    </>
  );
};

export default ClientOrder;

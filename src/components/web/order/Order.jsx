import React, { useEffect, useState } from "react";
import { getOrder } from "../../../api/order/getOrder";
import Table from "../../admin/static/Table";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    fetchOrder();
  }, []);

  const tableHeaders = ["id", "Payment", "Payment Type", "Product", "Total", "Delivery Status"];

  return (
    <>
      {loading ? (
        <div>fetching...</div>
      ) : (
        <Table headerData={tableHeaders}>
          {orders.map(({ payment, paymentMode, products, totalSum, deliveryStatus }, index) => (
            <tr className="bg-gray-200 text-black" key={index}>
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">{payment ? "Done" : "Pending"}</td>
              <td className="px-6 py-4">{paymentMode}</td>
              <td>
                {products.map((product, index) => {
                  return <Link to={`/product/${product.id}`}>{`${product.productName} ${!(products.length === index + 1) ? ", " : ""}`}</Link>;
                })}
              </td>
              <td className="px-6 py-4">Rs.{totalSum}</td>
              <td className="px-6 py-4">{deliveryStatus}</td>
            </tr>
          ))}
          {orders.length <= 0 && <div className=" p-4 text-black">No any order</div>}
        </Table>
      )}
    </>
  );
};

export default ClientOrder;

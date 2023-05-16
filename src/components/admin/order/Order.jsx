import React, { useEffect, useState } from "react";
import Table from "../static/Table";
import TableSkeleton from "../../skeletons/TableSkeleton";
import { getRecentOrder } from "../../../api/order/getRecentOrder";

const Order = () => {
  const [recentOrder, setRecentOrder] = useState([]);
  const [fetching, setFetching] = useState(false);
  const fetchRecentOrder = async () => {
    setFetching(true);
    const response = await getRecentOrder();
    if (response.status === 200) {
      setFetching(false);
      setRecentOrder(response?.data);
    }
  };
  console.log(recentOrder);

  useEffect(() => {
    fetchRecentOrder();
  }, []);
  const tableHeaders = ["id", "Name", "email", "Contact Number", "Payment", "Payment Mode", "Products", "Total Price"];
  return (
    <>
      <div>
        {!fetching ? (
          <Table headerData={tableHeaders}>
            {recentOrder.map(({ user: { firstName, lastName, email, contactNumber }, payment, paymentMode, products, totalSum }, index) => (
              <tr className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"} key={index}>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{`${firstName} ${lastName}`}</td>
                <td className="px-6 py-4">{email}</td>
                <td className="px-6 py-4">{contactNumber}</td>
                <td className="px-6 py-4">{payment ? "Done" : "Pending"}</td>
                <td className="px-6 py-4">{paymentMode}</td>
                <td>
                  {products.map((product) => {
                    return <p>{product.productName}</p>;
                  })}
                </td>
                <td className="px-6 py-4">Rs.{totalSum}</td>
              </tr>
            ))}
            {recentOrder.length <= 0 && <div className=" p-4 text-black">No any order</div>}
          </Table>
        ) : (
          <TableSkeleton />
        )}
      </div>
    </>
  );
};

export default Order;

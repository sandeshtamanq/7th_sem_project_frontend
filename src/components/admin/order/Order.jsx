import React, { useEffect, useState } from "react";
import Table from "../static/Table";
import TableSkeleton from "../../skeletons/TableSkeleton";
import { getRecentOrder } from "../../../api/order/getRecentOrder";
import OrderRow from "./OrderRow";

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

  useEffect(() => {
    fetchRecentOrder();
  }, []);
  const tableHeaders = [
    "id",
    "Name",
    "email",
    "Contact Number",
    "Payment",
    "Payment Mode",
    "Products",
    "Total Price",
    "Delivery Status",
  ];
  return (
    <>
      <div>
        {!fetching ? (
          <Table headerData={tableHeaders}>
            {recentOrder.map((order, index) => (
              <OrderRow
                {...order}
                fetchRecentOrder={fetchRecentOrder}
                index={index}
                key={index}
              />
            ))}
            {recentOrder.length <= 0 && (
              <div className=" p-4 text-black">No any order</div>
            )}
          </Table>
        ) : (
          <TableSkeleton />
        )}
      </div>
    </>
  );
};

export default Order;

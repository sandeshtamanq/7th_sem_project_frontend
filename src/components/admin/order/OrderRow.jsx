import React from "react";
import api from "../../../api/api";

const OrderRow = ({ user: { firstName, lastName, email, contactNumber }, payment, paymentMode, products, totalSum, deliveryStatus, index, id }) => {
  const updateStatus = async (value) => {
    try {
      const response = await api.patch(`/order/delivery-status/${id}`, {
        status: value,
      });
      return response;
    } catch (err) {
      return err.response;
    }
  };
  const changeHandler = async (e) => {
    const response = await updateStatus(e.target.value);
    if (response.status === 200) {
      console.log("done");
    }
  };
  return (
    <>
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
        <td className="px-6 py-4">
          <select value={deliveryStatus} onChange={changeHandler} className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"} name="cars" id="cars">
            <option value="pending">pending</option>
            <option value="delivered">delivered</option>
          </select>
        </td>
      </tr>
    </>
  );
};

export default OrderRow;

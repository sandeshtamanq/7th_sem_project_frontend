import React, { useState } from "react";
import { errorToast } from "../../../common/toastify";

const CartListCard = ({ amount, productImage, productName, brandName, productPrice, productAmount, setHasChanged }) => {
  const [totalAmount, setTotalAmount] = useState(amount);
  return (
    <>
      <div className="flex items-center gap-x-4 justify-between">
        <div className="">
          <img src={productImage} className="h-40 w-40 object-cover" alt="" />
        </div>
        <div className="flex-2 flex flex-col justify-between h-full">
          <h5>Product Name: {productName}</h5>
          <div>
            Brand:
            {brandName.brandName}
          </div>
        </div>
        <div className="flex-2">
          <h5 className="flex items-center gap-x-2">
            <div>Amount:</div>
            <div className="flex items-center gapx-x-3">
              {/* <div
                className="cursor-pointer"
                onClick={() => {
                  if (totalAmount < 1) {
                    errorToast("product must be more than 1");
                    return;
                  }
                  setTotalAmount((preval) => preval - 1);
                  setHasChanged(true);
                }}
              >
                -
              </div> */}
              <div className="border rounded-md py-0.5 px-3"> {totalAmount}</div>
              {/* <div
                className="cursor-pointer"
                onClick={() => {
                  if (totalAmount === productAmount) {
                    errorToast("cannot selete more than this");
                    return;
                  }
                  setTotalAmount((preval) => preval + 1);
                  setHasChanged(true);
                }}
              >
                +
              </div> */}
            </div>
          </h5>
          <div>Rs. {amount * productPrice}</div>
        </div>
      </div>
    </>
  );
};

export default CartListCard;

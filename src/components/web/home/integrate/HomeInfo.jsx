import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { MdPayment } from "react-icons/md";
import { GiReturnArrow } from "react-icons/gi";
const HomeInfo = () => {
  return (
    <div className="flex items-center justify-between px-10 py-8 bg-secondary text-white my-5">
      <div className="flex flex-col items-center">
        <TbTruckDelivery className="h-20 w-20" />
        <p>Fast Delivery </p>
      </div>
      <div className="flex flex-col items-center">
        <BiSupport className="h-20 w-20" />
        <p>24/7 Support</p>
      </div>
      <div className="flex flex-col items-center">
        <MdPayment className="h-20 w-20" />
        <p>Secure Payment</p>
      </div>
    </div>
  );
};

export default HomeInfo;

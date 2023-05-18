import React, { useEffect } from "react";
import HomeInfo from "./integrate/HomeInfo";
import ProductsContainer from "./integrate/ProductsContainer";
import { Link } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { MdPayment } from "react-icons/md";

const Home = () => {
  return (
    <div>
      <div className="h-[30rem] flex items-center justify-between">
        <div className=" text-center flex-1">
          <h1 className="text-5xl">Get Your Phones now</h1>
          <Link to="/products">
            <h5 className="mt-14 bg-secondary p-3 rounded-md inline-block cursor-pointer text-white">
              {/* <Link to="/products">Shop Now</Link> */}
              Shop Now
            </h5>
          </Link>
        </div>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/mobile-shop-7540e.appspot.com/o/hero-image%2F360_F_356062608_ViODs89KITc2uAwtPKh5iA12rGetiR13.jpg?alt=media&token=cbd0a00c-bf99-47be-9e07-3831a8c6eab1"
          alt=""
        />
      </div>
      {/* <HomeInfo /> */}
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
      <div className="w-[90%] m-auto">
        <ProductsContainer view="home" limit={8} />
        <div className="mt-5 px-3 py-2 flex items-center justify-center">
          <Link to="/products" className="text-center  m-auto mt-5 px-3 py-2 bg-secondary rounded-md  text-white">
            View More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

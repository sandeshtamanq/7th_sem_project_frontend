import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({id, productImage, productName, brandName, productPrice, productAmount }) => {
  return (
    <>
    <Link to={`/product/${id}`}>
    <div className="shadow-lg p-5 hover:shadow-xl transition-all duraiton-500 cursor-pointer rounded-md">
      <div>
        <img src={productImage} alt="" className="h-[13rem] m-auto object-cover w-[13rem]" />
      </div>
      <div>
        <h5>{productName}</h5>
        <p className="text-sm text-primary">{brandName?.brandName}</p>
        <p className="text-red-500">Rs.{productPrice}</p>
        {/* <button className="bg-secondary p-2 text-xs rounded-md w-full text-white">Add to cart</button> */}
      </div>
    </div>
    </Link>
    </>
  );
};

export default ProductCard;

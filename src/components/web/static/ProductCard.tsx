import React from "react";

const ProductCard = ({ productImage, productName, brandName, productPrice, productAmount }) => {
  return (
    <div className="shadow-lg p-5 hover:shadow-xl transition-all duraiton-500 cursor-pointer rounded-md">
      <div>
        <img src={productImage} alt="" className="h-[13rem] object-cover w-[13rem]" />
      </div>
      <div>
        <h5>{productName}</h5>
        <p className="text-sm text-primary">{brandName?.brandName}</p>
        <p className="text-red-500">Rs.{productPrice}</p>
        <button className="bg-secondary p-2 text-xs rounded-md w-full text-white">Add to cart</button>
      </div>
    </div>
  );
};

export default ProductCard;

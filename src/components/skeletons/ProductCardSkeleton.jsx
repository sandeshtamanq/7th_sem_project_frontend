import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="shadow-lg p-5 animate-pulse border-gray-300 border  transition-all duraiton-500 cursor-pointer rounded-md">
      <div>
        <div className="h-[13rem] bg-gray-300 rounded-md w-[13rem]"></div>
      </div>
      <div>
        <h5 className="h-[1rem] bg-gray-300 animate-pulse rounded-md mt-1 w-[60%]"></h5>
        <p className="h-[1rem] bg-gray-300 animate-pulse rounded-md mt-1 w-[40%]"></p>
        <p className="h-[1rem] bg-gray-300 animate-pulse rounded-md mt-1 w-[30%]"></p>
        <button className="bg-secondary mt-4 px-2 text-xs rounded-md w-full text-white py-4"></button>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;

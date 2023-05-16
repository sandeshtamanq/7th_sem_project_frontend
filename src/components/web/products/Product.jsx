import React, { useState } from "react";
import ProductsContainer from "../home/integrate/ProductsContainer";
import FilterBar from "./integrate/FilterBar";

const ProductPage = () => {
  return (
    <div className="w-[90%] m-auto">
      <div className="">
        <FilterBar />
      </div>
      <div className="flex-2">
        <ProductsContainer view="product" limit={12} />
      </div>
    </div>
  );
};

export default ProductPage;

import React, { useState } from "react";
import ProductsContainer from "../home/integrate/ProductsContainer";
import FilterBar from "./integrate/FilterBar";

const ProductPage = () => {
  return (
    <div className="w-[60%] m-auto">
      <div className="">
        <FilterBar />
      </div>
      <div className="flex-2">
        <ProductsContainer></ProductsContainer>
      </div>
    </div>
  );
};

export default ProductPage;

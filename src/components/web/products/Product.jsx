import React from "react";
import ProductsContainer from "../home/integrate/ProductsContainer";
import FilterBar from "./integrate/FilterBar";

const ProductPage = () => {
  return (
    <div className="flex justify-between">
      <div className="flex-1">
        <FilterBar />
      </div>
      <div className="flex-2">
        <ProductsContainer></ProductsContainer>
      </div>
    </div>
  );
};

export default ProductPage;

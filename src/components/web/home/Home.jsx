import React from "react";
import ProductCardSkeleton from "../../skeletons/ProductCardSkeleton";
import HomeInfo from "./integrate/HomeInfo";
import ProductsContainer from "./integrate/ProductsContainer";

const Home = () => {
  return (
    <div>
      <div className="h-[30rem]">Something goes here</div>
      <HomeInfo />
      <ProductsContainer />
    </div>
  );
};

export default Home;

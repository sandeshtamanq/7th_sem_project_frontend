import React, { useEffect, useState } from "react";
import ProductCard from "../../static/ProductCard";
import { getProducts } from "../../../../api/products/getProducts";
import ProductCardSkeleton from "../../../skeletons/ProductCardSkeleton";

const ProductsContainer = () => {
  const [products, setProducts] = useState([]);
  const [fetching, setFetching] = useState(false);
  const fetchProducts = async () => {
    try {
      setFetching(true);
      const response = await getProducts();
      if (response.status === 200) {
        setProducts(response.data);
        setFetching(false);
      }
    } catch (err) {
      setFetching(false);
      console.log(err);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="flex items-center gap-x-4">
      {!fetching ? (
        <>
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </>
      ) : (
        <div className="flex items-center gap-x-5">
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </div>
      )}
    </div>
  );
};

export default ProductsContainer;

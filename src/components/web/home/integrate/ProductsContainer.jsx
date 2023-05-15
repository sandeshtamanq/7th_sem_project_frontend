import React, { useEffect, useState } from "react";
import ProductCard from "../../static/ProductCard";
import { getProducts } from "../../../../api/products/getProducts";
import ProductCardSkeleton from "../../../skeletons/ProductCardSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAction } from "../../../../redux/reducers/productReducer";

const ProductsContainer = ({}) => {
  const [fetching, setFetching] = useState(false);
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const fetchProducts = async () => {
    try {
      setFetching(true);
      const response = await getProducts(20);
      if (response.status === 200) {
        dispatch(fetchProductsAction(response.data.items));
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
    <div className="grid grid-cols-4 my-2 gap-4">
      {!fetching ? (
        <>
          {products?.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </>
      ) : (
        <div className="flex items-center gap-x-5">
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </div>
      )}
    </div>
  );
};

export default ProductsContainer;

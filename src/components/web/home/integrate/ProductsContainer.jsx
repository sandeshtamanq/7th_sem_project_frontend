import React, { useEffect, useState } from "react";
import ProductCard from "../../static/ProductCard";
import { getProducts } from "../../../../api/products/getProducts";
import ProductCardSkeleton from "../../../skeletons/ProductCardSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAction } from "../../../../redux/reducers/productReducer";

const ProductsContainer = ({ limit, view }) => {
  const [fetching, setFetching] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const fetchProducts = async () => {
    try {
      setFetching(true);
      const response = await getProducts(limit, pageNumber);
      if (response.status === 200) {
        dispatch(fetchProductsAction(response.data.items));
        setFetching(false);
        setTotalPages(response.data.meta.totalPages);
      }
    } catch (err) {
      setFetching(false);
      console.log(err);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [pageNumber]);
  return (
    <>
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
      {view === "product" && (
        <div className="flex justify-end mt-5">
          <nav>
            <ul className="flex -space-x-px">
              <li
                onClick={() => {
                  if (pageNumber <= 1) return;
                  setPageNumber((preval) => preval - 1);
                }}
              >
                <div className="px-3 py-2 block ml-0  leading-tight  border border-gray-400 rounded-l-lg  bg-gray-200  text-gray-600 hover:bg-gray-100 ">Previous</div>
              </li>

              {(() => {
                let li = [];
                for (let i = 1; i <= totalPages; i++) {
                  li.push(
                    <li key={i} onClick={() => setPageNumber(i)}>
                      <div className={`px-3 py-2 ${pageNumber === i ? "bg-secondary " : "bg-gray-200 "} leading-tight  border text-gray-600   border-gray-400  hover:bg-gray-100 `}>{i}</div>
                    </li>
                  );
                }
                return li;
              })()}

              <li
                onClick={() => {
                  if (pageNumber === totalPages) return;
                  setPageNumber((preval) => preval + 1);
                }}
              >
                <div className="px-3 py-2 block leading-tight  border  rounded-r-lg border-gray-400  bg-gray-200  text-gray-600 hover:bg-gray-100 ">Next</div>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default ProductsContainer;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../../../api/products/getSingleProduct";
import Review from "./integrate/Review";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { errorToast } from "../../common/toastify";
import { addToCart } from "../../../api/cart/addToCart";
import { useDispatch, useSelector } from "react-redux";
import { addCartProduct } from "../../../redux/reducers/cartReducer";
import { fetchProductDetailAction, updateProductAmount, updateProductDetailAction } from "../../../redux/reducers/productDetailReducer";
import Loader from "../../common/Loader";

const ProductDetail = () => {
  const { id } = useParams();
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const dispatch = useDispatch();
  const [productDetail, setProductDetail] = useState({});
  const { title, brand, productAmount, price, description, image, reviews } = useSelector((state) => state.productDetail);
  const fetchSingleProduct = async (id) => {
    try {
      setLoading(true);
      const response = await getSingleProduct(id);
      if (response.status === 200) {
        dispatch(fetchProductDetailAction(response.data));
        setProductDetail(response.data);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleProduct(id);
  }, []);

  const addInCart = (productId, amount) => {
    if (amount < 1) {
      errorToast("please select at least one");
      return;
    }
    addToCart(productId, amount, setAdding);
    dispatch(addCartProduct(amount));
  };
  const { isLoggedIn } = useAuthContext();
  return (
    <>
      {loading ? (
        <div className="h-[20rem]">loading ...</div>
      ) : (
        <>
          <div className="flex items-center bg-white w-[98%] gap-x-4 m-auto rounded-md">
            <div className="flex-1">
              <img src={image} className="h-[40rem] object-cover" alt="" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col p-5 gap-y-5 justify-between h-full">
                <h1>{title}</h1>
                <div className="flex items-center">
                  <div>Brand:</div>
                  <div>{brand}</div>
                </div>
                <div>Rs.{price}</div>
                {productAmount > 0 ? <div>Quantity: {productAmount}</div> : <div className="text-red-500">Out of stock</div>}
                {isLoggedIn && (
                  <div className="flex items-center gap-x-2">
                    <div className="flex items-center gap-x-2">
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          if (amount < 1) {
                            errorToast("Product must me more than one");
                            return;
                          }
                          setAmount((preval) => preval - 1);
                          dispatch(updateProductAmount("remove"));
                        }}
                      >
                        -
                      </div>
                      <div className="border rounded-md py-0.5 px-3">{amount}</div>
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          if (productDetail.productAmount === amount) {
                            errorToast("Can not add more product");
                            return;
                          }
                          setAmount((preval) => preval + 1);
                          dispatch(updateProductAmount("add"));
                        }}
                      >
                        +
                      </div>
                    </div>
                    <div
                      className="bg-secondary text-white cursor-pointer p-2 rounded-md"
                      onClick={() => {
                        if (productDetail.productAmount < 1) {
                          errorToast("Product is currently out of stock please check back later");
                          return;
                        }
                        dispatch(updateProductDetailAction(amount));
                        setAmount(0);
                        addInCart(id, amount);
                      }}
                    >
                      {adding ? <Loader /> : "Add To Cart"}
                    </div>
                  </div>
                )}
                <p dangerouslySetInnerHTML={{ __html: description }}></p>
              </div>
            </div>
          </div>
          <Review productDetail={reviews} id={id} />
        </>
      )}
    </>
  );
};

export default ProductDetail;

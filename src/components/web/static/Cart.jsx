import React, { useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { getCartAmount } from "../../../api/cart/getCartAmount";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartAmount } from "../../../redux/reducers/cartReducer";
const Cart = () => {
  const dispatch = useDispatch();
  const { productAmount } = useSelector((state) => state.cart);
  const fetchAmount = async () => {
    const response = await getCartAmount();
    if (response.status === 200) {
      dispatch(fetchCartAmount(response?.data?.amount));
    }
  };
  useEffect(() => {
    fetchAmount();
  }, []);
  return (
    <div className="flex items-center gap-x-0.5">
      <AiOutlineShoppingCart />
      <div className="">{productAmount}</div>
    </div>
  );
};

export default Cart;

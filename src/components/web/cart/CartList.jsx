import React, { useEffect, useState } from "react";
import { getCartItems } from "../../../api/cart/getCartItems";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { makeOrder } from "../../../api/order/makeOrder";
import { errorToast, successToast } from "../../common/toastify";
import Loader from "../../common/Loader";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../redux/reducers/cartReducer";
import CartListCard from "./integrate/CartListCard";
import { updateCart } from "../../../api/cart/updateCart";
import DropDown from "../../common/DropDown";

const CartList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Cash on delivery");
  const [hasChanged, setHasChanged] = useState(false);
  const dispatch = useDispatch();
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();
  const fetchCartItems = async () => {
    const res = await getCartItems();
    if (res?.status === 200) {
      setCartItems(res?.data.cartLists);
      setSubTotal(res?.data.subTotal);
    }
  };

  const postOrder = async (cartItems, subTotal) => {
    setLoading(true);

    try {
      const returnUrl = `${window.location.origin}/purchase`;
      const websiteUrl = window.location.origin;
      const res = await makeOrder(
        cartItems,
        subTotal,
        paymentMethod,
        returnUrl,
        websiteUrl
      );
      if (res.status === 201) {
        setLoading(false);
        successToast("Order placed successfully");
        dispatch(clearCart());
        if (paymentMethod === "khalti") {
          window.open(res.data.paymentUrl);
        }
        navigate("/orders");
      }
      if (res.status === 400) {
        errorToast("Please add product");
      }
    } catch (err) {
      errorToast("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
    fetchCartItems();
  }, []);

  const patchCart = async (id, data) => {
    const response = await updateCart(id, data);
    if (response.status === 200) {
    }
  };

  const paymentMode = [
    {
      name: "Cash on delivery",
    },
    {
      name: "Khalti",
    },
  ];

  return (
    <div className="flex items-center p-32">
      <div className="space-y-10  flex-3">
        {cartItems.length < 1 ? (
          <div>No items in the cart</div>
        ) : (
          <>
            {cartItems.map((cartItem, index) => {
              const { product, amount } = cartItem;
              return (
                <CartListCard
                  setHasChanged={setHasChanged}
                  key={index}
                  {...product}
                  amount={amount}
                  patchCart={patchCart}
                />
              );
            })}
          </>
        )}
        {/* {hasChanged && <div className="bg-secondary inline-block text-white cursor-pointer p-2 rounded-md">{false ? <Loader /> : "Update Cart"}</div>} */}
      </div>
      <div className="p-10 border h-[24rem] flex-1 border-gray-500 flex flex-col justify-between rounded-md">
        <h2 className="text-3xl">Order Summary:</h2>
        <div className="flex items-center justify-between">
          <div>Sub Total</div>
          <div>Rs. {subTotal}</div>
        </div>
        <div className="flex items-center justify-between">
          <div>Discount</div>
          <div>-</div>
        </div>
        <div className="flex items-center justify-between" L>
          <div>Total:</div>
          <div>Rs.{subTotal}</div>
        </div>
        <select
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="shadow-lg p-2 rounded-md"
          id="cars"
        >
          {paymentMode.map((payment) => (
            <option value={payment.name}>{payment.name}</option>
          ))}
        </select>
        <div>
          {cartItems.length >= 1 && (
            <button
              onClick={() => postOrder(cartItems, subTotal)}
              className="bg-secondary px-4 py-2 w-full text-slate-50 hover:shadow-md mt-4 flex items-center justify-center rounded-md"
              type="submit"
            >
              {loading ? <Loader /> : "CheckOut"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartList;

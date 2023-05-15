import React, { useEffect, useState } from "react";
import { getCartItems } from "../../../api/cart/getCartItems";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { makeOrder } from "../../../api/order/makeOrder";

const CartList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
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
    const res = await makeOrder(cartItems, subTotal);
    if (res.status === 200) {
      console.log(res);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
    fetchCartItems();
  }, []);
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
                <div key={index} className="flex items-center gap-x-4 justify-between">
                  <div className="">
                    <img src={product?.productImage} className="h-40 w-40 object-cover" alt="" />
                  </div>
                  <div className="flex-2 flex flex-col justify-between h-full">
                    <h5>Product Name: {product.productName}</h5>
                    <div>
                      Brand:
                      {product.brandName.brandName}
                    </div>
                  </div>
                  <div className="flex-2">
                    <h5>Amount: {amount}</h5>
                    <div>Rs. {amount * product.productPrice}</div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
      <div className="p-10 border h-[24rem] flex-1 border-gray-500 flex flex-col justify-between rounded-md">
        <h2 className="text-3xl">Order Summary:</h2>
        <div className="flex items-center justify-between">
          <div>Sub Total</div>
          <div>{subTotal}</div>
        </div>
        <div className="flex items-center justify-between">
          <div>Discount</div>
          <div>-</div>
        </div>
        <div className="flex items-center justify-between" L>
          <div>Total:</div>
          <div>{subTotal}</div>
        </div>
        <div>
          <button onClick={() => postOrder(cartItems, subTotal)} className="bg-secondary px-4 py-2 w-full text-slate-50 hover:shadow-md mt-4 flex items-center justify-center rounded-md" type="submit">
            CheckOut
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartList;

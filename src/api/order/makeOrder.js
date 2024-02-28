import api from "../api";

export const makeOrder = async (
  cartItems,
  subTotal,
  paymentMode,
  returnUrl,
  websiteUrl
) => {
  let amount = 0;
  const products = cartItems.map((item) => item.product);
  cartItems.forEach((item) => {
    amount = amount + item.amount;
  });

  try {
    const res = await api.post("/order", {
      products,
      amount,
      totalSum: subTotal,
      paymentMode,
      returnUrl,
      websiteUrl,
    });
    return res;
  } catch (err) {
    return err.response;
  }
};

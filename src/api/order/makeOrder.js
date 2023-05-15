import api from "../api";

export const makeOrder = async (cartItems, subTotal) => {
  let amount = 0;
  const products = cartItems.map((item) => item.product);
  cartItems.forEach((item) => {
    amount = amount + item.amount;
  });
  try {
    const res = await api.post("/order", { products, amount, totalSum: subTotal });
    return res;
  } catch (err) {
    return err.response;
  }
};

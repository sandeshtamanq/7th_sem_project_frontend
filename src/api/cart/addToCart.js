import api from "../api";

export const addToCart = async (productId, amount) => {
  try {
    const response = await api.post("/cart/", {
      productId,
      amount,
    });
    return response;
  } catch (err) {
    return err.response;
  }
};

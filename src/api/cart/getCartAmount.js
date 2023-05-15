import api from "../api";

export const getCartAmount = async () => {
  try {
    const response = api.get("/cart/amount");
    return response;
  } catch (err) {
    return err.response;
  }
};

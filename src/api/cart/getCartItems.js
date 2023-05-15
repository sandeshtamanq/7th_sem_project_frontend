import api from "../api";
export const getCartItems = async () => {
  try {
    const response = await api.get("/cart");
    return response;
  } catch (err) {
    console.log(err);
    return err.response;
  }
};

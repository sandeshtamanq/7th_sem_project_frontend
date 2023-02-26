import api from "../api";

export const getProducts = async () => {
  try {
    const response = await api.get("/product");
    return response;
  } catch (err) {
    return err.response;
  }
};

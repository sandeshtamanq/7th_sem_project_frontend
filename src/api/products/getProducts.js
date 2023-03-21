import api from "../api";

export const getProducts = async (limit) => {
  try {
    const response = await api.get(`/product?limit=${limit}`);
    return response;
  } catch (err) {
    return err.response;
  }
};

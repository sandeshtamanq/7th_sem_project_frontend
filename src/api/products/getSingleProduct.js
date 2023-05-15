import api from "../api";

export const getSingleProduct = async (id) => {
  try {
    const response = await api.get(`/product/${id}`);
    return response;
  } catch (err) {
    return err.response;
  }
};

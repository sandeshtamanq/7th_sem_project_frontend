import api from "../api";

export const getProducts = async (limit, pageNumber = 1) => {
  try {
    const response = await api.get(`/product?page=${pageNumber}&limit=${limit}`);
    return response;
  } catch (err) {
    return err.response;
  }
};

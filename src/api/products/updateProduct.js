import api from "../api";

export const updateProduct = async (product, id) => {
  try {
    const response = await api.put(`/product/edit/${id}`, { ...product });
  } catch (err) {
    return err.response;
  }
};

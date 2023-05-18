import api from "../api";

export const updateProduct = async (product, id, productDescription) => {
  try {
    const response = await api.put(`/product/edit/${id}`, { ...product, productDescription });
    return response;
  } catch (err) {
    return err.response;
  }
};

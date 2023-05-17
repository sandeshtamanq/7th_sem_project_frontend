import api from "../api";

export const updateCart = async (id, data) => {
  try {
    const response = await api.patch(`/cart/update/${id}`, { ...data });
    return response;
  } catch (err) {
    return err.response;
  }
};

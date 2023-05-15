import api from "../api";

export const filterProduct = async (brand, price) => {
  try {
    const response = await api.get(`/product/filter?brand=${brand}&price=${price ? price : -1}`);
    return response;
  } catch (err) {
    return err.response;
  }
};

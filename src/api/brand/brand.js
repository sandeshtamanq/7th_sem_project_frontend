import api from "../api";

export const getBrands = async () => {
  try {
    const response = await api.get("/brand");
    return response;
  } catch (err) {
    return err.response;
  }
};

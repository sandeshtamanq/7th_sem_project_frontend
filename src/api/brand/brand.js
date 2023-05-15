import api from "../api";

export const getBrands = async () => {
  try {
    const response = await api.get("/brand?page=1&limit=10");
    return response;
  } catch (err) {
    return err.response;
  }
};

export const getAllBrands = async () => {
  try {
    const response = await api.get("/brand/getAll");
    return response;
  } catch (err) {
    return err.response;
  }
};

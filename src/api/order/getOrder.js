import api from "../api";

export const getOrder = async () => {
  try {
    const response = await api.get("/order");
    return response;
  } catch (err) {
    return err.response;
  }
};

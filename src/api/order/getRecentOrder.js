import api from "../api";

export const getRecentOrder = async () => {
  try {
    const response = await api.get("/order/recent");
    return response;
  } catch (err) {
    return err.response;
  }
};

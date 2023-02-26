import api from "../api";

export const getUserStat = async () => {
  try {
    const response = await api.get("/user/status");

    return response;
  } catch (err) {
    return err.response;
  }
};

import api from "../api";

export const getDashboardStat = async () => {
  try {
    const response = await api.get("/dashboard");
    return response;
  } catch (err) {
    return err.response;
  }
};

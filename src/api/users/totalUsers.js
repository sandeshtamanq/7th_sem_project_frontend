import api from "../api";

export const getUsers = async () => {
  try {
    const response = await api.get("/user?limit=10&page=1");

    return response;
  } catch (err) {
    return err.response;
  }
};

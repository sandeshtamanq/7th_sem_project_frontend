import api from "../api";

export const getUsers = async () => {
  try {
    const response = await api.get("/user");

    return response;
  } catch (err) {
    return err.response;
  }
};

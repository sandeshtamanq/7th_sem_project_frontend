import api from "../api";

export const postMessage = async (message) => {
  try {
    const response = await api.post("/contact", { ...message });
  } catch (err) {
    return err.response;
  }
};

import api from "../api";
import { errorToast, successToast } from "../../components/common/toastify";

export const register = async (registerCredentials, setLoading) => {
  try {
    setLoading(true);
    const response = await api.post("/auth/signup", { ...registerCredentials });
    setLoading(false);
    successToast("User Registered Successfully");
    return response;
  } catch (err) {
    setLoading(false);
    if (err?.response?.status === 400) return;
    errorToast("Something went wrong");
    return err.response;
  }
};

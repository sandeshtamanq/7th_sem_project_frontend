import { errorToast, successToast } from "../../components/common/toastify";
import api from "../api";

export const login = async (loginCredentials, setLoading) => {
  try {
    setLoading(true);
    const response = await api.post("/auth/login", { ...loginCredentials });
    successToast("User Loggedin Successfully");
    setLoading(false);
    return response;
  } catch (err) {
    setLoading(false);
    errorToast(err.response?.data?.message);
    return err.response;
  }
};

import { errorToast, successToast } from "../../components/common/toastify";
import api from "../api";

export const addBrand = async (brand, setLoading) => {
  try {
    setLoading(true);
    const res = await api.post("/brand", brand);
    successToast("Brand Name added successfully");
    setLoading(false);
    return res;
  } catch (err) {
    setLoading(false);
    errorToast("Error!!!");
    return err.response;
  }
};

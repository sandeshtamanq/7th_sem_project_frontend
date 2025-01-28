import { errorToast, successToast } from "../../components/common/toastify";
import api from "../api";

export const updateBrand = async (brandId, brand, setLoading) => {
  try {
    setLoading(true);
    const res = await api.put(`/brand/${brandId}`, brand);
    successToast("Brand Name updated successfully");
    setLoading(false);
    return res;
  } catch (err) {
    setLoading(false);
    errorToast("Error!!!");
    return err.response;
  }
};

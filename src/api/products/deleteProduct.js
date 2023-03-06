import { errorToast, successToast } from "../../components/common/toastify";
import api from "../api";

export const deleteProduct = async (id, fetchProducts) => {
  try {
    const response = await api.delete(`/product/${id}`);
    fetchProducts();
    successToast("Product delete successfully");
  } catch (err) {
    errorToast("Something went wrong");
  }
};

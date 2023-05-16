import { errorToast, successToast } from "../../components/common/toastify";
import api from "../api";

export const addToCart = async (productId, amount, setAdding) => {
  try {
    setAdding(true);
    const response = await api.post("/cart/", {
      productId,
      amount,
    });
    successToast("Product added successfully");
    return response;
  } catch (err) {
    errorToast("Something went wrong");
    return err.response;
  } finally {
    setAdding(false);
  }
};

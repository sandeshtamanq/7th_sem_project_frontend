import { errorToast, successToast } from "../../components/common/toastify";
import api from "../api";

export const addProducts = async (formData) => {
  console.log(formData);
  try {
    const response = await api.post("/product", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    successToast("Product Added Successfully");
    return response;
  } catch (err) {
    errorToast("Something went wrong");
    return err.response;
  }
};

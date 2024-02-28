import { errorToast, successToast } from "../../components/common/toastify";
import api from "../api";

export const confirmPayment = async (pidx, navigate) => {
  try {
    const response = await api.post("/payment/validate-payment/", {
      pidx,
    });

    if (response.status === 201) {
      successToast("Purchase successful");
      navigate("/orders");
    }
    return response;
  } catch (err) {
    return err.response;
  } finally {
  }
};

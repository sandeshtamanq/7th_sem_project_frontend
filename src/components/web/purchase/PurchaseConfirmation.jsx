import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { confirmPayment } from "../../../api/payment/confirmPayment";

export default function PurchaseConfirm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pidx = searchParams.get("pidx");

  useEffect(() => {
    confirmPayment(pidx, navigate);
  }, []);
  return <div>loading...</div>;
}

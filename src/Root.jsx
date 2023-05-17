import jwtDecode from "jwt-decode";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

const Root = ({ children }) => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();
  useEffect(() => {
    const token = localStorage.getItem("access-token");

    if (token) {
      const { exp, user } = jwtDecode(token);
      const currentDate = Date.now() / 1000;

      if (currentDate > exp) {
        localStorage.clear();
        navigate("/");
        return;
      }
      dispatch({ type: "LOGIN", payload: user });
    }

    //eslint-disable-next-line
  }, []);
  return <div className="min-h-screen flex flex-col justify-between">{children}</div>;
};

export default Root;

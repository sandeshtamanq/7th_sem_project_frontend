import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/auth/login";
import loginImage from "../../assets/web/login.jpg";
import { useAuthContext } from "../../hooks/useAuthContext";
import Loader from "../common/Loader";
const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setError((error) => {
      return {
        ...error,
        [name]: "",
      };
    });
    setLoginCredentials((loginCredentials) => {
      return {
        ...loginCredentials,
        [name]: value,
      };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (loginCredentials.email === "") {
      setError((error) => {
        return {
          ...error,
          email: "This field cannot be empty",
        };
      });
    }

    if (loginCredentials.password === "") {
      setError((error) => {
        return {
          ...error,
          password: "This field cannot be empty",
        };
      });
    }

    if (loginCredentials.email === "" || loginCredentials.password === "") return;

    const response = await login(loginCredentials, setLoading);
    if (response.status === 201) {
      localStorage.setItem("access-token", response.data.accessToken);
      const { user } = jwtDecode(response.data.accessToken);
      dispatch({ type: "LOGIN", payload: user });
      if (user.role === "admin") {
        navigate("/dashboard");
      }

      if (user.role === "user") {
        navigate("/");
      }
    }

    if (response.status === 403) {
      setErr(response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full flex-col">
      <h1 className="my-5">Login</h1>
      {/* <img src={loginImage} alt="" /> */}
      <div className="border-gray-300 border p-5 rounded-md">
        {err && <p className="text-red-500">{err}</p>}
        <form onSubmit={submitHandler} className="space-y-10">
          <div>
            <label htmlFor="email">Email*</label>
            <input type="email" name="email" id="email" placeholder="Enter Your Email" value={loginCredentials.email} onChange={changeHandler} />
            {error.email && <p className="text-red-500">{error.email}</p>}
          </div>
          <div>
            <label htmlFor="password">Password*</label>
            <input type="password" name="password" id="password" placeholder="Enter Your Password" value={loginCredentials.password} onChange={changeHandler} />
            {error.password && <p className="text-red-500">{error.password}</p>}
          </div>
          <div>
            <button className="bg-secondary px-4 py-2 w-full text-slate-50 hover:shadow-md mt-4 flex items-center justify-center rounded-md" type="submit">
              {loading ? <Loader css="fill-gray-600 h-[1.5rem]" /> : "Login"}
            </button>
            <div className="flex items-center gap-x-2">
              <p>Don't have an account?</p>
              <Link to="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/auth/register";
import Loader from "../common/Loader";
import { submitValidate } from "./utils/submitValidate";

const Register = () => {
  const registerCredentialsObj = {
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
    address: "",
  };
  const [registerCredentials, setRegisterCredentials] = useState(registerCredentialsObj);
  const [registerError, setRegisterError] = useState(registerCredentialsObj);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setRegisterError((prev) => {
      return {
        ...prev,
        [name]: "",
      };
    });
    setRegisterCredentials((registerCredentials) => {
      return {
        ...registerCredentials,
        [name]: value,
      };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    submitValidate(registerCredentials, setRegisterError);
    const response = await register(registerCredentials, setLoading);
    if (response.status === 409) {
      setRegisterError((prev) => {
        return {
          ...prev,
          email: "This email is already taken",
        };
      });
    }

    if (response.status === 201) {
      navigate("/login");
    }
  };
  return (
    <div className="flex items-center justify-center w-full flex-col">
      <h1 className="my-5">Register</h1>
      <div className="p-4 border border-gray-300 rounded-md">
        <form className="space-y-5" onSubmit={submitHandler}>
          <div className="flex items-start justify-between gap-x-2">
            <div className="flex-1">
              <label htmlFor="firstName">First Name*</label>
              <input onChange={changeHandler} type="text" name="firstName" id="firstName" placeholder="Enter First Name" />
              <p className="text-red-500">{registerError.firstName}</p>
            </div>
            <div className="flex-1">
              <label htmlFor="lastName">Last Name*</label>
              <input onChange={changeHandler} type="text" name="lastName" id="lastName" placeholder="Enter Last Name" />
              <p className="text-red-500">{registerError.lastName}</p>
            </div>
          </div>

          <div className="flex items-start justify-between gap-x-2">
            <div className="flex-1">
              <label htmlFor="email">Email*</label>
              <input onChange={changeHandler} type="email" name="email" id="email" placeholder="Enter Your Email" />
              <p className="text-red-500">{registerError.email}</p>
            </div>
            <div className="flex-1">
              <label htmlFor="number">Number*</label>
              <input onChange={changeHandler} type="number" name="contactNumber" id="number" placeholder="Enter Your Number" />
              <p className="text-red-500">{registerError.contactNumber}</p>
            </div>
          </div>

          <div className="flex items-start justify-between gap-x-2">
            <div className="flex-1">
              <label htmlFor="password">Password*</label>
              <input onChange={changeHandler} type="password" name="password" id="password" placeholder="Enter Your Password" />
              <p className="text-red-500">{registerError.password}</p>
            </div>
            <div className="flex-1">
              <label htmlFor="confirmPassword">Confirm Password*</label>
              <input onChange={changeHandler} type="password" name="confirmPassword" id="confirmPassowrd" placeholder="Confirm Password" />
              <p className="text-red-500">{registerError.confirmPassword}</p>
            </div>
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input onChange={changeHandler} type="text" name="address" id="address" placeholder="Enter Your Address" />
            <p className="text-red-500">{registerError.address}</p>
          </div>
          <div className="flex gap-x-2 items-center">
            <button className="bg-secondary flex items-center justify-center px-4 py-2 w-1/2 text-slate-50 hover:shadow-md rounded-md" type="submit">
              {loading ? <Loader css="fill-gray-600 h-[1.5rem]" /> : "Sign Up"}
            </button>
            <div className="flex items-center gap-x-2">
              <p>Already Have an account?</p>
              <Link to="/login" className="underline">
                Login here
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

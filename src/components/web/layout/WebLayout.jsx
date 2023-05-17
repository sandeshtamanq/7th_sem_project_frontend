import React, { useState } from "react";
import Navbar from "../static/Navbar";
import { CiUser } from "react-icons/ci";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Root from "../../../Root";
import DropDown from "../../common/DropDown";
import Footer from "../static/Footer";
import { BiLogOutCircle } from "react-icons/bi";
import Cart from "../static/Cart";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../redux/reducers/cartReducer";
import { FaEye } from "react-icons/fa";
import { openAction } from "../../../redux/reducers/openReducer";
const WebLayout = ({ children }) => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuthContext();
  const { dispatch: authDispatch } = useAuthContext();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  return (
    <Root>
      <div>
        <div className="flex justify-between items-center px-20 bg-slate-50">
          <Link to="/" className="border border-gray-300 px-4 py-2">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/mobile-shop-7540e.appspot.com/o/logo%2F346108848_589192399976400_8431081845564942233_n.png?alt=media&token=7862804c-8759-423b-82ac-56df792ad9e9"
              alt=""
              className="h-10"
            />
          </Link>
          {isLoggedIn ? (
            <div className="flex items-center justify-end">
              <h6 className="px-5">{`${user.firstName}`}</h6>
              <Link to="/cart">
                <Cart />
              </Link>
              {user.role === "admin" && (
                <Link to="/dashboard" className="mx-4 font-bold">
                  dashboard
                </Link>
              )}
              <DropDown open={open} setopen={setOpen}>
                <div className="min-h-[2rem] w-[200px] right-[73px] rounded-md absolute z-[10] bg-slate-50 top-[4.5%] shadow-md border  ">
                  <div onClick={() => dispatch(openAction())} className="">
                    <Link to="/orders">
                      <li className="flex gap-x-2 items-center justify-start px-4 py-2  rounded-md hover:bg-secondary">
                        <FaEye />
                        View Order
                        {/* <Link to="/orders">View Order</Link> */}
                      </li>
                    </Link>
                    <li
                      className="flex gap-x-2 items-center justify-start px-4 py-2  rounded-md hover:bg-secondary"
                      onClick={() => {
                        localStorage.clear();
                        authDispatch({ type: "LOGOUT" });
                        dispatch(clearCart());
                        navigate("/");
                      }}
                    >
                      <BiLogOutCircle />
                      <p
                      // onClick={() => {
                      //   localStorage.clear();
                      //   authDispatch({ type: "LOGOUT" });
                      //   dispatch(clearCart());
                      //   navigate("/");
                      // }}
                      >
                        logout
                      </p>
                    </li>
                  </div>
                </div>
              </DropDown>
            </div>
          ) : (
            <div className="flex items-center border border-gray-300">
              <NavLink to="/login" className={({ isActive }) => (isActive ? "bg-secondary" : "")}>
                <div className="flex items-center gap-x-2 cursor-pointer hover:bg-secondary px-4 py-2">
                  <CiUser />
                  Login
                </div>
              </NavLink>
              <NavLink to="/signup">
                <div className="flex items-center gap-x-2 cursor-pointer px-4 hover:bg-secondary py-2">
                  <AiOutlineUsergroupAdd />
                  Register
                </div>
              </NavLink>
            </div>
          )}
        </div>
        <Navbar />
        <div>{children}</div>
      </div>
      <div className="mt-32">
        <Footer />
      </div>
    </Root>
  );
};

export default WebLayout;

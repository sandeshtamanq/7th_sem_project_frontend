import React, { useEffect } from "react";
import Navbar from "../static/Navbar";
import { CiUser } from "react-icons/ci";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Root from "../../../Root";
import DropDown from "../../common/DropDown";
const WebLayout = ({ children }) => {
  const { user, isLoggedIn } = useAuthContext();
  return (
    <Root>
      <div>
        <div className="flex justify-between items-center px-20 bg-slate-50">
          <p className="border border-gray-300 px-4 py-2">admin@gmail.com</p>
          {isLoggedIn ? (
            <div className="flex items-center justify-end">
              <h6 className="">{`${user.firstName}`}</h6>
              <DropDown></DropDown>
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
    </Root>
  );
};

export default WebLayout;

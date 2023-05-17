import React, { useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dispatch: authDispatch } = useAuthContext();
  const updateTime = () => {
    const time = new Date().toLocaleTimeString();
    setCurrentTime(time);
  };
  setInterval(updateTime, 1000);
  const { user } = useAuthContext();
  return (
    <div className="bg-[#202020] border-b border-gray-500 px-4 py-3 text-white flex items-center justify-between w-full">
      <div>
        {/* <div>Welcome</div> */}
        <Link to="/">Shop</Link>
      </div>
      <div className="text-center">{currentTime}</div>
      <div className="flex items-center gap-x-4">
        <div className="bg-secondary rounded-full  px-[10px] py-[3px]">{user?.firstName[0]}</div>
        <div className="text-3xl cursor-pointer" onClick={()=>{
          localStorage.clear();
          authDispatch({ type: "LOGOUT" });
                        dispatch(clearCart());
                        navigate("/");
        }}>
          <BiLogOutCircle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

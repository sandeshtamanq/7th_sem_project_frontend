import React, { useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState("");
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
        <div className="text-3xl">
          <BiLogOutCircle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

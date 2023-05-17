import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openAction } from "../../redux/reducers/openReducer";

const DropDown = ({ children }) => {
  const { open } = useSelector((state) => state.open);
  const dispatch = useDispatch();
  return (
    <div className="w-1/2  text-center">
      {open && <div className="h-screen w-[99.98%] absolute top-0 left-0 " onClick={() => dispatch(openAction())}></div>}
      <div className="relative items-center m-auto justify-between cursor-pointer" onClick={() => dispatch(openAction())}>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 animation transform ${open ? "-rotate-180" : "rotate-0"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {open && <>{children}</>}
    </div>
  );
};

export default DropDown;

import React, { useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { useAuthContext } from "../../hooks/useAuthContext";
const DropDown = ({ menuItems }) => {
  const [open, setOpen] = useState(false);
  const { dispatch } = useAuthContext();
  return (
    <div className="w-1/2 m-auto  text-center">
      {open && <div className="h-screen w-[99.98%] absolute top-0 left-0 " onClick={() => setOpen((open) => !open)}></div>}
      <div className="relative items-center m-auto justify-between cursor-pointer" onClick={() => setOpen((open) => !open)}>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 animation transform ${open ? "-rotate-180" : "rotate-0"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {open && (
        <div className="min-h-[2rem] w-[200px] right-[73px] rounded-md absolute z-1 bg-slate-50 top-[4.5%] shadow-md border  ">
          {/* {countries.map((country, index) => {
          return (
            <div key={index}>
              <div
                className="cursor-pointer"
                onClick={() => handleClick(country.iso3, country.name)}
              >
                {country.name}
              </div>
            </div>
          );
        })} */}
          <div className="">
            <li className="flex gap-x-2 items-center justify-start px-4 py-2  rounded-md hover:bg-secondary">
              <BiLogOutCircle />
              <p
                onClick={() => {
                  localStorage.clear();
                  dispatch({ type: "LOGOUT" });
                }}
              >
                logout
              </p>
            </li>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown;

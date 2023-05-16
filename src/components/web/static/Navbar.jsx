import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";

const Navbar = () => {
  const navMenu = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Products",
      path: "/products",
    },
    {
      name: "About Us",
      path: "/about-us",
    },
    {
      name: "Contact Us",
      path: "/contact-us",
    },
  ];

  return (
    <div className="bg-primary text-white">
      <div className="flex justify-end px-20 ">
        <ul className="flex gap-x-5 items-center">
          {navMenu.map((items, index) => {
            const { name, path } = items;
            return (
              <NavLink key={index} to={path} className={({ isActive }) => (isActive ? "bg-secondary p-4 hover:bg-secondary" : "p-4 hover:bg-secondary")}>
                <li>{name}</li>
              </NavLink>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

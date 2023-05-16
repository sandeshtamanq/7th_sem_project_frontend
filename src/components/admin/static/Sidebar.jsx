import React from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineDashboard, MdOutlineCategory } from "react-icons/md";
import { AiOutlineUser, AiOutlineShopping } from "react-icons/ai";
import { BsFillBagFill } from "react-icons/bs";
const Sidebar = () => {
  const sidebarMenu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <MdOutlineDashboard />,
    },
    {
      name: "Users",
      path: "/admin/user",
      icon: <AiOutlineUser />,
    },
    {
      name: "Products",
      path: "/admin/product",
      icon: <AiOutlineShopping />,
    },
    {
      name: "Brand",
      path: "/admin/brand",
      icon: <MdOutlineCategory />,
    },
    {
      name: "Order",
      path: "/admin/orders",
      icon: <BsFillBagFill />,
    },
  ];
  return (
    <div className="bg-[#202020] shadow-md w-[10%] border-r border-gray-400 text-white overflow-auto">
      <div className="py-4 ">
        <ul className="flex flex-col gap-y-9 text-lg">
          {sidebarMenu.map(({ name, path, icon }, index) => (
            <NavLink
              key={index}
              to={path}
              className={({ isActive }) => (isActive ? "bg-[#3b3a3a] px-4 py-2 hover:bg-[#3b3a3a] flex  gap-x-2 items-center" : "px-4 py-2 hover:bg-[#3b3a3a] gap-x-2 flex items-center")}
            >
              {icon}
              <li>{name}</li>
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

import React from "react";
import Root from "../../../Root";
import Navbar from "../static/Navbar";
import Sidebar from "../static/Sidebar";

const Layout = ({ children }) => {
  return (
    <Root>
      <Navbar />
      <div className="h-[calc(100vh-55px)] w-full overflow-hidden">
        <div className="flex h-full">
          <Sidebar />
          <div className="flex-1 overflow-auto p-2">{children}</div>
        </div>
      </div>
    </Root>
  );
};

export default Layout;

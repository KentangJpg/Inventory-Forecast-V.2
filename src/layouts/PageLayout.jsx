import React from "react";
import Navbar from "../components/Navbar";

const PageLayout = ({ children, title, toggleSidebar, isMobile }) => {
  return (
    <div className="bg-white  pb-4 h-[97vh] overflow-hidden">
      <Navbar title={title} toggleSidebar={toggleSidebar} isMobile={isMobile} />
      <div className="px-2 sm:px-4 overflow-auto">{children}</div>
    </div>
  );
};

export default PageLayout;

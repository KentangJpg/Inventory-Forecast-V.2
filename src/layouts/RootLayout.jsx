import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const newIsMobile = window.innerWidth < 768;
      setIsMobile(newIsMobile);

      if (newIsMobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      const newCollapsed = !isSidebarCollapsed;
      setIsSidebarCollapsed(newCollapsed);
    }
  };

  const getLayoutClass = () => {
    if (isMobile) {
      return "grid-cols-1";
    }
    return isSidebarCollapsed
      ? "grid-cols-[4rem_1fr]"
      : "grid-cols-[16rem_1fr]";
  };

  return (
    <div className="bg-orange-50">
      <div
        className={`grid ${getLayoutClass()} gap-4 p-2 transition-all duration-300`}
      >
        {isMobile && (
          <div
            className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out z-10 ${
              isSidebarOpen ? "opacity-50" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        <div
          className={`
          ${
            isMobile
              ? "fixed inset-y-0 left-0 z-20 transform transition-transform duration-300 ease-in-out"
              : ""
          }
          ${isMobile && !isSidebarOpen ? "-translate-x-full" : "translate-x-0"}
        `}
        >
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            isMobile={isMobile}
            onCloseMobile={() => setIsSidebarOpen(false)}
          />
        </div>

        <div
          className={`content ${
            isMobile ? "w-full" : ""
          } transition-all duration-300`}
        >
          <Outlet context={{ toggleSidebar, isMobile }} />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;

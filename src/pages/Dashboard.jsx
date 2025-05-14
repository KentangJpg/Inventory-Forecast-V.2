import React from "react";
import PageLayout from "../layouts/PageLayout";
import { useOutletContext } from "react-router-dom";

const Dashboard = () => {
  const { toggleSidebar, isMobile } = useOutletContext();

  return (
    <PageLayout
      title="Dashboard"
      toggleSidebar={toggleSidebar}
      isMobile={isMobile}
    >
      <div className="mt-4">
        <h2>Dashboard Content</h2>
      </div>
    </PageLayout>
  );
};

export default Dashboard;

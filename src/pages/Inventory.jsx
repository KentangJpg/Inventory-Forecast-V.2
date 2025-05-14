// Inventory.jsx
import React from "react";
import UserTable from "../components/table/UserTable";
import PageLayout from "@/layouts/PageLayout";
import { useOutletContext } from "react-router-dom";

const Inventory = () => {
  const { toggleSidebar, isMobile } = useOutletContext();

  return (
    <PageLayout
      title="Inventory"
      toggleSidebar={toggleSidebar}
      isMobile={isMobile}
    >
      <div className="mt-4">
        <UserTable className="min-w-full" />
      </div>
    </PageLayout>
  );
};

export default Inventory;

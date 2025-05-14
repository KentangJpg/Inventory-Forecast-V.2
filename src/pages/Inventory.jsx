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
        <div className="mb-4">
          <h2 className="text-2xl font-bold tracking-tight mb-2">Inventory</h2>
          <p className="text-muted-foreground">
            Manage your products and stocks here
          </p>
        </div>
        <UserTable className="min-w-full" />
      </div>
    </PageLayout>
  );
};

export default Inventory;

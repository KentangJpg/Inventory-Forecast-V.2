import React from "react";
import PageLayout from "@/layouts/PageLayout";
import { useOutletContext } from "react-router-dom";
import DataTable from "../components/table/DataTable";
import { ProductColumns } from "@/components/table/ProductColumns";
import { ProductData } from "@/components/table/ProductData";

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
        <DataTable
          columns={ProductColumns}
          data={ProductData}
          filterPlaceholder="Filter products..."
        />
      </div>
    </PageLayout>
  );
};

export default Inventory;

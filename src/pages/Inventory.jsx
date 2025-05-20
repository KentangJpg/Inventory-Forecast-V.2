import React, { useState } from "react";
import PageLayout from "@/layouts/PageLayout";
import { useOutletContext } from "react-router-dom";
import DataTable from "../components/table/DataTable";
import { ProductColumns } from "@/components/table/ProductColumns";
import {
  ProductDataProvider,
  useProductData,
} from "@/components/table/ProductDataProvider";
import { Button } from "@/components/ui/button";
import { FiBarChart2 } from "react-icons/fi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function InventoryTable() {
  const { products, loading, error } = useProductData();

  if (loading) {
    return <div className="py-10 text-center">Loading product data...</div>;
  }

  if (error) {
    return (
      <div className="py-10 text-center">
        <p className="text-red-500 mb-2">Error loading product data: {error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <DataTable
      columns={ProductColumns}
      data={products}
      filterPlaceholder="Filter products..."
    />
  );
}

const Inventory = () => {
  const { toggleSidebar, isMobile } = useOutletContext();
  const [forecastDays, setForecastDays] = useState(7);

  return (
    <PageLayout
      title="Inventory"
      toggleSidebar={toggleSidebar}
      isMobile={isMobile}
    >
      <div className="mt-4">
        <div className="mb-4 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">
              Inventory
            </h2>
            <p className="text-muted-foreground">
              Manage your products and stocks here
            </p>
          </div>

          <Select
            value={forecastDays.toString()}
            onValueChange={(value) => setForecastDays(Number(value))}
          >
            <SelectTrigger className="w-[180px] flex gap-2">
              <FiBarChart2 className="w-4 h-4" />
              <SelectValue placeholder="Forecast Days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="None">No Forecast</SelectItem>
              <SelectItem value="7">7 Days Forecast</SelectItem>
              <SelectItem value="14">14 Days Forecast</SelectItem>
              <SelectItem value="30">30 Days Forecast</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ProductDataProvider forecastDays={forecastDays}>
          <InventoryTable />
        </ProductDataProvider>
      </div>
    </PageLayout>
  );
};

export default Inventory;

import React from "react";
import PageLayout from "../layouts/PageLayout";
import { useOutletContext } from "react-router-dom";
import PurchaseOrderTable from "../components/table/PurchaseOrderTable";
import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"; // Adjust the import path if needed

const PurchaseOrder = () => {
  const { toggleSidebar, isMobile } = useOutletContext();
  return (
    <PageLayout
      title="Purchase Order"
      toggleSidebar={toggleSidebar}
      isMobile={isMobile}
    >
      <div className="mt-4">
        <div className="mb-4 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">
              Purchase Order
            </h2>
            <p className="text-muted-foreground">
              Manage your purchase order here
            </p>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="default" className="flex gap-2 cursor-pointer">
                <FiPlus className="w-4 h-4" />
                Create
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Create Purchase Order</SheetTitle>
                <SheetDescription>
                  Fill in the details to create a new purchase order.
                </SheetDescription>
              </SheetHeader>
              {/* Add your form or content here */}
            </SheetContent>
          </Sheet>
        </div>
        <PurchaseOrderTable />
      </div>
    </PageLayout>
  );
};

export default PurchaseOrder;

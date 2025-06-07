import React, { useState } from "react";
import PageLayout from "../layouts/PageLayout";
import { useOutletContext } from "react-router-dom";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const Customer = () => {
  const { toggleSidebar, isMobile } = useOutletContext();
  const [open, setOpen] = useState(false);

  const formSchema = z.object({
    company: z.string().min(1, { message: "Company name is required" }),
    name: z.string().min(1, { message: "Name is required" }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        company: "",
        name: ""
    },
  });

  return (
    <PageLayout
      title="Customer"
      toggleSidebar={toggleSidebar}
      isMobile={isMobile}
    >
      <div className="mt-4">
        <div className="mb-4 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">Customer</h2>
            <p className="text-muted-foreground">Manage your customers here</p>
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="default" className="flex gap-2 cursor-pointer">
                <FiPlus className="w-4 h-4" />
                Add
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="sm:max-w-md overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Add New Customer</SheetTitle>
                <SheetDescription>
                  Fill in the details to create a new customer.
                </SheetDescription>
              </SheetHeader>

              <div className="px-4">
                <Form>
                  <form className="space-y-4 py-6"></form>

                  <FormField control={form.control} />
                </Form>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </PageLayout>
  );
};

export default Customer;

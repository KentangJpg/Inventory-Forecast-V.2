import React, { useState } from "react";
import PageLayout from "../layouts/PageLayout";
import { useOutletContext } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FiPlus, FiTrash } from "react-icons/fi";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { FaCalendar } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DataTable from "@/components/table/DataTable";
import { PoColumns } from "@/components/table/PoColumns";
import { PoData } from "@/components/table/PoData";
import { toast } from "sonner"

const productSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
  quantity: z.number().positive({ message: "Quantity must be positive" }),
  price: z.number().positive({ message: "Price must be positive" }),
});

const formSchema = z.object({
  id: z.string().min(1, { message: "ID is required" }),
  supplierName: z.string().min(1, { message: "Supplier name is required" }),
  products: z
    .array(productSchema)
    .min(1, { message: "At least one product is required" }),
  orderDate: z.date({ required_error: "Order date is required" }),
  expectedDeliveryDate: z.date({
    required_error: "Expected delivery date is required",
  }),
  status: z.string().min(1, { message: "Status is required" }),
  notes: z.string().optional(),
});

const PurchaseOrder = () => {
  const { toggleSidebar, isMobile } = useOutletContext();
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      supplierName: "",
      products: [{ name: "", quantity: 1, price: 0 }],
      orderDate: undefined,
      expectedDeliveryDate: undefined,
      status: "",
      notes: "",
    },
  });

  // Use fieldArray to handle dynamic products
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const onSubmit = (data) => {
    try {
      console.log(data);
      // Handle form submission here (e.g., API call)

      // Show success toast
      toast.success("Purchase order created successfully", {
        description: `Order ${data.id} for ${data.supplierName} has been created.`,
      });

      setOpen(false);
      form.reset();
    } catch (error) {
      // Show error toast if submission fails
      toast.error("Failed to create purchase order", {
        description: error.message || "Please try again later.",
      });
      console.error("Error creating purchase order:", error);
    }
  };

  // Calculate the total order value
  const calculateTotal = () => {
    const products = form.watch("products");
    return products
      .reduce((total, product) => {
        const quantity = Number(product.quantity) || 0;
        const price = Number(product.price) || 0;
        return total + quantity * price;
      }, 0)
      .toFixed(2);
  };

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
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="default" className="flex gap-2 cursor-pointer">
                <FiPlus className="w-4 h-4" />
                Create
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="sm:max-w-md overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Create Purchase Order</SheetTitle>
                <SheetDescription>
                  Fill in the details to create a new purchase order.
                </SheetDescription>
              </SheetHeader>
              <div className="px-4">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 py-6"
                  >
                    <FormField
                      control={form.control}
                      name="id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ID</FormLabel>
                          <FormControl>
                            <Input placeholder="PO-001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="supplierName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Supplier Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Supplier Co., Ltd."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Products Section - Moved below supplier name */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-base">Products</FormLabel>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            append({ name: "", quantity: 1, price: 0 })
                          }
                          className="flex items-center gap-1"
                        >
                          <FiPlus className="h-4 w-4" />
                          Add Product
                        </Button>
                      </div>

                      {fields.map((field, index) => (
                        <Card key={field.id} className="overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-medium">
                                Product {index + 1}
                              </h4>
                              {fields.length > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => remove(index)}
                                  className="h-8 w-8 p-0 text-destructive"
                                >
                                  <FiTrash className="h-4 w-4" />
                                </Button>
                              )}
                            </div>

                            <div className="space-y-3">
                              <FormField
                                control={form.control}
                                name={`products.${index}.name`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Product name"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <div className="grid grid-cols-2 gap-4">
                                <FormField
                                  control={form.control}
                                  name={`products.${index}.quantity`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Quantity</FormLabel>
                                      <FormControl>
                                        <Input
                                          type="number"
                                          min="1"
                                          placeholder="1"
                                          {...field}
                                          onChange={(e) =>
                                            field.onChange(
                                              Number(e.target.value)
                                            )
                                          }
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name={`products.${index}.price`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Unit Price</FormLabel>
                                      <FormControl>
                                        <Input
                                          type="number"
                                          min="0"
                                          step="0.01"
                                          placeholder="0.00"
                                          {...field}
                                          onChange={(e) =>
                                            field.onChange(
                                              Number(e.target.value)
                                            )
                                          }
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      {form.formState.errors.products?.root && (
                        <p className="text-sm font-medium text-destructive">
                          {form.formState.errors.products.root.message}
                        </p>
                      )}

                      <div className="flex justify-end font-medium">
                        Total: ${calculateTotal()}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="orderDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Order Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={`w-full pl-3 text-left font-normal ${
                                      !field.value
                                        ? "text-muted-foreground"
                                        : ""
                                    }`}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Select date</span>
                                    )}
                                    <FaCalendar className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="expectedDeliveryDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Expected Delivery</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={`w-full pl-3 text-left font-normal ${
                                      !field.value
                                        ? "text-muted-foreground"
                                        : ""
                                    }`}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Select date</span>
                                    )}
                                    <FaCalendar className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Ordered">
                                <Badge
                                  variant="outline"
                                  className="bg-blue-50 text-blue-700 border-blue-200"
                                >
                                  Ordered
                                </Badge>
                              </SelectItem>
                              <SelectItem value="Received">
                                <Badge
                                  variant="outline"
                                  className="bg-green-50 text-green-700 border-green-200"
                                >
                                  Received
                                </Badge>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notes (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Add any additional notes here..."
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <SheetFooter>
                      <Button type="submit">Create Purchase Order</Button>
                    </SheetFooter>
                  </form>
                </Form>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <DataTable
          columns={PoColumns}
          data={PoData}
          filterPlaceholder="Filter purchase orders..."
        />
      </div>
    </PageLayout>
  );
};

export default PurchaseOrder;

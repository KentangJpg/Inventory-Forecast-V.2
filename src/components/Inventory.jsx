// Inventory.jsx
import React, { useState, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Search, ChevronLeft, ChevronRight } from "lucide-react";
import Topbar from "./Topbar";

const Inventory = () => {
  // Sample inventory data
  const defaultData = [
    {
      id: "1",
      sku: "INV-001",
      name: "Premium Laptop",
      category: "Electronics",
      currentStock: 145,
      minStock: 30,
      leadTime: 14,
      monthlyDemand: 62,
      forecast30: 58,
      forecast60: 125,
      forecast90: 186,
      status: "In Stock",
    },
    {
      id: "2",
      sku: "INV-002",
      name: "Wireless Earbuds",
      category: "Electronics",
      currentStock: 89,
      minStock: 50,
      leadTime: 10,
      monthlyDemand: 120,
      forecast30: 115,
      forecast60: 240,
      forecast90: 360,
      status: "Low Stock",
    },
    {
      id: "3",
      sku: "INV-003",
      name: "Office Chair",
      category: "Furniture",
      currentStock: 28,
      minStock: 25,
      leadTime: 21,
      monthlyDemand: 18,
      forecast30: 22,
      forecast60: 38,
      forecast90: 52,
      status: "Low Stock",
    },
    {
      id: "4",
      sku: "INV-004",
      name: "Desk Lamp",
      category: "Home",
      currentStock: 67,
      minStock: 20,
      leadTime: 7,
      monthlyDemand: 25,
      forecast30: 24,
      forecast60: 50,
      forecast90: 75,
      status: "In Stock",
    },
    {
      id: "5",
      sku: "INV-005",
      name: "Printer Cartridge",
      category: "Office Supplies",
      currentStock: 12,
      minStock: 30,
      leadTime: 5,
      monthlyDemand: 45,
      forecast30: 42,
      forecast60: 90,
      forecast90: 135,
      status: "Reorder",
    },
    {
      id: "6",
      sku: "INV-006",
      name: "USB-C Cable",
      category: "Electronics",
      currentStock: 210,
      minStock: 100,
      leadTime: 8,
      monthlyDemand: 85,
      forecast30: 80,
      forecast60: 170,
      forecast90: 255,
      status: "In Stock",
    },
    {
      id: "7",
      sku: "INV-007",
      name: "Notebook Set",
      category: "Office Supplies",
      currentStock: 78,
      minStock: 40,
      leadTime: 10,
      monthlyDemand: 35,
      forecast30: 38,
      forecast60: 70,
      forecast90: 105,
      status: "In Stock",
    },
    {
      id: "8",
      sku: "INV-008",
      name: "Coffee Maker",
      category: "Kitchen",
      currentStock: 18,
      minStock: 20,
      leadTime: 15,
      monthlyDemand: 12,
      forecast30: 11,
      forecast60: 24,
      forecast90: 36,
      status: "Low Stock",
    },
    {
      id: "9",
      sku: "INV-009",
      name: "Standing Desk",
      category: "Furniture",
      currentStock: 5,
      minStock: 10,
      leadTime: 30,
      monthlyDemand: 8,
      forecast30: 7,
      forecast60: 16,
      forecast90: 24,
      status: "Reorder",
    },
    {
      id: "10",
      sku: "INV-010",
      name: "Monitor",
      category: "Electronics",
      currentStock: 42,
      minStock: 20,
      leadTime: 14,
      monthlyDemand: 30,
      forecast30: 32,
      forecast60: 60,
      forecast90: 90,
      status: "In Stock",
    },
  ];

  const [data, setData] = useState(() => [...defaultData]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Define columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "sku",
        header: "SKU",
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue("sku")}</div>
        ),
      },
      {
        accessorKey: "name",
        header: "Product Name",
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => <div>{row.getValue("category")}</div>,
      },
      {
        accessorKey: "currentStock",
        header: ({ column }) => (
          <div className="text-right flex justify-end items-center">
            Current Stock
            <button
              className="ml-1 p-0 h-6 w-6"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <ArrowUpDown className="h-4 w-4" />
            </button>
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-right font-medium">
            {row.getValue("currentStock")}
          </div>
        ),
      },
      {
        accessorKey: "minStock",
        header: "Min Stock",
        cell: ({ row }) => (
          <div className="text-right">{row.getValue("minStock")}</div>
        ),
      },
      {
        accessorKey: "leadTime",
        header: "Lead Time",
        cell: ({ row }) => (
          <div className="text-right">{row.getValue("leadTime")} days</div>
        ),
      },
      {
        accessorKey: "monthlyDemand",
        header: ({ column }) => (
          <div className="text-right flex justify-end items-center">
            Monthly Demand
            <button
              className="ml-1 p-0 h-6 w-6"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <ArrowUpDown className="h-4 w-4" />
            </button>
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-right">{row.getValue("monthlyDemand")}</div>
        ),
      },
      {
        accessorKey: "forecast30",
        header: "30 Day Forecast",
        cell: ({ row }) => (
          <div className="text-right font-medium">
            {row.getValue("forecast30")}
          </div>
        ),
      },
      {
        accessorKey: "forecast60",
        header: "60 Day Forecast",
        cell: ({ row }) => (
          <div className="text-right font-medium">
            {row.getValue("forecast60")}
          </div>
        ),
      },
      {
        accessorKey: "forecast90",
        header: "90 Day Forecast",
        cell: ({ row }) => (
          <div className="text-right font-medium">
            {row.getValue("forecast90")}
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status");
          return (
            <div
              className={`
              flex justify-center rounded-full py-1 px-2 text-xs font-medium
              ${
                status === "In Stock"
                  ? "bg-green-100 text-green-800"
                  : status === "Low Stock"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }
            `}
            >
              {status}
            </div>
          );
        },
      },
    ],
    []
  );

  // Combined filter function
  const combinedFilter = (row) => {
    // Global search filter
    const matchesGlobal =
      !globalFilter ||
      Object.values(row.original).some((value) =>
        String(value).toLowerCase().includes(globalFilter.toLowerCase())
      );

    // Category filter
    const matchesCategory =
      !categoryFilter || row.original.category === categoryFilter;

    // Status filter
    const matchesStatus = !statusFilter || row.original.status === statusFilter;

    return matchesGlobal && matchesCategory && matchesStatus;
  };

  // Set up the table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter: combinedFilter,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  // Extract unique categories for filter
  const categories = [...new Set(data.map((item) => item.category))];
  const statuses = [...new Set(data.map((item) => item.status))];

  return (
    <div className="bg-white shadow rounded-lg pb-4">
      <Topbar />
      <div className="px-6 py-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Inventory Forecasting
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Monitor stock levels and view demand forecasts for the next 30, 60,
            and 90 days.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
            <input
              placeholder="Search inventory..."
              className="pl-8 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <div className="relative">
              <select
                className="px-4 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            <div className="relative">
              <select
                className="px-4 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Statuses</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-md border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 text-sm">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-3 text-center text-sm text-gray-500"
                  >
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            Showing{" "}
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}
            -
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{" "}
            of {table.getFilteredRowModel().rows.length} items
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium bg-white hover:bg-gray-50 disabled:opacity-50"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </button>
            <span className="text-sm text-gray-500">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
            <button
              className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium bg-white hover:bg-gray-50 disabled:opacity-50"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;

import { useProductData } from "./ProductDataProvider";
import { Spinner } from "@/components/ui/spinner";

const ForecastCell = ({ value }) => {
  const { forecastLoading } = useProductData();

  if (forecastLoading) {
    return (
      <div className="flex items-center">
        <Spinner className="h-4 w-4 mr-2" />
      </div>
    );
  }

  if (value && value.includes("units")) {
    return <div className="text-blue-600 font-medium">{value}</div>;
  }

  return <div>{value}</div>;
};

export const ProductColumns = [
  {
    accessorKey: "productId",
    header: "Product ID",
  },
  {
    accessorKey: "productName",
    header: "Product Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "unitPrice",
    header: "Unit Price",
  },
  {
    accessorKey: "competitorPrice",
    header: "Competitor Price",
  },
  {
    accessorKey: "currentStock",
    header: "Current Stock",
  },
  {
    accessorKey: "forecast",
    header: "Forecast",
    cell: ({ getValue }) => <ForecastCell value={getValue()} />,
  },
];

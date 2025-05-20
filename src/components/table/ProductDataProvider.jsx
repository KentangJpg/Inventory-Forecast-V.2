import { useState, useEffect, createContext, useContext } from "react";

const ProductDataContext = createContext(null);

export function useProductData() {
  return useContext(ProductDataContext);
}

export function ProductDataProvider({ children, forecastDays = null }) {
  const [products, setProducts] = useState([]);
  const [forecastLoading, setForecastLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch basic product data first
  useEffect(() => {
    async function fetchBasicProductData() {
      try {
        setLoading(true);
        const response = await fetch("/api/products/");

        if (!response.ok) {
          throw new Error(`Error fetching products: ${response.statusText}`);
        }

        const data = await response.json();

        // Transform the API data
        const transformedData = data.map((product) => ({
          productName: product.product_name,
          productId: product.product_id,
          category: product.category,
          unitPrice: `$${product.unit_price.toFixed(2)}`,
          competitorPrice: `$${product.competitor_price.toFixed(2)}`,
          currentStock: product.current_stock.toString(),
          forecast: "Loading forecast...", // Default placeholder
        }));

        setProducts(transformedData);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch product data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBasicProductData();
  }, []);

  // Fetch forecast data separately
  useEffect(() => {
    // Don't fetch forecast if no forecastDays provided or no products yet
    if (!forecastDays || products.length === 0) {
      // Clear forecast data if forecastDays is removed
      if (products.length > 0 && !forecastDays) {
        setProducts((prevProducts) =>
          prevProducts.map((product) => ({
            ...product,
            forecast: "No forecast selected",
          }))
        );
      }
      return;
    }

    async function fetchForecastData() {
      try {
        setForecastLoading(true);
        const response = await fetch(
          `/api/products/?forecast=true&days=${forecastDays}`
        );

        if (!response.ok) {
          throw new Error(`Error fetching forecast: ${response.statusText}`);
        }

        const forecastData = await response.json();

        // Update only the forecast field for each product
        setProducts((prevProducts) => {
          return prevProducts.map((product) => {
            // Find matching product in the forecast data
            const forecastProduct = forecastData.find(
              (p) => p.product_id === product.productId
            );

            if (forecastProduct && forecastProduct.forecast) {
              return {
                ...product,
                forecast: `${forecastProduct.forecast.total_predicted_units} units (${forecastProduct.forecast.forecast_days} days)`,
              };
            }

            return {
              ...product,
              forecast: "No forecast available",
            };
          });
        });
      } catch (err) {
        console.error("Failed to fetch forecast data:", err);
        // Update forecast column to show error
        setProducts((prevProducts) =>
          prevProducts.map((product) => ({
            ...product,
            forecast: "Error loading forecast",
          }))
        );
      } finally {
        setForecastLoading(false);
      }
    }

    fetchForecastData();
  }, [forecastDays, products.length]);

  // Function to fetch a single product by ID
  const fetchProductById = async (productId) => {
    try {
      const response = await fetch(`/api/products/${productId}`);

      if (!response.ok) {
        throw new Error(`Error fetching product: ${response.statusText}`);
      }

      return await response.json();
    } catch (err) {
      console.error(`Failed to fetch product ${productId}:`, err);
      throw err;
    }
  };

  return (
    <ProductDataContext.Provider
      value={{
        products,
        loading,
        forecastLoading,
        error,
        fetchProductById,
      }}
    >
      {children}
    </ProductDataContext.Provider>
  );
}

export function useFetchProductById() {
  const context = useContext(ProductDataContext);
  if (!context) {
    throw new Error(
      "useFetchProductById must be used within a ProductDataProvider"
    );
  }
  return context.fetchProductById;
}

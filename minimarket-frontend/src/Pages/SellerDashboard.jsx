import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../Services/api";

function SellerDashboard() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch only logged-in seller's products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("You are not logged in.");
          return;
        }

        const response = await API.get("/products/seller", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(Array.isArray(response.data) ? response.data : []);
        setError("");
      } catch (error) {
        console.error(
          "Error fetching seller products:",
          error.response?.data || error.message,
        );
        setError("Failed to fetch products. Please try again.");
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  // Function to generate correct image URL
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return "";

    // If image already has full URL
    if (imageUrl.startsWith("http")) {
      return imageUrl;
    }

    // If image stored as /uploads/file.jpg
    if (imageUrl.startsWith("/uploads")) {
      return `http://localhost:8080${imageUrl}`;
    }

    // If image stored as file.jpg
    return `http://localhost:8080/uploads/${imageUrl}`;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Seller Dashboard</h2>
      <p>Welcome, Seller! You can manage your products here.</p>

      <Link
        to="/seller/add-product"
        style={{
          display: "inline-block",
          padding: "10px 20px",
          backgroundColor: "#4e73df",
          color: "white",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: "bold",
          margin: "20px 0",
        }}
      >
        Add New Product
      </Link>

      <h3>Your Products</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {products.length === 0 && !error ? (
        <p>No products yet. Add some!</p>
      ) : (
        <div style={{ display: "grid", gap: "20px" }}>
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "8px",
              }}
            >
              <h4>{product.name || "No Name"}</h4>
              <p>{product.description || "No Description"}</p>
              <p>Price: ₹{product.price ?? 0}</p>
              <p>Quantity: {product.quantity ?? 0}</p>

              {product.imageUrl && (
                <img
                  src={getImageUrl(product.imageUrl)}
                  alt={product.name || "Product Image"}
                  style={{
                    maxWidth: "200px",
                    marginTop: "10px",
                    borderRadius: "4px",
                  }}
                />
              )}

              <button
                onClick={() => navigate(`/seller/edit-product/${product.id}`)}
                style={{
                  marginTop: "10px",
                  padding: "8px 12px",
                  backgroundColor: "#1cc88a",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SellerDashboard;

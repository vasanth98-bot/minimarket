import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../Services/api";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Function to fix image path
  const getImageUrl = (url) => {
    if (!url) return "";

    if (url.startsWith("http")) return url;

    if (url.startsWith("/uploads")) return `http://localhost:8080${url}`;

    return `http://localhost:8080/uploads/${url}`;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/products/${id}`);
        const product = response.data;

        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setQuantity(product.quantity);
        setImageUrl(product.imageUrl || "");
      } catch (error) {
        console.error(
          "Failed to fetch product:",
          error.response?.data || error.message,
        );
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/products/${id}`, {
        name,
        description,
        price,
        quantity,
        imageUrl,
      });

      alert("Product updated successfully!");
      navigate("/seller");
    } catch (error) {
      console.error(
        "Failed to update product:",
        error.response?.data || error.message,
      );
      alert("Failed to update product.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h2>Edit Product</h2>

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL"
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        {/* IMAGE PREVIEW */}
        {imageUrl && (
          <img
            src={getImageUrl(imageUrl)}
            alt="Product"
            style={{
              width: "200px",
              display: "block",
              margin: "10px auto",
              borderRadius: "8px",
            }}
          />
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#4e73df",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;

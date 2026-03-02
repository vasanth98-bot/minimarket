import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Services/api";

function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("category", category); // ✅ Added category

      if (image) {
        formData.append("image", image);
      }

      const response = await API.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("PRODUCT ADDED RESPONSE:", response.data);

      alert("Product added successfully!");
      navigate("/seller");
    } catch (error) {
      console.error(
        "ERROR ADDING PRODUCT:",
        error.response?.data || error.message,
      );
      alert("Failed to add product. Check console for details.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h2>Add New Product</h2>

      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        {/* ✅ Category Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Toys">Toys</option>
          <option value="Books">Books</option>
          <option value="Home Appliances">Home Appliances</option>
          <option value="Men Wear">Men Wear</option>
          <option value="Women Wear">Women Wear</option>
          <option value="Kids">Kids</option>
          <option value="Gym">Gym</option>
          <option value="Gadgets">Gadgets</option>
        </select>

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

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
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;

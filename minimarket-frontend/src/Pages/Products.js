import React, { useEffect, useState } from "react";
import API from "../Services/api";
import "../styles/Products.css";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/buyer/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="product-container">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img src={product.imageUrl} alt={product.name} />
          <h3>{product.name}</h3>
          <p>₹ {product.price}</p>
          <button>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default Products;

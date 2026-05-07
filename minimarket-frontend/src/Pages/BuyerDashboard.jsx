import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

function BuyerDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentBanner, setCurrentBanner] = useState(0);
  const navigate = useNavigate();

  const banners = [
    "/C:/Users/angav/.gemini/antigravity/brain/231d2c15-75e8-460e-8f73-5eff6bc0b8b8/ecommerce_banner_1_1778143023499.png",
    "/C:/Users/angav/.gemini/antigravity/brain/231d2c15-75e8-460e-8f73-5eff6bc0b8b8/ecommerce_banner_2_1778143107748.png"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL === "your_supabase_url_here") {
          // Comprehensive Sample Data with Stock
          setProducts([
            { id: 1, name: "iPhone 15 Pro", price: 129900, category: "Mobiles", image_url: "https://images.unsplash.com/photo-1695048133142-1a20484d256e?w=500&auto=format", stock: 5 },
            { id: 2, name: "Sony WH-1000XM5", price: 29990, category: "Electronics", image_url: "https://images.unsplash.com/photo-1670057037130-979986bb6076?w=500&auto=format", stock: 0 },
            { id: 3, name: "MacBook Air M2", price: 114900, category: "Laptops", image_url: "https://images.unsplash.com/photo-1611186871348-b1ec696e52c9?w=500&auto=format", stock: 3 },
            { id: 4, name: "Samsung Galaxy S24", price: 79999, category: "Mobiles", image_url: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format", stock: 10 },
            { id: 5, name: "Adidas Running Shoes", price: 4999, category: "Fashion", image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format", stock: 2 },
            { id: 6, name: "Logitech MX Master 3S", price: 9450, category: "Electronics", image_url: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format", stock: 0 },
            { id: 7, name: "Philips Air Fryer", price: 8999, category: "Home", image_url: "https://images.unsplash.com/photo-1585659333124-74c6f15ed31c?w=500&auto=format", stock: 8 },
            { id: 8, name: "Ray-Ban Aviator", price: 12500, category: "Fashion", image_url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&auto=format", stock: 12 },
          ]);
          setLoading(false);
          return;
        }

        const { data, error: dbError } = await supabase
          .from('products')
          .select('*');

        if (dbError) throw dbError;
        setProducts(data || []);
      } catch (err) {
        console.error("Error fetching products from Supabase:", err);
        setError("Failed to load products. Please configure Supabase.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    if (product.stock === 0) {
      alert("Sorry, this item is Out of Stock!");
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemInCart = existingCart.find((item) => item.id === product.id);

    if (itemInCart) {
      if (itemInCart.quantity >= product.stock) {
        alert("Cannot add more! Only " + product.stock + " units in stock.");
        return;
      }
      itemInCart.quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("storage"));
    setCartTrigger(prev => prev + 1); // Force badge update
    alert("Product added to cart!");
  };

  const getCartQuantity = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = cart.find(i => i.id === id);
    return item ? item.quantity : 0;
  };

  if (loading) return <div style={{ textAlign: "center", padding: "100px", fontSize: "20px" }}>Loading MiniMarket...</div>;

  return (
    <div style={{ backgroundColor: "#f1f3f6", minHeight: "100vh", paddingBottom: "40px" }}>
      {/* Banner Carousel */}
      <div className="container" style={{ marginTop: "10px" }}>
        <div style={{
          width: "100%",
          height: "280px",
          borderRadius: "4px",
          overflow: "hidden",
          position: "relative",
          boxShadow: "var(--fk-shadow)"
        }}>
          <img 
            src={banners[currentBanner]} 
            alt="Promotion" 
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="container" style={{ marginTop: "20px" }}>
        <div className="card" style={{ padding: "20px", marginBottom: "20px" }}>
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            borderBottom: "1px solid var(--fk-border)",
            paddingBottom: "15px",
            marginBottom: "20px"
          }}>
            <div>
              <h2 style={{ fontSize: "22px", fontWeight: "600" }}>Deals of the Day</h2>
              <p style={{ color: "var(--fk-text-muted)", fontSize: "14px" }}>Handpicked for you</p>
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "15px"
          }}>
            {products.map((product) => {
              const qtyInCart = getCartQuantity(product.id);
              return (
                <div 
                  key={product.id}
                  className="card"
                  style={{
                    textAlign: "center",
                    padding: "15px",
                    transition: "transform 0.2s",
                    opacity: product.stock === 0 ? 0.7 : 1,
                    position: "relative"
                  }}
                >
                  {qtyInCart > 0 && (
                    <div style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      backgroundColor: "var(--fk-blue)",
                      color: "white",
                      padding: "2px 8px",
                      borderRadius: "10px",
                      fontSize: "12px",
                      fontWeight: "bold"
                    }}>
                      {qtyInCart} in cart
                    </div>
                  )}
                  <img 
                    src={product.image_url || "https://via.placeholder.com/150"} 
                    alt={product.name}
                    style={{ width: "100%", height: "150px", objectFit: "contain", marginBottom: "10px" }}
                  />
                  <div style={{ fontWeight: "500", fontSize: "14px", marginBottom: "5px", height: "35px", overflow: "hidden" }}>
                    {product.name}
                  </div>
                  
                  <div style={{ 
                    fontSize: "12px", 
                    fontWeight: "bold", 
                    color: product.stock > 0 ? "var(--fk-success)" : "#ff6161",
                    marginBottom: "8px"
                  }}>
                    {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
                  </div>

                  <div style={{ color: "var(--fk-success)", fontSize: "14px", fontWeight: "500" }}>
                    ₹{product.price}
                  </div>
                  
                  <button 
                    onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                    disabled={product.stock === 0}
                    style={{
                      backgroundColor: product.stock === 0 ? "#ccc" : "var(--fk-yellow)",
                      color: "white",
                      padding: "8px",
                      borderRadius: "2px",
                      fontWeight: "600",
                      marginTop: "10px",
                      width: "100%",
                      border: "none",
                      cursor: product.stock === 0 ? "not-allowed" : "pointer"
                    }}
                  >
                    {product.stock === 0 ? "SOLD OUT" : "ADD TO CART"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyerDashboard;


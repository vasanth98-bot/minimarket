import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

function SellerDashboard() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Mock data for Delivery Agents
  const [agents, setAgents] = useState([
    { id: 1, name: "Rahul Sharma", status: "Active", working: true, phone: "9876543210", vehicles: "Bike" },
    { id: 2, name: "Amit Kumar", status: "Active", working: false, phone: "9876543211", vehicles: "Scooter" },
    { id: 3, name: "Suresh Raina", status: "Inactive", working: false, phone: "9876543212", vehicles: "Van" },
    { id: 4, name: "Priya Singh", status: "Active", working: true, phone: "9876543213", vehicles: "Bike" },
    { id: 5, name: "Vikram Rathore", status: "Active", working: true, phone: "9876543214", vehicles: "Bike" },
  ]);

  const toggleAgentStatus = (id) => {
    setAgents(prev => prev.map(a => 
      a.id === id ? { ...a, status: a.status === "Active" ? "Inactive" : "Active", working: a.status === "Active" ? false : a.working } : a
    ));
  };

  const toggleAgentWorking = (id) => {
    setAgents(prev => prev.map(a => 
      a.id === id ? { ...a, working: !a.working } : a
    ));
  };

  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", description: "", stock: "", category: "Electronics", alertThreshold: 5 });

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const { data, error: dbError } = await supabase
        .from('products')
        .insert([{ 
          name: newProduct.name, 
          price: parseFloat(newProduct.price), 
          description: newProduct.description,
          stock: parseInt(newProduct.stock),
          category: newProduct.category,
          image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format" // Placeholder
        }]);

      if (dbError) throw dbError;
      alert("Product added successfully!");
      setShowAddForm(false);
      window.location.reload(); // Refresh to show new product
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product. Please check your Supabase permissions.");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL === "your_supabase_url_here") {
          setProducts([]);
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

  const stats = {
    total: agents.length,
    active: agents.filter(a => a.status === "Active").length,
    workingToday: agents.filter(a => a.working).length,
    notWorkingToday: agents.filter(a => !a.working && a.status === "Active").length,
  };

  if (loading) return <div style={{ textAlign: "center", padding: "100px", fontSize: "20px" }}>Loading Dashboard...</div>;

  return (
    <div className="container" style={{ marginTop: "20px", paddingBottom: "50px" }}>
      
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <div>
          <h2 style={{ fontSize: "26px", fontWeight: "600" }}>Seller Dashboard</h2>
          <p style={{ color: "var(--fk-text-muted)" }}>Welcome back! Manage your store and team.</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          style={{
            padding: "12px 24px",
            backgroundColor: showAddForm ? "#777" : "var(--fk-blue)",
            color: "white",
            borderRadius: "2px",
            fontWeight: "600",
            boxShadow: "var(--fk-shadow)",
            cursor: "pointer"
          }}
        >
          {showAddForm ? "CLOSE FORM" : "+ ADD NEW PRODUCT"}
        </button>
      </div>

      {/* NEW FEATURE: Expandable Add Product Panel */}
      {showAddForm && (
        <div className="card" style={{ padding: "30px", marginBottom: "30px", borderTop: "5px solid var(--fk-blue)" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "20px" }}>List a New Item</h3>
          <form onSubmit={handleAddProduct} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <input type="text" placeholder="Product Name" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} required style={{ padding: "12px", border: "1px solid #ddd", borderRadius: "4px" }} />
              <input type="number" placeholder="Price (₹)" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} required style={{ padding: "12px", border: "1px solid #ddd", borderRadius: "4px" }} />
              <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} style={{ padding: "12px", border: "1px solid #ddd", borderRadius: "4px" }}>
                <option>Electronics</option>
                <option>Mobiles</option>
                <option>Fashion</option>
                <option>Home Appliances</option>
              </select>
              <input type="number" placeholder="Initial Stock Qty" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} required style={{ padding: "12px", border: "1px solid #ddd", borderRadius: "4px" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <textarea placeholder="Product Description" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} required style={{ padding: "12px", border: "1px solid #ddd", borderRadius: "4px", height: "100px" }} />
              
              {/* Feature: Image URL with Preview */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input 
                  type="text" 
                  placeholder="Paste Image URL (e.g. from Unsplash)" 
                  value={newProduct.image_url} 
                  onChange={e => setNewProduct({...newProduct, image_url: e.target.value})} 
                  style={{ padding: "12px", border: "1px solid #ddd", borderRadius: "4px" }} 
                />
                
                <div style={{ 
                  height: "120px", 
                  border: "1px solid #eee", 
                  borderRadius: "4px", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  overflow: "hidden",
                  backgroundColor: "#fcfcfc"
                }}>
                  {newProduct.image_url ? (
                    <img src={newProduct.image_url} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "contain" }} onError={(e) => e.target.src = "https://via.placeholder.com/150?text=Invalid+URL"} />
                  ) : (
                    <span style={{ color: "#aaa", fontSize: "12px" }}>Image Preview Area</span>
                  )}
                </div>
              </div>

              {/* Feature: Stock Alert Setting */}
              <div style={{ padding: "10px", backgroundColor: "#fff8f0", border: "1px solid #ffe8cc", borderRadius: "4px" }}>
                <label style={{ fontSize: "12px", fontWeight: "600", color: "var(--fk-yellow)" }}>LOW STOCK ALERT THRESHOLD</label>
                <input type="number" value={newProduct.alertThreshold} onChange={e => setNewProduct({...newProduct, alertThreshold: e.target.value})} style={{ width: "100%", marginTop: "5px", padding: "5px", border: "none", backgroundColor: "transparent" }} />
              </div>
            </div>
            <button type="submit" style={{ gridColumn: "span 2", padding: "15px", backgroundColor: "var(--fk-yellow)", color: "white", fontWeight: "bold", borderRadius: "2px", fontSize: "16px" }}>
              PUBLISH PRODUCT TO MINIMARKET
            </button>
          </form>
        </div>
      )}

      {/* Stats Section */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "30px" }}>
        <div className="card" style={{ padding: "20px", textAlign: "center", borderLeft: "5px solid var(--fk-blue)" }}>
          <div style={{ fontSize: "14px", color: "var(--fk-text-muted)", marginBottom: "5px" }}>Total Agents</div>
          <div style={{ fontSize: "28px", fontWeight: "bold" }}>{stats.total}</div>
        </div>
        <div className="card" style={{ padding: "20px", textAlign: "center", borderLeft: "5px solid var(--fk-success)" }}>
          <div style={{ fontSize: "14px", color: "var(--fk-text-muted)", marginBottom: "5px" }}>Active Agents</div>
          <div style={{ fontSize: "28px", fontWeight: "bold", color: "var(--fk-success)" }}>{stats.active}</div>
        </div>
        <div className="card" style={{ padding: "20px", textAlign: "center", borderLeft: "5px solid var(--fk-yellow)" }}>
          <div style={{ fontSize: "14px", color: "var(--fk-text-muted)", marginBottom: "5px" }}>Working Today</div>
          <div style={{ fontSize: "28px", fontWeight: "bold", color: "var(--fk-yellow)" }}>{stats.workingToday}</div>
        </div>
        <div className="card" style={{ padding: "20px", textAlign: "center", borderLeft: "5px solid #ff6161" }}>
          <div style={{ fontSize: "14px", color: "var(--fk-text-muted)", marginBottom: "5px" }}>Off Today</div>
          <div style={{ fontSize: "28px", fontWeight: "bold", color: "#ff6161" }}>{stats.notWorkingToday}</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr", gap: "30px" }}>
        
        {/* Inventory Section */}
        <div>
          <div className="card" style={{ padding: "20px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px", borderBottom: "1px solid var(--fk-border)", paddingBottom: "10px" }}>
              Your Inventory ({products.length})
            </h3>

            {error && <p style={{ color: "red", padding: "10px" }}>{error}</p>}

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "15px" }}>
              {products.map((product) => (
                <div
                  key={product.id}
                  style={{
                    display: "flex",
                    gap: "15px",
                    padding: "15px",
                    border: "1px solid var(--fk-border)",
                    borderRadius: "4px",
                    alignItems: "center"
                  }}
                >
                  <img
                    src={product.image_url || "https://via.placeholder.com/100"}
                    alt={product.name}
                    style={{ width: "80px", height: "80px", objectFit: "contain" }}
                  />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: "16px", fontWeight: "600" }}>{product.name}</h4>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <p style={{ fontSize: "14px", color: "var(--fk-text-muted)" }}>₹{product.price}</p>
                      <span style={{ 
                        fontSize: "12px", 
                        padding: "2px 8px", 
                        backgroundColor: product.stock < 10 ? "#fff0f0" : "#f0f8f0", 
                        color: product.stock < 10 ? "#d32f2f" : "#388e3c",
                        borderRadius: "10px",
                        fontWeight: "600"
                      }}>
                        Stock: {product.stock}
                      </span>
                      {product.stock < 10 && (
                        <span style={{ fontSize: "10px", color: "white", backgroundColor: "#ff6161", padding: "2px 6px", borderRadius: "2px", fontWeight: "bold" }}>LOW STOCK</span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/seller/edit-product/${product.id}`)}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "white",
                      color: "var(--fk-blue)",
                      border: "1px solid var(--fk-blue)",
                      borderRadius: "2px",
                      fontWeight: "600"
                    }}
                  >
                    EDIT
                  </button>
                </div>
              ))}
              {products.length === 0 && <p style={{ textAlign: "center", color: "var(--fk-text-muted)" }}>No products listed.</p>}
            </div>
          </div>
        </div>

        {/* Delivery Agents Section */}
        <div>
          <div className="card" style={{ padding: "20px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px", borderBottom: "1px solid var(--fk-border)", paddingBottom: "10px" }}>
              Manage Agents
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {agents.map((agent) => (
                <div key={agent.id} style={{
                  padding: "15px",
                  border: "1px solid var(--fk-border)",
                  borderRadius: "4px",
                  backgroundColor: agent.working ? "#f6fff8" : "white",
                  boxShadow: agent.working ? "0 2px 4px rgba(0,128,0,0.1)" : "none"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                    <span style={{ fontWeight: "600", fontSize: "15px" }}>{agent.name}</span>
                    <button 
                      onClick={() => toggleAgentStatus(agent.id)}
                      style={{ 
                        fontSize: "11px", 
                        padding: "3px 8px", 
                        borderRadius: "10px", 
                        backgroundColor: agent.status === "Active" ? "var(--fk-success)" : "#777",
                        color: "white",
                        border: "none",
                        cursor: "pointer"
                      }}
                    >
                      {agent.status}
                    </button>
                  </div>
                  
                  <div style={{ fontSize: "13px", color: "var(--fk-text-muted)", marginBottom: "10px" }}>
                    {agent.phone} • {agent.vehicles}
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button 
                      disabled={agent.status === "Inactive"}
                      onClick={() => toggleAgentWorking(agent.id)}
                      style={{ 
                        flex: 1,
                        padding: "6px",
                        fontSize: "12px",
                        fontWeight: "600",
                        backgroundColor: agent.working ? "var(--fk-yellow)" : "white",
                        color: agent.working ? "white" : "var(--fk-yellow)",
                        border: `1px solid var(--fk-yellow)`,
                        borderRadius: "2px",
                        cursor: agent.status === "Inactive" ? "not-allowed" : "pointer",
                        opacity: agent.status === "Inactive" ? 0.5 : 1
                      }}
                    >
                      {agent.working ? "SET OFF DUTY" : "SET ON DUTY"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SellerDashboard;

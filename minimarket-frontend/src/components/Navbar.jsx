import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

function Navbar() {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  let cartCount = 0;
  try {
    const cartData = localStorage.getItem("cart");
    const cart = cartData ? JSON.parse(cartData) : [];
    cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  } catch (error) {
    cartCount = 0;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", search);
  };

  return (
    <header style={{
      backgroundColor: "var(--fk-blue)",
      height: "56px",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      color: "white",
      display: "flex",
      alignItems: "center"
    }}>
      <div className="container" style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        gap: "20px"
      }}>
        {/* Logo */}
        <div 
          onClick={() => navigate("/buyer")}
          style={{ cursor: "pointer", display: "flex", flexDirection: "column", lineHeight: 1 }}
        >
          <span style={{ fontSize: "20px", fontWeight: "bold", fontStyle: "italic" }}>Flipkart</span>
          <span style={{ fontSize: "11px", fontStyle: "italic", color: "#ffe500" }}>
            Explore <span style={{ fontWeight: "bold" }}>Plus</span>
            <span style={{ marginLeft: "2px" }}>✦</span>
          </span>
        </div>

        {/* Search Bar */}
        <form 
          onSubmit={handleSearch}
          style={{
            flex: 1,
            maxWidth: "560px",
            height: "36px",
            backgroundColor: "white",
            display: "flex",
            borderRadius: "2px",
            overflow: "hidden",
            boxShadow: "0 2px 4px 0 rgba(0,0,0,.23)"
          }}
        >
          <input
            type="text"
            placeholder="Search for products, brands and more"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              padding: "0 16px",
              fontSize: "14px",
              color: "#212121"
            }}
          />
          <button type="submit" style={{
            padding: "0 15px",
            backgroundColor: "white",
            color: "var(--fk-blue)"
          }}>
            🔍
          </button>
        </form>

        {/* Right Section */}
        <div style={{ display: "flex", alignItems: "center", gap: "30px", fontWeight: "500", fontSize: "16px" }}>
          {!session ? (
            <Link to="/" style={{
              backgroundColor: "white",
              color: "var(--fk-blue)",
              padding: "5px 40px",
              borderRadius: "2px",
              fontWeight: "600"
            }}>
              Login
            </Link>
          ) : (
            <div 
              onClick={() => navigate("/profile")}
              style={{ position: "relative", cursor: "pointer" }}
            >
              My Account
            </div>
          )}

          <Link to="/seller" style={{ fontSize: "15px" }}>Become a Seller</Link>
          
          <div style={{ position: "relative", cursor: "pointer" }} className="nav-item-more">
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>More <span style={{ fontSize: "10px" }}>▼</span></span>
            <div className="more-dropdown" style={{
              display: "none",
              position: "absolute",
              top: "100%",
              right: "-50px",
              backgroundColor: "white",
              color: "#212121",
              minWidth: "240px",
              boxShadow: "0 4px 16px 0 rgba(0,0,0,.2)",
              padding: "10px 0",
              zIndex: 1001,
              marginTop: "10px",
              borderRadius: "2px"
            }}>
              {[
                { label: "Notification Preferences", icon: "🔔" },
                { label: "24x7 Customer Care", icon: "📞", path: "/customer-care" },
                { label: "Advertise", icon: "📈" },
                { label: "Download App", icon: "📱" }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => item.path && navigate(item.path)}
                  style={{
                    padding: "12px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    fontSize: "14px",
                    fontWeight: "400",
                    transition: "background 0.2s",
                    cursor: item.path ? "pointer" : "default"
                  }} 
                  onMouseOver={e => e.currentTarget.style.backgroundColor = "#f5faff"} 
                  onMouseOut={e => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  <span style={{ fontSize: "16px" }}>{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          <Link to="/cart" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "18px" }}>🛒</span>
            <span>Cart</span>
            {cartCount > 0 && (
              <span style={{
                position: "absolute",
                top: "-8px",
                right: "35px",
                backgroundColor: "#ff6161",
                color: "white",
                fontSize: "10px",
                padding: "2px 5px",
                borderRadius: "10px",
                border: "1px solid white"
              }}>{cartCount}</span>
            )}
          </Link>

          {session && (
            <button 
              onClick={handleLogout}
              style={{
                backgroundColor: "transparent",
                color: "white",
                border: "1px solid rgba(255,255,255,0.3)",
                padding: "4px 12px",
                borderRadius: "2px",
                fontSize: "14px"
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;



import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });
  const [address, setAddress] = useState(() => {
    return JSON.parse(localStorage.getItem("shippingAddress")) || {
      name: "",
      phone: "",
      pincode: "",
      locality: "",
      address: "",
      city: "",
      state: ""
    };
  });
  const [isEditingAddress, setIsEditingAddress] = useState(!address.name);

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage"));
  };

  const handleAddressSave = (e) => {
    e.preventDefault();
    localStorage.setItem("shippingAddress", JSON.stringify(address));
    setIsEditingAddress(false);
  };

  const increaseQty = (id) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        if (item.quantity >= (item.stock || 99)) {
          alert(`Only ${item.stock} units available in stock!`);
          return item;
        }
        return { ...item, quantity: (item.quantity || 1) + 1 };
      }
      return item;
    });
    updateCart(updatedCart);
  };

  const decreaseQty = (id) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) - 1 } : item,
      )
      .filter((item) => item.quantity > 0);
    updateCart(updatedCart);
  };

  const removeItem = (id) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      const updatedCart = cartItems.filter((item) => item.id !== id);
      updateCart(updatedCart);
    }
  };

  const totalMRP = cartItems.reduce((total, item) => total + (item.price * 1.2) * (item.quantity || 1), 0);
  const totalDiscount = totalMRP - cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  const totalPrice = totalMRP - totalDiscount;

  const placeOrder = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }
    if (!address.name || !address.phone || !address.address) {
      alert("Please provide a shipping address!");
      setIsEditingAddress(true);
      return;
    }
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrder = {
      items: cartItems,
      total: totalPrice,
      address: address,
      date: new Date().toLocaleString(),
      status: "Ordered"
    };
    existingOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(existingOrders));
    localStorage.removeItem("cart");
    setCartItems([]);
    alert("Order placed successfully!");
    navigate("/orders");
  };

  return (
    <div className="container" style={{ marginTop: "20px", display: "flex", gap: "16px", alignItems: "flex-start", paddingBottom: "40px" }}>
      {/* Left Section */}
      <div style={{ flex: "2", display: "flex", flexDirection: "column", gap: "16px" }}>
        
        {/* Address Section */}
        <div className="card" style={{ padding: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: "600", textTransform: "uppercase", color: "var(--fk-text-muted)" }}>
              From Saved Addresses
            </h2>
            {!isEditingAddress && (
              <button 
                onClick={() => setIsEditingAddress(true)}
                style={{ color: "var(--fk-blue)", fontWeight: "600", backgroundColor: "transparent" }}
              >
                CHANGE
              </button>
            )}
          </div>

          {isEditingAddress ? (
            <form onSubmit={handleAddressSave} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <input type="text" placeholder="Full Name" value={address.name} onChange={(e) => setAddress({...address, name: e.target.value})} required style={{ padding: "10px", border: "1px solid var(--fk-border)" }} />
              <input type="text" placeholder="Phone Number" value={address.phone} onChange={(e) => setAddress({...address, phone: e.target.value})} required style={{ padding: "10px", border: "1px solid var(--fk-border)" }} />
              <input type="text" placeholder="Pincode" value={address.pincode} onChange={(e) => setAddress({...address, pincode: e.target.value})} required style={{ padding: "10px", border: "1px solid var(--fk-border)" }} />
              <input type="text" placeholder="Locality" value={address.locality} onChange={(e) => setAddress({...address, locality: e.target.value})} required style={{ padding: "10px", border: "1px solid var(--fk-border)" }} />
              <textarea placeholder="Address (Area and Street)" value={address.address} onChange={(e) => setAddress({...address, address: e.target.value})} required style={{ gridColumn: "span 2", padding: "10px", border: "1px solid var(--fk-border)", height: "80px" }} />
              <input type="text" placeholder="City/District/Town" value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} required style={{ padding: "10px", border: "1px solid var(--fk-border)" }} />
              <input type="text" placeholder="State" value={address.state} onChange={(e) => setAddress({...address, state: e.target.value})} required style={{ padding: "10px", border: "1px solid var(--fk-border)" }} />
              <button type="submit" style={{ gridColumn: "span 2", backgroundColor: "var(--fk-yellow)", color: "white", padding: "12px", fontWeight: "600", borderRadius: "2px" }}>
                SAVE AND DELIVER HERE
              </button>
            </form>
          ) : (
            <div style={{ padding: "10px 0" }}>
              <div style={{ display: "flex", gap: "10px", fontWeight: "600", marginBottom: "5px" }}>
                <span>{address.name}</span>
                <span>{address.phone}</span>
              </div>
              <p style={{ fontSize: "14px" }}>
                {address.address}, {address.locality}, {address.city}, {address.state} - <span style={{ fontWeight: "600" }}>{address.pincode}</span>
              </p>
            </div>
          )}
        </div>

        {/* Cart Items Section */}
        <div className="card" style={{ padding: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--fk-border)", paddingBottom: "15px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>My Cart ({cartItems.length})</h2>
          </div>

          {cartItems.length === 0 ? (
            <div style={{ padding: "40px", textAlign: "center" }}>
              <div style={{ fontSize: "60px", marginBottom: "20px" }}>🛒</div>
              <h3>Your cart is empty!</h3>
              <p style={{ color: "var(--fk-text-muted)", marginTop: "10px" }}>Add items to it now.</p>
              <button 
                onClick={() => navigate("/buyer")}
                style={{ backgroundColor: "var(--fk-blue)", color: "white", padding: "12px 40px", marginTop: "20px", borderRadius: "2px", fontWeight: "600" }}
              >
                Shop Now
              </button>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.id} style={{ display: "flex", gap: "20px", padding: "24px 0", borderBottom: "1px solid var(--fk-border)" }}>
                  <img 
                    src={item.image_url || "https://via.placeholder.com/150"} 
                    alt={item.name} 
                    style={{ width: "112px", height: "112px", objectFit: "contain" }}
                  />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "400", marginBottom: "8px" }}>{item.name}</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" }}>
                       <span style={{ fontSize: "12px", color: item.stock > 0 ? "var(--fk-success)" : "red", fontWeight: "600" }}>
                        {item.stock > 0 ? `In Stock (${item.stock} left)` : "Out of Stock"}
                       </span>
                    </div>
                    <p style={{ fontSize: "14px", color: "var(--fk-text-muted)", marginBottom: "12px" }}>Seller: MiniMarket</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
                      <span style={{ fontSize: "18px", fontWeight: "bold" }}>₹{item.price * (item.quantity || 1)}</span>
                      <span style={{ textDecoration: "line-through", color: "var(--fk-text-muted)", fontSize: "14px" }}>₹{Math.round(item.price * 1.2 * (item.quantity || 1))}</span>
                      <span style={{ color: "var(--fk-success)", fontSize: "14px", fontWeight: "bold" }}>20% Off</span>
                    </div>
                    
                    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <button 
                          onClick={() => decreaseQty(item.id)}
                          style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1px solid var(--fk-border)", backgroundColor: "white" }}
                        >-</button>
                        <span style={{ width: "46px", textAlign: "center", border: "1px solid var(--fk-border)", padding: "3px 0" }}>{item.quantity || 1}</span>
                        <button 
                          onClick={() => increaseQty(item.id)}
                          style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1px solid var(--fk-border)", backgroundColor: "white" }}
                        >+</button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        style={{ fontSize: "16px", fontWeight: "600", color: "var(--fk-text-main)", backgroundColor: "transparent" }}
                      >REMOVE</button>
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "flex-end", padding: "16px 22px", boxShadow: "0 -2px 10px 0 rgba(0,0,0,.1)" }}>
                <button 
                  onClick={placeOrder}
                  style={{ backgroundColor: "var(--fk-yellow)", color: "white", padding: "16px 60px", borderRadius: "2px", fontWeight: "600", fontSize: "16px" }}
                >PLACE ORDER</button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right Section - Price Details */}
      {cartItems.length > 0 && (
        <div style={{ flex: "1" }} className="card">
          <div style={{ padding: "13px 24px", borderBottom: "1px solid var(--fk-border)" }}>
            <h3 style={{ color: "var(--fk-text-muted)", fontSize: "16px", fontWeight: "600", textTransform: "uppercase" }}>Price Details</h3>
          </div>
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Price ({cartItems.length} items)</span>
              <span>₹{Math.round(totalMRP)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Discount</span>
              <span style={{ color: "var(--fk-success)" }}>- ₹{Math.round(totalDiscount)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Delivery Charges</span>
              <span style={{ color: "var(--fk-success)" }}>FREE</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px dashed var(--fk-border)", paddingTop: "20px", fontWeight: "bold", fontSize: "18px" }}>
              <span>Total Amount</span>
              <span>₹{Math.round(totalPrice)}</span>
            </div>
            <p style={{ color: "var(--fk-success)", fontWeight: "600", fontSize: "16px" }}>
              You will save ₹{Math.round(totalDiscount)} on this order
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;



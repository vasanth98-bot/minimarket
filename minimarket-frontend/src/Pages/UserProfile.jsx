import { useEffect, useState } from "react";
import API from "../Services/api";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState({
    firstName: "Vasanth",
    lastName: "Bot",
    gender: "Male",
    email: "vasanth@example.com",
    phone: "9876543210"
  });
  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem("shippingAddress");
    return saved ? [JSON.parse(saved)] : [];
  });
  const [rewards, setRewards] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const rewardsRes = await API.get("/dashboard/rewards");
        setRewards(rewardsRes.data.rewardPoints);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      }
    };
    fetchDashboardData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container" style={{ marginTop: "20px", display: "flex", gap: "16px", alignItems: "flex-start" }}>
      {/* Sidebar */}
      <div style={{ width: "280px", display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* User Greeting */}
        <div className="card" style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: "15px" }}>
          <div style={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "#ccc", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "24px" }}>
            👤
          </div>
          <div>
            <div style={{ fontSize: "12px", color: "var(--fk-text-muted)" }}>Hello,</div>
            <div style={{ fontSize: "16px", fontWeight: "600" }}>{user.firstName} {user.lastName}</div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="card" style={{ overflow: "hidden" }}>
          <div 
            onClick={() => navigate("/orders")}
            style={{ padding: "16px", display: "flex", alignItems: "center", gap: "15px", cursor: "pointer", borderBottom: "1px solid var(--fk-border)" }}
          >
            <span style={{ fontSize: "20px" }}>📦</span>
            <span style={{ fontWeight: "600", color: "var(--fk-text-muted)" }}>MY ORDERS</span>
            <span style={{ marginLeft: "auto", color: "#ccc" }}>›</span>
          </div>

          <div style={{ borderBottom: "1px solid var(--fk-border)" }}>
            <div style={{ padding: "16px", display: "flex", alignItems: "center", gap: "15px" }}>
              <span style={{ fontSize: "20px" }}>👤</span>
              <span style={{ fontWeight: "600", color: "var(--fk-text-muted)" }}>ACCOUNT SETTINGS</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div 
                onClick={() => setActiveTab("profile")}
                style={{ padding: "12px 12px 12px 50px", fontSize: "14px", cursor: "pointer", backgroundColor: activeTab === "profile" ? "#f5faff" : "transparent", color: activeTab === "profile" ? "var(--fk-blue)" : "inherit", fontWeight: activeTab === "profile" ? "600" : "400" }}
              >Profile Information</div>
              <div 
                onClick={() => setActiveTab("addresses")}
                style={{ padding: "12px 12px 12px 50px", fontSize: "14px", cursor: "pointer", backgroundColor: activeTab === "addresses" ? "#f5faff" : "transparent", color: activeTab === "addresses" ? "var(--fk-blue)" : "inherit", fontWeight: activeTab === "addresses" ? "600" : "400" }}
              >Manage Addresses</div>
              <div style={{ padding: "12px 12px 12px 50px", fontSize: "14px", color: "var(--fk-text-muted)" }}>PAN Card Information</div>
            </div>
          </div>

          <div style={{ borderBottom: "1px solid var(--fk-border)" }}>
            <div style={{ padding: "16px", display: "flex", alignItems: "center", gap: "15px" }}>
              <span style={{ fontSize: "20px" }}>💳</span>
              <span style={{ fontWeight: "600", color: "var(--fk-text-muted)" }}>PAYMENTS</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ padding: "12px 12px 12px 50px", fontSize: "14px", color: "var(--fk-text-muted)" }}>Gift Cards</div>
              <div style={{ padding: "12px 12px 12px 50px", fontSize: "14px", color: "var(--fk-text-muted)" }}>Saved Cards</div>
            </div>
          </div>

          <div 
            onClick={handleLogout}
            style={{ padding: "16px", display: "flex", alignItems: "center", gap: "15px", cursor: "pointer" }}
          >
            <span style={{ fontSize: "20px" }}>🚪</span>
            <span style={{ fontWeight: "600", color: "var(--fk-text-muted)" }}>Logout</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1 }} className="card">
        {activeTab === "profile" && (
          <div style={{ padding: "24px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "30px" }}>Personal Information</h2>
            
            <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: "12px", color: "var(--fk-text-muted)", display: "block", marginBottom: "5px" }}>First Name</label>
                <input type="text" value={user.firstName} disabled style={{ width: "100%", padding: "12px", border: "1px solid var(--fk-border)", backgroundColor: "#f9f9f9" }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: "12px", color: "var(--fk-text-muted)", display: "block", marginBottom: "5px" }}>Last Name</label>
                <input type="text" value={user.lastName} disabled style={{ width: "100%", padding: "12px", border: "1px solid var(--fk-border)", backgroundColor: "#f9f9f9" }} />
              </div>
            </div>

            <div style={{ marginBottom: "30px" }}>
              <label style={{ fontSize: "14px", display: "block", marginBottom: "10px" }}>Your Gender</label>
              <div style={{ display: "flex", gap: "30px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <input type="radio" checked={user.gender === "Male"} readOnly /> Male
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <input type="radio" checked={user.gender === "Female"} readOnly /> Female
                </label>
              </div>
            </div>

            <div style={{ marginBottom: "30px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px" }}>Email Address</h3>
              <input type="email" value={user.email} disabled style={{ width: "300px", padding: "12px", border: "1px solid var(--fk-border)", backgroundColor: "#f9f9f9" }} />
            </div>

            <div style={{ marginBottom: "30px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px" }}>Mobile Number</h3>
              <input type="text" value={user.phone} disabled style={{ width: "300px", padding: "12px", border: "1px solid var(--fk-border)", backgroundColor: "#f9f9f9" }} />
            </div>

            <div style={{ padding: "20px", backgroundColor: "#f5faff", borderRadius: "2px", border: "1px solid #e0e0e0" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "600", color: "var(--fk-blue)", marginBottom: "10px" }}>My Rewards</h3>
              <p style={{ fontSize: "14px" }}>You have <span style={{ fontWeight: "bold" }}>{rewards}</span> reward points available.</p>
            </div>
          </div>
        )}

        {activeTab === "addresses" && (
          <div style={{ padding: "24px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "30px" }}>Manage Addresses</h2>
            
            <button style={{ 
              width: "100%", 
              padding: "16px", 
              backgroundColor: "transparent", 
              border: "1px solid var(--fk-border)", 
              color: "var(--fk-blue)", 
              fontWeight: "600", 
              textAlign: "left",
              marginBottom: "20px"
            }}>
              + ADD A NEW ADDRESS
            </button>

            {addresses.length === 0 ? (
              <p style={{ textAlign: "center", padding: "40px", color: "var(--fk-text-muted)" }}>No addresses saved yet.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {addresses.map((addr, i) => (
                  <div key={i} style={{ padding: "20px", border: "1px solid var(--fk-border)", borderRadius: "2px" }}>
                    <div style={{ display: "flex", gap: "10px", fontWeight: "600", marginBottom: "10px" }}>
                      <span>{addr.name}</span>
                      <span>{addr.phone}</span>
                      <span style={{ marginLeft: "auto", fontSize: "12px", backgroundColor: "#f0f0f0", padding: "2px 8px", borderRadius: "2px" }}>HOME</span>
                    </div>
                    <p style={{ fontSize: "14px", lineHeight: "1.6" }}>
                      {addr.address}, {addr.locality}, {addr.city}, {addr.state} - <span style={{ fontWeight: "600" }}>{addr.pincode}</span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;


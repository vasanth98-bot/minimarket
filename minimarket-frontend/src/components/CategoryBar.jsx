import React from "react";

const categories = [
  { name: "Top Offers", icon: "🏷️" },
  { name: "Grocery", icon: "🛒" },
  { name: "Mobiles", icon: "📱" },
  { name: "Fashion", icon: "👕" },
  { name: "Electronics", icon: "💻" },
  { name: "Home", icon: "🏠" },
  { name: "Appliances", icon: "📺" },
  { name: "Travel", icon: "✈️" },
  { name: "Beauty, Toys & More", icon: "🧸" },
];

function CategoryBar() {
  return (
    <div style={{
      backgroundColor: "var(--fk-white)",
      borderBottom: "1px solid var(--fk-border)",
      boxShadow: "var(--fk-shadow)",
      marginBottom: "10px"
    }}>
      <div className="container" style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "12px 0",
        overflowX: "auto"
      }}>
        {categories.map((cat, index) => (
          <div key={index} style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            minWidth: "80px",
            gap: "8px"
          }}>
            <div style={{ fontSize: "24px" }}>{cat.icon}</div>
            <div style={{ 
              fontSize: "14px", 
              fontWeight: "500", 
              color: "var(--fk-text-main)",
              textAlign: "center"
            }}>
              {cat.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryBar;

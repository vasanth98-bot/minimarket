import React from "react";

function CustomerCare() {
  const faqs = [
    { q: "How do I track my order?", a: "Go to 'My Orders' and click 'Track Order'." },
    { q: "What is the return policy?", a: "You can return items within 30 days of delivery." },
    { q: "How can I contact a seller?", a: "Seller details are available on the product page." },
  ];

  return (
    <div className="container" style={{ marginTop: "30px", paddingBottom: "50px" }}>
      <div className="card" style={{ padding: "30px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "20px", color: "var(--fk-blue)" }}>24x7 Customer Care</h2>
        <p style={{ color: "var(--fk-text-muted)", marginBottom: "30px" }}>We are here to help you with any issues or questions.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
          {/* FAQ Section */}
          <div>
            <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "15px" }}>Frequently Asked Questions</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{ padding: "15px", border: "1px solid var(--fk-border)", borderRadius: "4px" }}>
                  <div style={{ fontWeight: "600", fontSize: "14px", marginBottom: "5px" }}>{faq.q}</div>
                  <div style={{ fontSize: "13px", color: "var(--fk-text-muted)" }}>{faq.a}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "15px" }}>Contact Us</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                <span style={{ fontSize: "24px" }}>📞</span>
                <div>
                  <div style={{ fontWeight: "600" }}>Phone Support</div>
                  <div style={{ fontSize: "14px", color: "var(--fk-text-muted)" }}>1800-202-9898 (Toll Free)</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                <span style={{ fontSize: "24px" }}>✉️</span>
                <div>
                  <div style={{ fontWeight: "600" }}>Email Support</div>
                  <div style={{ fontSize: "14px", color: "var(--fk-text-muted)" }}>support@minimarket.com</div>
                </div>
              </div>
              <button style={{
                marginTop: "10px",
                padding: "12px",
                backgroundColor: "var(--fk-blue)",
                color: "white",
                fontWeight: "600",
                borderRadius: "2px",
                boxShadow: "var(--fk-shadow)"
              }}>
                CHAT WITH US
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerCare;

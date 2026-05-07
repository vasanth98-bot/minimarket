import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("BUYER");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL === "your_supabase_url_here") {
        setError("Supabase is not configured. Please add your credentials to the .env file.");
        return;
      }

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("Auth Data:", data);
      console.log("Auth Error:", authError);

      if (authError) throw authError;

      if (data.session) {
        localStorage.setItem("token", data.session.access_token);
        localStorage.setItem("role", role); 
        
        if (role === "SELLER") {
          navigate("/seller");
        } else {
          navigate("/buyer");
        }
      }
    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.message || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div style={{ minHeight: "calc(100vh - 150px)", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f1f3f6", padding: "20px" }}>
      <div style={{ display: "flex", width: "100%", maxWidth: "850px", minHeight: "520px", boxShadow: "0 2px 4px 0 rgba(0,0,0,.2)", backgroundColor: "white" }}>
        
        {/* Left Sidebar */}
        <div style={{ flex: "0 0 320px", backgroundColor: "var(--fk-blue)", padding: "40px 33px", display: "flex", flexDirection: "column", color: "white" }}>
          <h2 style={{ fontSize: "28px", fontWeight: "600", marginBottom: "20px" }}>Login</h2>
          <p style={{ fontSize: "18px", lineHeight: "1.5", color: "#dbdbdb" }}>
            Get access to your Orders, Wishlist and Recommendations
          </p>
          <div style={{ marginTop: "auto", textAlign: "center" }}>
            <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png" alt="login illustration" style={{ maxWidth: "100%" }} />
          </div>
        </div>

        {/* Right Form Area */}
        <div style={{ flex: 1, padding: "50px 35px 20px", display: "flex", flexDirection: "column" }}>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            
            <div style={{ display: "flex", gap: "20px", marginBottom: "10px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer", fontSize: "14px" }}>
                <input type="radio" name="role" value="BUYER" checked={role === "BUYER"} onChange={() => setRole("BUYER")} />
                Buyer
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "5px", cursor: "pointer", fontSize: "14px" }}>
                <input type="radio" name="role" value="SELLER" checked={role === "SELLER"} onChange={() => setRole("SELLER")} />
                Seller
              </label>
            </div>

            <div style={{ position: "relative" }}>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: "100%", border: "none", borderBottom: "1px solid #e0e0e0", padding: "10px 0", fontSize: "16px", outline: "none" }}
              />
            </div>

            <div style={{ position: "relative" }}>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: "100%", border: "none", borderBottom: "1px solid #e0e0e0", padding: "10px 0", fontSize: "16px", outline: "none" }}
              />
            </div>

            <p style={{ fontSize: "12px", color: "var(--fk-text-muted)" }}>
              By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.
            </p>

            {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

            <button
              type="submit"
              style={{ backgroundColor: "var(--fk-yellow)", color: "white", padding: "15px", border: "none", borderRadius: "2px", fontWeight: "600", fontSize: "15px", boxShadow: "0 1px 2px 0 rgba(0,0,0,.2)", cursor: "pointer" }}
            >
              Login
            </button>
            
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <span style={{ fontSize: "14px", color: "var(--fk-text-muted)" }}>OR</span>
            </div>

            <button
              type="button"
              style={{ backgroundColor: "white", color: "var(--fk-blue)", padding: "14px", fontSize: "16px", fontWeight: "600", border: "none", borderRadius: "2px", cursor: "pointer", boxShadow: "0 2px 4px 0 rgba(0,0,0,.2)" }}
            >
              Request OTP
            </button>
          </form>

          <div style={{ marginTop: "auto", textAlign: "center", paddingTop: "50px" }}>
            <span style={{ fontSize: "14px", color: "var(--fk-blue)", fontWeight: "600", cursor: "pointer" }}>
              New to Flipkart? Create an account
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

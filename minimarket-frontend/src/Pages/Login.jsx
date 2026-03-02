import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending login request...");

      const response = await API.post("/auth/login", {
        email,
        password,
      });

      console.log("STATUS:", response.status);
      console.log("FULL RESPONSE:", response.data);

      const token = response.data.token || response.data.jwt || response.data;

      console.log("EXTRACTED TOKEN:", token);

      if (!token) {
        alert("Token not received from backend");
        return;
      }

      localStorage.setItem("token", token);
      console.log("Token saved successfully!");

      navigate("/buyer");
    } catch (error) {
      console.error("FULL ERROR OBJECT:", error);
      console.error("STATUS:", error.response?.status);
      console.error("DATA:", error.response?.data);

      alert("See console for error");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #4e73df, #1cc88a)",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "40px",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "25px" }}>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "18px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
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
              fontWeight: "bold",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

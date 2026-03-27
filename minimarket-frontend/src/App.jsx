import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import BuyerDashboard from "./Pages/BuyerDashboard";
import SellerDashboard from "./Pages/SellerDashboard";
import AddProduct from "./Pages/AddProduct";
import Navbar from "./components/Navbar";
import Cart from "./Pages/Cart";
import Orders from "./Pages/Orders";
import ProtectedRoute from "./components/ProtectedRoute";
import EditProduct from "./Pages/EditProduct";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Buyer Routes */}
        <Route
          path="/buyer"
          element={
            <ProtectedRoute requiredRole="BUYER">
              <BuyerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute requiredRole="BUYER">
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute requiredRole="BUYER">
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* Seller Routes */}
        <Route
          path="/seller"
          element={
            <ProtectedRoute requiredRole="SELLER">
              <SellerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/add-product"
          element={
            <ProtectedRoute requiredRole="SELLER">
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller/edit-product/:id"
          element={
            <ProtectedRoute requiredRole="SELLER">
              <EditProduct />
            </ProtectedRoute>
          }
        />

        {/* ✅ 404 Route (Bonus Fix) */}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;

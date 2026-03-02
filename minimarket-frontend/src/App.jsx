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
            <ProtectedRoute>
              <BuyerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* Seller Routes */}
        <Route
          path="/seller"
          element={
            <ProtectedRoute>
              <SellerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/add-product"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller/edit-product/:id"
          element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

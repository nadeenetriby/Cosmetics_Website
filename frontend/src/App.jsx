import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import ProductSearched from "./components/ProductSearched";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import UserProfilePage from "./pages/UserProfilePage";

import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <div
      style={{ backgroundColor: "#FFFFFF" }}
      className="min-h-screen relative overflow-hidden"
    >
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/OrdersPage" element={<OrdersPage />} />
          <Route path="/CartPage" element={<CartPage />} />
          <Route path="/Dashboard" element={<AdminPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/UserProfilePage" element={<UserProfilePage />} />

          <Route path="/products/Search" element={<ProductSearched />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;

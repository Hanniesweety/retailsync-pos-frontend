import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/product" element={<ProductDetails />} />
    </Routes>
  );
}
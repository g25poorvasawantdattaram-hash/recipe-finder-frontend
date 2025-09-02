import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Recipes from "./pages/Recipes";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        {/* Navbar */}
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "15px" }}>Recipes</Link>
          <Link to="/login" style={{ marginRight: "15px" }}>Login</Link>
          <Link to="/register">Register</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Recipes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from 'pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Add home or protected routes later */}
        {/* You can add <Route path="/login" element={<Login />} /> later */}
      </Routes>
    </Router>
  );
}

export default App;

import ProtectedRoute from './components/ProtectedRoute';
import AddRecipe from './pages/AddRecipe';
import Home from './pages/Home'; // For showing recipes

<Routes>
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />
  <Route
    path="/add"
    element={
      <ProtectedRoute>
        <AddRecipe />
      </ProtectedRoute>
    }
  />
  <Route path="/" element={<Home />} />
</Routes>

import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* your routes */}
      </Routes>
    </>
  );
}


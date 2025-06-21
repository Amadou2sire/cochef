import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ConsentBanner from "./components/ConsentBanner";
import PrivacyPage from "./pages/PrivacyPage";
import OrderForm from "./components/OrderForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />

        <main className="min-h-[calc(100vh-128px)] flex-grow">
          <Routes>
            {/* Routes publiques */}
            <Route path="/cochef" element={<Home />} />
            <Route path="/privacy" element={<PrivacyPage />} />

            <Route
              path="/login"
              element={
                isLoggedIn ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />

            <Route
              path="/register"
              element={
                isLoggedIn ? <Navigate to="/dashboard" replace /> : <Register />
              }
            />

            {/* Routes protégées */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute isAuthenticated={isLoggedIn}>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/order/:id"
              element={
                <PrivateRoute isAuthenticated={isLoggedIn}>
                  <OrderForm />
                </PrivateRoute>
              }
            />

            {/* Redirection racine */}
            <Route path="/" element={<Navigate to="/cochef" replace />} />

            {/* Catch-all */}
            <Route
              path="*"
              element={
                <Navigate to={isLoggedIn ? "/dashboard" : "/cochef"} replace />
              }
            />
          </Routes>
        </main>

        <Footer />
        <ConsentBanner />
      </div>
    </Router>
  );
}

export default App;

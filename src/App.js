import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider, AuthContext } from "./AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css"; // Optional: Your global styles
const Signup = lazy(() => import("./pages/Signup")); // Ensure the Signup.js file is in the pages folder
const Login = lazy(() => import("./pages/Login")); // Optional: Login page
const Dashboard = lazy(() => import("./pages/Dashboard")); // Placeholder for the main app page after signup/login
const NotFound = lazy(() => import("./pages/NotFound"));
const CreateOrder = lazy(() => import("./pages/CreateOrder"));

// PublicRoute component to redirect logged-in users
const PublicRoute = ({ children }) => {
  const { authToken } = React.useContext(AuthContext);
  return authToken ? <Navigate to="/dashboard" /> : children;
};

// PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
  const { authToken } = React.useContext(AuthContext);
  return authToken ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Header />
          <div className="main-content">
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                {/* Public routes (accessible only when not logged in) */}
                <Route
                  path="/signup"
                  element={
                    <PublicRoute>
                      <Signup />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  }
                />

                {/* Private routes (accessible only when logged in) */}
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/create-order"
                  element={
                    <PrivateRoute>
                      <CreateOrder />
                    </PrivateRoute>
                  }
                />

                {/* Redirect root to signup */}
                <Route path="/" element={<Navigate to="/signup" />} />

                {/* Catch-all for 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;

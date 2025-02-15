import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary"; // Import ErrorBoundary
import RouteGuard from "./routes/RouteGaurd";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme"; // Import your custom theme
import { ClipLoader } from 'react-spinners';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "./AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css"; // Optional: Your global styles
import GroupOrderList from "./components/GroupOrderList";
import GroupOrderDetails from "./components/GroupOrderDetails";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CreateOrder = lazy(() => import("./pages/CreateOrder"));
// const Orders = lazy(() => import("./pages/Orders"));
const Profile = lazy(() => import("./pages/ProfilePage"));
const GroupOrder = lazy(() => import("./components/GroupOrder"));
// toast.configure();

// PublicRoute component to redirect logged-in users
// const PublicRoute = ({ children }) => {
//   const { authToken } = React.useContext(AuthContext);
//   return authToken ? <Navigate to="/dashboard" /> : children;
// };

// // PrivateRoute component to protect routes
// const PrivateRoute = ({ children }) => {
//   const { authToken } = React.useContext(AuthContext);
//   return authToken ? children : <Navigate to="/login" />;
// };

// Route configuration
const routes = [
  { path: "/signup", component: <Signup />, isPublic: true },
  { path: "/login", component: <Login />, isPublic: true },
  { path: "/dashboard", component: <Dashboard />, isPublic: false },
  { path: "/create-order", component: <CreateOrder />, isPublic: false },
  { path: "/", component: <Navigate to="/signup" /> }, // Redirect to signup by default
  { path: "/orders", component: <Orders />, isPublic: false },
  { path: "/pickup-orders", component: <GroupOrder />, isPublic: false },
  { path: "/group-orders", component: <GroupOrderList />, isPublic: false },
  { path: "/group-orders/:groupOrderId", component: <GroupOrderDetails />, isPublic: false },
  { path: "/profile", component: <Profile />, isPublic: false },
  { path: "/orders/:orderId/details", component: <OrderDetails />, isPublic: false },
  { path: "*", component: <NotFound /> },
];

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <div className="App">
            <Header />
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="main-content">
              <Suspense fallback={<ClipLoader color="#000" size={50} />}>
                <ErrorBoundary>
                  <Routes>
                  {routes.map(({ path, component, isPublic }, index) => (
                    <Route
                      key={index}
                      path={path}
                      element={
                        <RouteGuard isPublic={isPublic}>
                          {component}
                        </RouteGuard>
                      }
                    />
                  ))}
                  </Routes>
                </ErrorBoundary>
              </Suspense>
            </div>
            <Footer />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;

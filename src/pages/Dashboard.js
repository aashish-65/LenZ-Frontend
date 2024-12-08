import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import "../assets/styles/Dashboard.css";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCreateOrder = () => {
    navigate("/create-order"); // Navigate to the Create Order page
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, {user?.name || "User"}!</h1>
      </header>

      <nav className="dashboard-nav">
        <ul>
          <li>
            <a href="#profile">Profile</a>
          </li>
          <li>
            <a href="#orders">Orders</a>
          </li>
          <li>
            <a href="#create-order">Create New Order</a>
          </li>
          <li>
            <a href="#settings">Settings</a>
          </li>
          <li>
            <a href="#support">Support</a>
          </li>
        </ul>
      </nav>

      <main className="dashboard-main">
        <section id="profile" className="dashboard-section">
          <h2>Your Profile</h2>
          <p>Name: {user?.name || "John Doe"}</p>
          <p>Email: {user?.email || "johndoe@example.com"}</p>
          <p>Subscription Plan: {user?.plan || "Base Plan"}</p>
        </section>

        <section id="orders" className="dashboard-section">
          <h2>Your Orders</h2>
          <p>No orders have been created yet.</p>
        </section>

        <section id="create-order" className="dashboard-section">
          <h2>Create New Order</h2>
          <button onClick={handleCreateOrder} className="create-order-button">
            Create New Order
          </button>
        </section>

        <section id="settings" className="dashboard-section">
          <h2>Account Settings</h2>
          <button className="settings-button">Change Password</button>
          <button className="settings-button">Update Profile</button>
        </section>

        <section id="support" className="dashboard-section">
          <h2>Support</h2>
          <p>
            For assistance, contact us at{" "}
            <a href="mailto:support@lenz.com">support@lenz.com</a> or call{" "}
            <a href="tel:+918967310388" >+91-8967310388</a>.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import "../assets/styles/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ userId: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userId || !formData.password) {
        setError('Both fields are required');
        return;
      }
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://lenz-backend.onrender.com/api/auth/login",
        formData
      );
      login(response.data.token, response.data.user); // Update AuthContext
      navigate("/dashboard"); // Navigate to the dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      setTimeout(() => setError(""), 5000); // Clear error after 5 seconds
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="userId"
          name="userId"
          placeholder="User ID"
          value={formData.userId}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="login-button" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;

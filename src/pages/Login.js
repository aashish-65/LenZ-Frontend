import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";

import {
  AccountCircle,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

const Login = () => {
  const [formData, setFormData] = useState({ userId: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.userId || !formData.password) {
      setError("Both fields are required");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://lenz-backend.onrender.com/api/auth/login",
        formData
      );
      login(response.data.token, response.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickShowPassword = (field) => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to right, #007bff, #6610f2)",
        padding: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 400,
          padding: 4,
          borderRadius: 3,
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
          animation: "fadeIn 1s ease-out",
          background: "white",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#333" }}
        >
          Welcome Back!
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ color: "#555", marginBottom: 3 }}
        >
          Log in to continue to your dashboard.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="User ID"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
            InputProps={{
              style: { borderRadius: "8px" },
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
            InputProps={{
              style: { borderRadius: "8px" },
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleClickShowPassword()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              padding: 1.5,
              fontSize: "16px",
              textTransform: "none",
              marginTop: 3,
              borderRadius: "8px",
              background:
                "linear-gradient(90deg, rgba(0,123,255,1) 0%, rgba(102,16,242,1) 100%)",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              "&:hover": {
                background:
                  "linear-gradient(90deg, rgba(0,123,255,0.9) 0%, rgba(102,16,242,0.9) 100%)",
              },
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Login"
            )}
          </Button>
        </form>
        {error && (
          <Typography
            variant="body2"
            sx={{
              color: "#d32f2f",
              marginTop: 2,
              textAlign: "center",
              animation: "fadeIn 0.5s ease-out",
            }}
          >
            {error}
          </Typography>
        )}
        <Typography
          variant="body2"
          align="center"
          sx={{ color: "#777", marginTop: 2 }}
        >
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{
              color: "#007bff",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Sign up
          </span>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;

import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper,
  CircularProgress,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  AccountCircle,
  Email,
  Phone,
  Lock,
  Business,
  Home,
  LocationCity,
  LocationOn,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "+91",
    alternatePhone: "+91",
    password: "",
    plan: "",
    shopName: "",
    address: {
      line1: "",
      line2: "",
      landmark: "",
      city: "",
      state: "",
      pinCode: "",
    },
  });

  const [userId, setUserId] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const validate = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required.";
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Enter a valid email.";
        break;
      case "phone":
      case "alternatePhone":
        if (!/^\+91\d{10}$/.test(value))
          error = "Enter a valid 10-digit phone number.";
        if (name === "alternatePhone" && value === formData.phone)
          error = "Alternate phone number cannot be the same as phone number.";
        break;
      case "password":
        if (value.length < 8 || value.length > 13)
          error += "Password must be 8-13 characters long. ";
        if (!/[A-Z]/.test(value))
          error += " Password must contain at least one uppercase letter.";
        if (!/[0-9]/.test(value))
          error += "Password must contain at least one number. ";
        if (!/[!@#$%^&*]/.test(value))
          error += "Password must contain at least one special character.";
        break;
      case "plan":
        if (!value) error = "Please select a plan.";
        break;
      case "address.pinCode":
        if (!/^\d{6}$/.test(value)) error = "Pin code must be 6 digits.";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
      setErrors((prev) => ({
        ...prev,
        [name]: validate(name, value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors((prev) => ({
        ...prev,
        [name]: validate(name, value),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Final validation before submission
    const newErrors = {};
    for (const key in formData) {
      if (typeof formData[key] === "object") {
        for (const subKey in formData[key]) {
          const fieldName = `address.${subKey}`;
          newErrors[fieldName] = validate(fieldName, formData[key][subKey]);
        }
      } else {
        newErrors[key] = validate(key, formData[key]);
      }
    }

    setErrors(newErrors);

    // Stop submission if there are errors
    if (Object.values(newErrors).some((error) => error)) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://lenz-backend.onrender.com/api/auth/signup",
        formData
      );
      setUserId(response.data.userId);
      setApiError(""); // Clear any API error
    } catch (err) {
      setApiError(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = (field) => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 700,
        margin: "50px auto",
        padding: 4,
        borderRadius: 3,
        backgroundColor: "#f9f9f9",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: "#333", fontWeight: "bold" }}
      >
        Sign Up for LenZ
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        sx={{ color: "#555", marginBottom: 3 }}
      >
        Join our platform to manage your shop efficiently!
      </Typography>

      {userId ? (
        <Box
          sx={{
            textAlign: "center",
            padding: 2,
            backgroundColor: "#dff0d8",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ color: "#3c763d", marginBottom: 1 }}>
            Signup Successful!
          </Typography>
          <Typography variant="body1" sx={{ color: "#3c763d" }}>
            Your Unique ID: <strong>{userId}</strong>
          </Typography>
        </Box>
      ) : (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Basic Information */}
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                name="name"
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                helperText={errors.name}
                error={!!errors.name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email Address"
                name="email"
                type="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
                helperText={errors.email}
                error={!!errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number (+91)"
                name="phone"
                type="tel"
                variant="outlined"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                required
                helperText={errors.phone}
                error={!!errors.phone}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Alternate Phone (+91)"
                name="alternatePhone"
                type="tel"
                variant="outlined"
                value={formData.alternatePhone}
                onChange={handleChange}
                fullWidth
                helperText={errors.alternatePhone}
                error={!!errors.alternatePhone}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                required
                helperText={errors.password}
                error={!!errors.password}
                InputProps={{
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
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Shop Name"
                name="shopName"
                variant="outlined"
                value={formData.shopName}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Business />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Address Section */}
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{ color: "#333", fontWeight: "bold", marginTop: 2 }}
              >
                Address Details
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address Line 1"
                name="address.line1"
                variant="outlined"
                value={formData.address.line1}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Home />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address Line 2"
                name="address.line2"
                variant="outlined"
                value={formData.address.line2}
                onChange={handleChange}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Home />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Landmark"
                name="address.landmark"
                variant="outlined"
                value={formData.address.landmark}
                onChange={handleChange}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                name="address.city"
                variant="outlined"
                value={formData.address.city}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationCity />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="State"
                name="address.state"
                variant="outlined"
                value={formData.address.state}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Pin Code"
                name="address.pinCode"
                variant="outlined"
                value={formData.address.pinCode}
                onChange={handleChange}
                fullWidth
                required
                helperText={errors["address.pinCode"]}
                error={!!errors["address.pinCode"]}
              />
            </Grid>

            {/* Plan and Submit */}
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Plan</InputLabel>
                <Select
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                  variant="outlined"
                  label="Plan"
                >
                  <MenuItem value="Trial">Trial</MenuItem>
                  <MenuItem value="400">₹400 - Basic Plan</MenuItem>
                  <MenuItem value="3000">₹3000 - Standard Plan</MenuItem>
                  <MenuItem value="5000">₹5000 - Premium Plan</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              padding: 1.5,
              fontSize: "16px",
              textTransform: "none",
              marginTop: 3,
              backgroundColor: "#007bff",
              "&:hover": { backgroundColor: "#0056b3" },
            }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
      )}

      {apiError && (
        <Typography
          sx={{ color: "#d32f2f", marginTop: 2, textAlign: "center" }}
          variant="body2"
        >
          {apiError}
        </Typography>
      )}
    </Paper>
  );
};

export default Signup;

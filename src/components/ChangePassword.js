import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff, VpnKey, Lock } from "@mui/icons-material";

const ChangePassword = ({ requestOTP, otpVerified, validate }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({});
  const [pendingUpdate, setPendingUpdate] = useState(false); // Track pending update

  const handleChangePassword = useCallback(
    async (e) => {
      if (e && e.preventDefault) e.preventDefault();

      // Validate inputs
      if (!oldPassword || !newPassword || !confirmPassword) {
        setError("All fields are required.");
        return;
      }

      // Validate new password
      const passwordError = validate("password", newPassword);
      if (passwordError) {
        setError(passwordError);
        return;
      }

      if (newPassword !== confirmPassword) {
        setError("New password and confirm password do not match.");
        return;
      }

      // If OTP is not verified, request OTP and set pending update
      if (!otpVerified) {
        setPendingUpdate(true); // Mark update as pending
        await requestOTP();
        return;
      }

      // Proceed with password change
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        const { data } = await axios.post(
          "https://lenz-backend.onrender.com/api/profile/change-password",
          { oldPassword, newPassword },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccess(data.message || "Password updated successfully!");
        setError("");
        setLoading(false);
        toast.success("Password updated successfully!");
        setPendingUpdate(false); // Reset pending update
      } catch (err) {
        setError(err.response?.data?.error || "Failed to update password.");
        setSuccess("");
        setLoading(false);
      }
    },
    [oldPassword, newPassword, confirmPassword, otpVerified, requestOTP, validate]
  );

  // Automatically trigger handleChangePassword when OTP is verified
  useEffect(() => {
    if (otpVerified && pendingUpdate) {
      handleChangePassword();
    }
  }, [otpVerified, pendingUpdate, handleChangePassword]);

  const handleClickShowPassword = (field) => {
    switch (field) {
      case "oldPassword":
        setShowOldPassword((prev) => !prev);
        break;
      case "newPassword":
        setShowNewPassword((prev) => !prev);
        break;
      case "confirmPassword":
        setShowConfirmPassword((prev) => !prev);
        break;
      default:
        break;
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleChangePassword}
      sx={{
        backgroundColor: "#fff",
        p: 3,
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h5" mb={3} color="primary">
        Change Password
      </Typography>
      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}
      {success && (
        <Typography color="success.main" mb={2}>
          {success}
        </Typography>
      )}
      <Grid container spacing={2}>
        {/* Old Password */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Old Password"
            type={showOldPassword ? "text" : "password"}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKey color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleClickShowPassword("oldPassword")}
                    edge="end"
                  >
                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* New Password */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              const error = validate("password", e.target.value);
              setErrors((prevErrors) => ({
                ...prevErrors,
                newPassword: error,
              }));
            }}
            error={!!errors.newPassword}
            helperText={errors.newPassword}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleClickShowPassword("newPassword")}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Confirm Password */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Confirm New Password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleClickShowPassword("confirmPassword")}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>

      {/* Update Button */}
      <Box textAlign="center" mt={3}>
        <Button variant="contained" color="primary" type="submit" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Update Password"}
        </Button>
      </Box>
    </Box>
  );
};

export default ChangePassword;
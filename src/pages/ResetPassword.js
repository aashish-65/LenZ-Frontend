import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Paper,
  InputAdornment,
  IconButton,
  useMediaQuery,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  LockReset,
  Lock,
  Visibility,
  VisibilityOff,
  CheckCircleOutline,
  ErrorOutline,
  Check,
  Close,
} from "@mui/icons-material";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState({
    length: true,
    uppercase: true,
    number: true,
    special: true,
    match: false,
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const validatePassword = (password) => {
    const errors = {
      length: !(password.length >= 8 && password.length <= 13),
      uppercase: !/[A-Z]/.test(password),
      number: !/[0-9]/.test(password),
      special: !/[!@#$%^&*]/.test(password),
      match: confirmPassword !== "" && password !== confirmPassword,
    };
    
    setPasswordErrors(errors);
  };

  const handlePasswordChange = (e) => {
    const newValue = e.target.value;
    setNewPassword(newValue);
    validatePassword(newValue);
  };

  const handleConfirmPasswordChange = (e) => {
    const newValue = e.target.value;
    setConfirmPassword(newValue);
    setPasswordErrors({
      ...passwordErrors,
      match: newValue !== "" && newPassword !== newValue,
    });
  };

  const isFormValid = () => {
    return (
      !passwordErrors.length &&
      !passwordErrors.uppercase &&
      !passwordErrors.number &&
      !passwordErrors.special &&
      !passwordErrors.match &&
      confirmPassword !== ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      return;
    }
    
    setIsLoading(true);

    try {
      await axios.post("https://lenz-backend.onrender.com/api/auth/reset-password", {
        token,
        newPassword,
      });
      setMessage("Password reset successfully. You will be redirected to login.");
      setTimeout(() => navigate("/login"), 3000); // Redirect to login after 3 seconds
    } catch (error) {
      setMessage(
        error.response?.data?.error || "Failed to reset password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 10,
      },
    },
  };

  return (
    <Box
      component={motion.div}
      initial="initial"
      animate="animate"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: isMobile ? 2 : 4,
      }}
    >
      <Paper
        component={motion.div}
        variants={formVariants}
        initial="hidden"
        animate="visible"
        elevation={12}
        sx={{
          width: "100%",
          maxWidth: 450,
          padding: isMobile ? 3 : 4,
          borderRadius: 3,
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(15px)",
          position: "relative",
          zIndex: 10,
        }}
      >
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant={isMobile ? "h5" : "h4"}
            align="center"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "#333",
              background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: 2,
            }}
          >
            Reset Your Password
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            sx={{ color: "#555", marginBottom: 3 }}
          >
            Enter your new password below
          </Typography>
        </motion.div>
        
        <form onSubmit={handleSubmit}>
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <TextField
              label="New Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              value={newPassword}
              onChange={handlePasswordChange}
              required
              variant="outlined"
              InputProps={{
                style: { borderRadius: "12px" },
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </motion.div>

          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <TextField
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              variant="outlined"
              InputProps={{
                style: { borderRadius: "12px" },
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                      size="small"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Paper
              elevation={0}
              sx={{
                backgroundColor: "rgba(0, 0, 0, 0.03)",
                borderRadius: 2,
                padding: 2,
                marginTop: 2,
                marginBottom: 2,
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                Password Requirements:
              </Typography>
              <List dense disablePadding>
                <ListItem disableGutters sx={{ padding: 0, margin: 0 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    {!passwordErrors.length ? (
                      <Check fontSize="small" sx={{ color: "green" }} />
                    ) : (
                      <Close fontSize="small" sx={{ color: "red" }} />
                    )}
                  </ListItemIcon>
                  <ListItemText primary="8-13 characters long" />
                </ListItem>
                <ListItem disableGutters sx={{ padding: 0, margin: 0 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    {!passwordErrors.uppercase ? (
                      <Check fontSize="small" sx={{ color: "green" }} />
                    ) : (
                      <Close fontSize="small" sx={{ color: "red" }} />
                    )}
                  </ListItemIcon>
                  <ListItemText primary="At least one uppercase letter" />
                </ListItem>
                <ListItem disableGutters sx={{ padding: 0, margin: 0 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    {!passwordErrors.number ? (
                      <Check fontSize="small" sx={{ color: "green" }} />
                    ) : (
                      <Close fontSize="small" sx={{ color: "red" }} />
                    )}
                  </ListItemIcon>
                  <ListItemText primary="At least one number" />
                </ListItem>
                <ListItem disableGutters sx={{ padding: 0, margin: 0 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    {!passwordErrors.special ? (
                      <Check fontSize="small" sx={{ color: "green" }} />
                    ) : (
                      <Close fontSize="small" sx={{ color: "red" }} />
                    )}
                  </ListItemIcon>
                  <ListItemText primary="At least one special character (!@#$%^&*)" />
                </ListItem>
                {confirmPassword && (
                  <ListItem disableGutters sx={{ padding: 0, margin: 0 }}>
                    <ListItemIcon sx={{ minWidth: 30 }}>
                      {!passwordErrors.match ? (
                        <Check fontSize="small" sx={{ color: "green" }} />
                      ) : (
                        <Close fontSize="small" sx={{ color: "red" }} />
                      )}
                    </ListItemIcon>
                    <ListItemText primary="Passwords match" />
                  </ListItem>
                )}
              </List>
            </Paper>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Button
              type="submit"
              variant="contained"
              fullWidth
              startIcon={<LockReset />}
              sx={{
                padding: 1.5,
                fontSize: "16px",
                textTransform: "none",
                marginTop: 2,
                borderRadius: "12px",
                background: isFormValid() 
                  ? "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)"
                  : "rgba(0, 0, 0, 0.12)",
                color: isFormValid() ? "white" : "rgba(0, 0, 0, 0.26)",
                boxShadow: isFormValid() ? "0 6px 15px rgba(0, 0, 0, 0.2)" : "none",
                transition: "all 0.3s ease",
                "&:hover": isFormValid() ? {
                  transform: "translateY(-5px)",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                } : {},
              }}
              disabled={!isFormValid() || isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Reset Password"
              )}
            </Button>
          </motion.div>
        </form>

        {message && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: message.includes("successfully")
                  ? "rgba(76, 175, 80, 0.1)"
                  : "rgba(211, 47, 47, 0.1)",
                borderRadius: 2,
                padding: 1.5,
                marginTop: 2,
              }}
            >
              {message.includes("successfully") ? (
                <CheckCircleOutline sx={{ color: "#4caf50", marginRight: 1 }} />
              ) : (
                <ErrorOutline sx={{ color: "#d32f2f", marginRight: 1 }} />
              )}
              <Typography
                variant="body2"
                sx={{
                  color: message.includes("successfully") ? "#4caf50" : "#d32f2f",
                }}
              >
                {message}
              </Typography>
            </Box>
          </motion.div>
        )}

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Typography
            variant="body2"
            align="center"
            sx={{ color: "#777", marginTop: 2 }}
          >
            Remember your password?{" "}
            <Button
              onClick={() => navigate("/login")}
              sx={{
                textTransform: "none",
                color: "#6a11cb",
                "&:hover": {
                  backgroundColor: "transparent",
                  textDecoration: "underline",
                },
              }}
            >
              Login
            </Button>
          </Typography>
        </motion.div>
      </Paper>
    </Box>
  );
};

export default ResetPassword;
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  // useTheme
} from "@mui/material";

import {
  AccountCircle,
  Lock,
  Visibility,
  VisibilityOff,
  LoginRounded,
  AppRegistrationRounded,
  ErrorOutline,
  CheckCircleOutline,
  Email,
} from "@mui/icons-material";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [showPassword, setShowPassword] = useState(false);

  // Forgot Password Modal State
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordError, setForgotPasswordError] = useState("");
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
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
      setError(err.response?.data?.error || "Login failed");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  // Forgot Password Functions
  const handleForgotPasswordClick = () => {
    setIsForgotPasswordOpen(true);
  };

  const handleForgotPasswordClose = () => {
    setIsForgotPasswordOpen(false);
    setForgotPasswordEmail("");
    setForgotPasswordError("");
    setForgotPasswordSuccess("");
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();

    if (!forgotPasswordEmail) {
      setForgotPasswordError("Please enter your email address.");
      return;
    }

    try {
      await axios.post("https://lenz-backend.onrender.com/api/auth/forgot-password", {
        email: forgotPasswordEmail,
      });
      setForgotPasswordSuccess("Password reset email sent. Check your inbox.");
      setForgotPasswordError("");
    } catch (err) {
      setForgotPasswordError(
        err.response?.data?.error || "Failed to send reset email."
      );
      setForgotPasswordSuccess("");
    }
  };

  // const backgroundVariants = {
  //   initial: {
  //     background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
  //     opacity: 0.7
  //   },
  //   animate: {
  //     background: [
  //       'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
  //       'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)',
  //       'linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)'
  //     ],
  //     opacity: [0.7, 0.8, 0.7],
  //     transition: {
  //       duration: 10,
  //       repeat: Infinity,
  //       repeatType: 'reverse'
  //     }
  //   }
  // };

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
      // variants={backgroundVariants}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        padding: 2,
      }}
    >
      {/* Animated Background Elements */}
      {/* <Box
        sx={{
          position: 'absolute',
          top: -50,
          left: -50,
          width: 200,
          height: 200,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          zIndex: 0
        }}
        component={motion.div}
        animate={{
          scale: [1, 1.2, 1],
          transition: {
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse'
          }
        }}
      /> */}

      <Paper
        component={motion.div}
        variants={formVariants}
        initial="hidden"
        animate="visible"
        elevation={12}
        sx={{
          width: "100%",
          maxWidth: 450,
          padding: 4,
          borderRadius: 3,
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(15px)",
          position: "relative",
          zIndex: 10,
        }}
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "#333",
              background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Welcome Back!
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            sx={{ color: "#555", marginBottom: 3 }}
          >
            Log in to continue to your dashboard
          </Typography>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
              required
              autoComplete="username"
              InputProps={{
                style: { borderRadius: "12px" },
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
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
              autoComplete="current-password"
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
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button
              type="submit"
              variant="contained"
              fullWidth
              startIcon={<LoginRounded />}
              sx={{
                padding: 1.5,
                fontSize: "16px",
                textTransform: "none",
                marginTop: 3,
                borderRadius: "12px",
                background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
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
          </motion.div>
        </form>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#d32f2f",
                marginTop: 2,
                textAlign: "center",
              }}
            >
              {error}
            </Typography>
          </motion.div>
        )}

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Typography
            variant="body2"
            align="center"
            sx={{ color: "#777", marginTop: 2 }}
          >
            Don't have an account?{" "}
            <Button
              onClick={() => navigate("/signup")}
              endIcon={<AppRegistrationRounded />}
              sx={{
                textTransform: "none",
                color: "#6a11cb",
                "&:hover": {
                  backgroundColor: "transparent",
                  textDecoration: "underline",
                },
              }}
            >
              Sign up
            </Button>
          </Typography>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Typography
            variant="body2"
            align="center"
            sx={{ color: "#777", marginTop: 2 }}
          >
            Forgot your password?{" "}
            <Button
              onClick={handleForgotPasswordClick}
              sx={{
                textTransform: "none",
                color: "#6a11cb",
                "&:hover": {
                  backgroundColor: "transparent",
                  textDecoration: "underline",
                },
              }}
            >
              Reset it
            </Button>
          </Typography>
        </motion.div>
      </Paper>
      {/* Forgot Password Dialog */}
      <Dialog
        open={isForgotPasswordOpen}
        onClose={handleForgotPasswordClose}
        maxWidth="xs"
        fullWidth
        TransitionComponent={motion.div}
        PaperComponent={motion.div}
        PaperProps={{
          initial: { y: -50, opacity: 0 },
          animate: { y: 180, opacity: 1 },
          transition: { type: "spring", stiffness: 100, damping: 10 },
          style: {
            borderRadius: 16,
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(15px)",
            overflow: "hidden",
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
            padding: 2,
          }}
        >
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <DialogTitle
              sx={{
                color: "white",
                fontWeight: "bold",
                padding: "8px 8px 16px 8px",
                fontSize: "1.5rem",
              }}
            >
              Reset Your Password
            </DialogTitle>
          </motion.div>
        </Box>

        <DialogContent sx={{ padding: 3, paddingTop: 3 }}>
          <form onSubmit={handleForgotPasswordSubmit}>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <Typography
                variant="body1"
                sx={{
                  marginBottom: 2,
                  color: "#555",
                  lineHeight: 1.6,
                }}
              >
                Enter your email address below and we'll send you instructions
                to reset your password.
              </Typography>
            </motion.div>

            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <TextField
                label="Email Address"
                type="email"
                fullWidth
                margin="normal"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                required
                variant="outlined"
                disabled={forgotPasswordSuccess !== ""}
                InputProps={{
                  style: { borderRadius: "12px" },
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </motion.div>

            {forgotPasswordError && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "rgba(211, 47, 47, 0.1)",
                    borderRadius: 2,
                    padding: 1.5,
                    marginTop: 2,
                  }}
                >
                  <Box sx={{ color: "#d32f2f", marginRight: 1 }}>
                    <motion.div
                      animate={{ rotate: [0, 5, 0, -5, 0] }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <ErrorOutline />
                    </motion.div>
                  </Box>
                  <Typography variant="body2" sx={{ color: "#d32f2f" }}>
                    {forgotPasswordError}
                  </Typography>
                </Box>
              </motion.div>
            )}

            {forgotPasswordSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "rgba(76, 175, 80, 0.1)",
                    borderRadius: 2,
                    padding: 1.5,
                    marginTop: 2,
                  }}
                >
                  <Box sx={{ color: "#4caf50", marginRight: 1 }}>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <CheckCircleOutline />
                    </motion.div>
                  </Box>
                  <Typography variant="body2" sx={{ color: "#4caf50" }}>
                    {forgotPasswordSuccess}
                  </Typography>
                </Box>
              </motion.div>
            )}
          </form>
        </DialogContent>

        <DialogActions sx={{ padding: 3, paddingTop: 1 }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            style={{
              display: "flex",
              gap: "12px",
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <Button
              onClick={handleForgotPasswordClose}
              variant="outlined"
              sx={{
                borderRadius: "12px",
                padding: "8px 16px",
                textTransform: "none",
                borderColor: "#6a11cb",
                color: "#6a11cb",
                "&:hover": {
                  borderColor: "#2575fc",
                  backgroundColor: "rgba(106, 17, 203, 0.05)",
                },
              }}
            >
              {forgotPasswordSuccess ? "Close" : "Cancel"}
            </Button>

            <Button
              onClick={handleForgotPasswordSubmit}
              color="primary"
              variant="contained"
              disabled={forgotPasswordSuccess !== ""}
              sx={{
                borderRadius: "12px",
                padding: "8px 20px",
                textTransform: "none",
                background: forgotPasswordSuccess
                  ? "rgba(106, 17, 203, 0.5)"
                  : "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
                boxShadow: forgotPasswordSuccess
                  ? "none"
                  : "0 4px 10px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: forgotPasswordSuccess
                    ? "none"
                    : "translateY(-2px)",
                  boxShadow: forgotPasswordSuccess
                    ? "none"
                    : "0 6px 15px rgba(0, 0, 0, 0.3)",
                },
              }}
              startIcon={<Email />}
            >
              Send Reset Link
            </Button>
          </motion.div>
        </DialogActions>
      </Dialog>

      {/* Animated Background Elements */}
      {/* <Box
        sx={{
          position: 'absolute',
          bottom: -50,
          right: -50,
          width: 200,
          height: 200,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          zIndex: 0
        }}
        component={motion.div}
        animate={{
          scale: [1, 1.2, 1],
          transition: {
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse'
          }
        }}
      /> */}
    </Box>
  );
};

export default Login;

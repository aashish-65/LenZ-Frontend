import React, { useState } from "react";
import axios from "axios";
import {
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
  Container,
  Box,
  useMediaQuery,
  useTheme,
  Divider,
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
  CheckCircle,
  LockOpen,
  ErrorOutline,
  PermIdentity,
  Key,
  PinDrop,
  Public,
} from "@mui/icons-material";
import { ThemeProvider } from "@mui/material/styles";
import SignupSuccess from "./SignupSuccess";

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
    adminId: "",
    authToken: "",
  });

  const [userId, setUserId] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyButton, setShowVerifyButton] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [otpVerified, setOtpVerified] = useState(false);

  const validate = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required.";
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Enter a valid email.";
        }
        break;
      case "phone":
        if (!/^\+91\d{10}$/.test(value))
          error = "Enter a valid 10-digit phone number with +91.";
        break;
      case "alternatePhone":
        // const sanitizedValue = value.replace(/\s+/g, "");
        // const phoneWithoutPrefix = sanitizedValue.replace(/^\+91/, "");
        // if (phoneWithoutPrefix && !/^\+91\d{10}$/.test(phoneWithoutPrefix))
        if (!/^\+91\d{10}$/.test(value))
          error = "Enter a valid 10-digit phone number with +91.";
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
      case "adminId":
        if (!/^\d{6}$/.test(value)) error = "Admin ID must be 6 digits.";
        if (!value)
          error = "Please Enter the Admin LenZ Id! Contact Admin to get it.";
        break;
      case "authToken":
        if (!/^\d{6}$/.test(value)) error = "Auth Key must be 6 digits.";
        if (!value) error = "Please Enter the Admin Auth Token.";
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
    if (name === "email" && !validate(name, value)) {
      setShowVerifyButton(true);
    } else {
      setShowVerifyButton(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!otpVerified) {
      setApiError("Please verify your email with OTP first.");
      setLoading(false);
      return;
    }

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

    if (Object.values(newErrors).some((error) => error)) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://lenz-backend.onrender.com/api/auth/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "lenz-api-key": process.env.REACT_APP_AUTHORIZED_API_KEY,
          },
        }
      );
      setUserId(response.data.userId);
      setApiError("");
    } catch (err) {
      setApiError(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleVerifyEmail = async () => {
    try {
      setLoading(true);
      await axios.post(
        "https://lenz-backend.onrender.com/api/otp/request-otp",
        {
          email: formData.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "lenz-api-key": process.env.REACT_APP_AUTHORIZED_API_KEY,
          },
        }
      );
      setOtpSent(true);
      setApiError("");
    } catch (err) {
      setApiError(err.response?.data?.error || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://lenz-backend.onrender.com/api/otp/verify-otp",
        {
          email: formData.email,
          otp,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "lenz-api-key": process.env.REACT_APP_AUTHORIZED_API_KEY,
          },
        }
      );
      if (response.data.confirmation) {
        setOtpError("");
        setOtpVerified(true);
        setApiError("");
      } else {
        setOtpError("Invalid OTP");
      }
    } catch (err) {
      setOtpError(err.response?.data?.error || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendDisabled(true);
    await handleVerifyEmail();
    let cooldown = 10;
    setResendCooldown(cooldown);
    const interval = setInterval(() => {
      cooldown -= 1;
      setResendCooldown(cooldown);
      if (cooldown === 0) {
        clearInterval(interval);
        setResendDisabled(false);
      }
    }, 1000);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f4f6f9 0%, #e9ecef 100%)",
          py: { xs: 0, sm: 4 },
          px: { xs: 0, sm: 2 },
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            px: { xs: 0, sm: 2 },
            py: { xs: 0, sm: 2 },
          }}
        >
          <Paper
            elevation={isMobile ? 0 : 12}
            sx={{
              borderRadius: { xs: 0, sm: 4 },
              overflow: "hidden",
              position: "relative",
              maxHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "5px",
                background: "linear-gradient(135deg, #1e88e5 0%, #2196f3 100%)",
              },
            }}
          >
            <Grid
              container
              sx={{
                flexGrow: 1,
                height: "100%",
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              {!isMobile && (
                <Grid
                  item
                  xs={5}
                  sx={{
                    background:
                      "linear-gradient(135deg, #1e88e5 0%, #2196f3 100%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    p: 4,
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h4" gutterBottom>
                    Welcome to LenZ
                  </Typography>
                  <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
                    Revolutionize Your Shop Management
                  </Typography>
                </Grid>
              )}

              <Grid
                item
                xs={12}
                sm={isMobile ? 12 : 7}
                sx={{
                  p: { xs: 3, sm: 5 },
                  backgroundColor: "background.paper",
                  overflowY: "auto",
                  maxHeight: "100vh",
                }}
              >
                <Box sx={{ textAlign: "center", mb: 3, mt: { xs: 4, sm: 0 } }}>
                  {isMobile && (
                    <Box
                      sx={{
                        background:
                          "linear-gradient(135deg, #1e88e5 0%, #2196f3 100%)",
                        color: "white",
                        py: 3,
                        mb: 3,
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="h4" gutterBottom>
                        LenZ SignUp
                      </Typography>
                      <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
                        Revolutionize Your Shop Management
                      </Typography>
                    </Box>
                  )}
                  {/* <Typography
                    variant="h4"
                    color="primary"
                    gutterBottom
                  >
                    Create Your Account
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                  >
                    Join LenZ and streamline your business management
                  </Typography> */}
                </Box>

                {userId ? (
                  <SignupSuccess userId={userId} />
                ) : (
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
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
                                <AccountCircle color="action" />
                              </InputAdornment>
                            ),
                            sx: {
                              borderRadius: 2,
                              "& input": {
                                padding: "14px 14px 14px 0",
                              },
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          label="Email Address"
                          name="email"
                          type="email"
                          variant="outlined"
                          value={formData.email}
                          onChange={handleChange}
                          fullWidth
                          required
                          disabled={otpSent || otpVerified}
                          helperText={errors.email}
                          error={!!errors.email}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Email color="action" />
                              </InputAdornment>
                            ),
                            endAdornment: otpVerified && (
                              <InputAdornment position="end">
                                <CheckCircle sx={{ color: "green" }} />
                              </InputAdornment>
                            ),
                            sx: {
                              borderRadius: 2,
                              "& input": {
                                padding: "14px 14px 14px 0",
                              },
                            },
                          }}
                        />
                        {showVerifyButton && !otpSent && !otpVerified && (
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleVerifyEmail}
                            disabled={loading}
                            sx={{ mt: 1, borderRadius: 2 }}
                          >
                            Verify Email
                          </Button>
                        )}
                        {otpSent && !otpVerified && (
                          <Box sx={{ mt: 2 }}>
                            <TextField
                              label="Enter OTP"
                              variant="outlined"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                              fullWidth
                              required
                              helperText={otpError}
                              error={!!otpError}
                              InputProps={{
                                sx: {
                                  borderRadius: 2,
                                  "& input": {
                                    padding: "14px 14px 14px 0",
                                  },
                                },
                              }}
                            />
                            <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={handleVerifyOtp}
                                disabled={loading}
                                sx={{ borderRadius: 2 }}
                              >
                                Verify OTP
                              </Button>
                              <Button
                                variant="outlined"
                                color="secondary"
                                onClick={handleResendOtp}
                                disabled={resendDisabled || loading}
                                sx={{ borderRadius: 2 }}
                              >
                                {resendDisabled
                                  ? `Resend OTP in ${resendCooldown}s`
                                  : "Resend OTP"}
                              </Button>
                            </Box>
                          </Box>
                        )}
                      </Grid>

                      <Grid item xs={12}>
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
                                <Phone color="action" />
                              </InputAdornment>
                            ),
                            sx: {
                              borderRadius: 2,
                              "& input": {
                                padding: "14px 14px 14px 0",
                              },
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
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
                                <Phone color="action" />
                              </InputAdornment>
                            ),
                            sx: {
                              borderRadius: 2,
                              "& input": {
                                padding: "14px 14px 14px 0",
                              },
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
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
                                <Lock color="action" />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={handleClickShowPassword}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                            sx: {
                              borderRadius: 2,
                              "& input": {
                                padding: "14px 14px 14px 0",
                              },
                            },
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
                                <Business color="action" />
                              </InputAdornment>
                            ),
                            sx: {
                              borderRadius: 2,
                              "& input": {
                                padding: "14px 14px 14px 0",
                              },
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Typography
                          variant="h6"
                          color="primary"
                          sx={{ mb: 2, fontWeight: "bold" }}
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
                                <Home color="action" />
                              </InputAdornment>
                            ),
                            sx: {
                              borderRadius: 2,
                              "& input": {
                                padding: "14px 14px 14px 0",
                              },
                            },
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
                                <Home color="action" />
                              </InputAdornment>
                            ),
                            sx: {
                              borderRadius: 2,
                              "& input": {
                                padding: "14px 14px 14px 0",
                              },
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
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
                                <LocationOn color="action" />
                              </InputAdornment>
                            ),
                            sx: {
                              borderRadius: 2,
                              "& input": {
                                padding: "14px 14px 14px 0",
                              },
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
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
                                <LocationCity color="action" />
                              </InputAdornment>
                            ),
                            sx: {
                              borderRadius: 2,
                              "& input": {
                                padding: "14px 14px 14px 0",
                              },
                            },
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
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Public color="action" />
                              </InputAdornment>
                            ),
                            sx: {
                              borderRadius: 2,
                              "& input": {
                                padding: "14px 14px 14px 0",
                              },
                            },
                          }}
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
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PinDrop color="action" />
                              </InputAdornment>
                            ),
                            sx: {
                              borderRadius: 2,
                              "& input": {
                                padding: "14px 14px 14px 0",
                              },
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Typography
                          variant="h6"
                          color="primary"
                          sx={{ mb: 2, fontWeight: "bold" }}
                        >
                          Admin Details
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="LenZ Admin ID"
                          name="adminId"
                          variant="outlined"
                          value={formData.adminId}
                          onChange={handleChange}
                          fullWidth
                          required
                          helperText={errors["adminId"]}
                          error={!!errors["adminId"]}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PermIdentity color="action" />
                              </InputAdornment>
                            ),
                            sx: {
                              borderRadius: 2,
                              "& input": {
                                padding: "14px 14px 14px 0",
                              },
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Admin Auth Key"
                          name="authToken"
                          variant="outlined"
                          value={formData.authToken}
                          onChange={handleChange}
                          fullWidth
                          required
                          helperText={errors["authToken"]}
                          error={!!errors["authToken"]}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Key color="action" />
                              </InputAdornment>
                            ),
                            sx: {
                              borderRadius: 2,
                              "& input": {
                                padding: "14px 14px 14px 0",
                              },
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <FormControl fullWidth margin="normal" required>
                          <InputLabel>Plan</InputLabel>
                          <Select
                            name="plan"
                            value={formData.plan}
                            onChange={handleChange}
                            variant="outlined"
                            label="Plan"
                            InputProps={{
                              sx: {
                                borderRadius: 2,
                                "& .MuiSelect-select": {
                                  padding: "14px 14px 14px 0",
                                },
                              },
                            }}
                          >
                            <MenuItem value="Trial">Trial</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>

                    <Divider sx={{ my: 3, borderColor: "rgba(0,0,0,0.1)" }} />

                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      startIcon={!loading && <LockOpen />}
                      sx={{
                        mt: 2,
                        py: 1.5,
                        fontSize: "1rem",
                        borderRadius: 2,
                      }}
                      disabled={loading || !otpVerified}
                    >
                      {loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Sign Up"
                      )}
                    </Button>

                    {apiError && (
                      <Box
                        sx={{
                          mt: 2,
                          p: 2,
                          bgcolor: "error.light",
                          color: "error.contrastText",
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <ErrorOutline sx={{ mr: 1 }} />
                        <Typography variant="body2">{apiError}</Typography>
                      </Box>
                    )}
                  </form>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Signup;

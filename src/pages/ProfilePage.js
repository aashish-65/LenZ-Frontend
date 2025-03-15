import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Typography,
  Button,
  Grid,
  InputAdornment,
  Card,
  CardContent,
  Divider,
  Avatar,
  Tabs,
  Tab,
  TextField,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Paper,
  Skeleton,
} from "@mui/material";
import {
  Edit,
  Lock,
  Person,
  AccountCircle,
  Email,
  Phone,
  Business,
  Home,
  LocationCity,
  LocationOn,
  Visibility,
  VisibilityOff,
  CardMembership,
  AccountBalanceWallet,
  PinDrop,
  VpnKey,
} from "@mui/icons-material";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "+91",
    userId: "",
    alternatePhone: "+91",
    shopName: "",
    address: {
      line1: "",
      line2: "",
      landmark: "",
      city: "",
      state: "",
      pinCode: "",
    },
    plan: "",
    distance: 0,
    creditBalance: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [tab, setTab] = useState(0); // Tabs: 0 - View, 1 - Update, 2 - Password

  // OTP Verification State
  // const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [pendingUpdate, setPendingUpdate] = useState(false);
  const [otpTimer, setOtpTimer] = useState(300); // 5 minutes in seconds
  const [canResendOtp, setCanResendOtp] = useState(true); // Allow resend OTP
  const [resending, setResending] = useState(false);

  // Change Password State
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State for password visibility
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Timer Interval Ref
  const timerInterval = useRef(null);

  const formattedAlternatePhone =
    profileData.alternatePhone?.replace(/\s+/g, "") === "+91"
      ? "N/A"
      : profileData.alternatePhone;

  // Fetch Profile Data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        const { data } = await axios.get(
          "https://lenz-backend.onrender.com/api/profile/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProfileData(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch profile data");
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Validate Input Fields
  const validate = useCallback(
    (name, value) => {
      let sanitizedValue = "";
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
          sanitizedValue = value.replace(/\s+/g, "");
          if (!/^\+91\d{10}$/.test(sanitizedValue))
            error = "Enter a valid 10-digit phone number after +91.";
          break;
        case "alternatePhone":
          sanitizedValue = value.replace(/\s+/g, "");
          const phoneWithoutPrefix = sanitizedValue.replace(/^\+91/, "");
          if (phoneWithoutPrefix && phoneWithoutPrefix.length !== 10)
            error = "Enter a valid 10-digit phone number with +91.";
          if (name === "alternatePhone" && value === profileData.phone)
            error =
              "Alternate phone number cannot be the same as phone number.";
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
        case "address.pinCode":
          if (!/^\d{6}$/.test(value)) error = "Pin code must be 6 digits.";
          break;
        default:
          break;
      }
      return error;
    },
    [profileData.phone]
  );

  // Handle Tab Change
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    setError("");
    setSuccess("");
  };

  // Handle Input Change
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      // Validate field
      const fieldError = validate(name, value);
      setErrors((prevErrors) => ({ ...prevErrors, [name]: fieldError }));

      if (name.startsWith("address.")) {
        const addressKey = name.split(".")[1];
        setProfileData((prevState) => ({
          ...prevState,
          address: { ...prevState.address, [addressKey]: value },
        }));
      } else {
        setProfileData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    },
    [validate]
  );

  // Request OTP
  const requestOTP = useCallback(async () => {
    try {
      const emailError = validate("email", profileData.email);
      if (emailError) {
        setError(emailError);
        return;
      }

      // const token = localStorage.getItem("authToken");
      await axios.post(
        "https://lenz-backend.onrender.com/api/otp/request-otp",
        { email: profileData.email },
        {
          headers: {
            "lenz-api-key": process.env.REACT_APP_AUTHORIZED_API_KEY,
          },
        }
      );
      // setIsOtpSent(true);
      setShowOtpModal(true);
      setError("");
      setOtpTimer(300); // Reset timer to 5 minutes
      setCanResendOtp(false); // Disable resend button temporarily
      setTimeout(() => setCanResendOtp(true), 30000); // Enable resend after 30 seconds
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    }
  }, [profileData.email, validate]);

  // Verify OTP
  const verifyOTP = async () => {
    try {
      // Validate OTP before verification
      if (!otp || otp.length !== 6) {
        setError("Please enter a valid 6-digit OTP.");
        return;
      }
      // const token = localStorage.getItem("authToken");
      await axios.post(
        "https://lenz-backend.onrender.com/api/otp/verify-otp",
        { email: profileData.email, otp },
        {
          headers: {
            "lenz-api-key": process.env.REACT_APP_AUTHORIZED_API_KEY,
          },
        }
      );
      setOtpVerified(true);
      setShowOtpModal(false);
      setError("");
      clearInterval(timerInterval.current);
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    }
  };

  // Handle Update Profile
  const handleUpdate = useCallback(
    async (e) => {
      if (e && e.preventDefault) e.preventDefault();

      // Validate fields
      const newErrors = {};
      for (const [key, value] of Object.entries(profileData)) {
        if (key === "address") {
          for (const [subKey, subValue] of Object.entries(
            profileData.address
          )) {
            const fieldName = `address.${subKey}`;
            newErrors[fieldName] = validate(fieldName, subValue);
          }
        } else {
          newErrors[key] = validate(key, value);
        }
      }
      setErrors(newErrors);

      // Check if any errors exist
      if (Object.values(newErrors).some((error) => error)) {
        setError("Please fix the errors before submitting.");
        return;
      }

      // Request OTP if not verified
      if (!otpVerified) {
        setPendingUpdate(true);
        await requestOTP();
        return;
      }

      // Proceed with profile update
      try {
        // console.log(profileData);
        setLoading(true);
        const token = localStorage.getItem("authToken");
        const { data } = await axios.put(
          "https://lenz-backend.onrender.com/api/profile/",
          profileData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProfileData(data);
        toast.success("Profile updated successfully!");
        setError("");
        setLoading(false);
        setTab(0);
        setOtpVerified(false); // Reset OTP verification
        setPendingUpdate(false);
      } catch (err) {
        setError("Failed to update profile");
        setSuccess("");
        setLoading(false);
      }
    },
    [profileData, otpVerified, requestOTP, validate]
  );

  // Timer for OTP Expiry
  useEffect(() => {
    // let timerInterval;
    if (showOtpModal && otpTimer > 0) {
      timerInterval.current = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timerInterval.current);
  }, [showOtpModal, otpTimer]);

  // Handle Change Password
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
        console.log(token);
        const { data } = await axios.post(
          "https://lenz-backend.onrender.com/api/profile/change-password",
          { oldPassword, newPassword },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccess(data.message || "Password updated successfully!");
        setError("");
        setLoading(false);
        setOtpVerified(false); // Reset OTP verification
        setPendingUpdate(false); // Reset pending update
      } catch (err) {
        setError(err.response?.data?.error || "Failed to update password.");
        setSuccess("");
        setLoading(false);
      }
    },
    [
      oldPassword,
      newPassword,
      confirmPassword,
      otpVerified,
      requestOTP,
      validate,
    ]
  );

  // Handle Resend OTP with Loading Effect
  const handleResendOTP = async () => {
    setResending(true);
    await requestOTP();
    setResending(false);
  };

  // Format OTP Timer (MM:SS)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${minutes}:${sec < 10 ? "0" : ""}${sec}`;
  };

  // Re-trigger update after OTP verification
  useEffect(() => {
    if (otpVerified && pendingUpdate) {
      if (tab === 1) handleUpdate(); // Re-trigger profile update
      if (tab === 2) handleChangePassword(); // Re-trigger password change
    }
  }, [otpVerified, pendingUpdate, handleUpdate, handleChangePassword, tab]);

  // Toggle password visibility
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

  // Skeleton Loader for Profile Details
  const renderSkeleton = () => {
    return (
      <Paper elevation={4} sx={{ p: 4, borderRadius: 2, bgcolor: "#fff" }}>
        <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
          <Skeleton variant="circular" width={100} height={100} />
        </Box>
        <Grid container spacing={3}>
          {/* Shop Name */}
          <Grid item xs={12} sm={6}>
            <Skeleton variant="rectangular" width="100%" height={60} />
          </Grid>
          {/* Unique User ID */}
          <Grid item xs={12} sm={6}>
            <Skeleton variant="rectangular" width="100%" height={60} />
          </Grid>
          {/* Phone */}
          <Grid item xs={12} sm={6}>
            <Skeleton variant="rectangular" width="100%" height={60} />
          </Grid>
          {/* Alternate Phone */}
          <Grid item xs={12} sm={6}>
            <Skeleton variant="rectangular" width="100%" height={60} />
          </Grid>
          {/* Address */}
          <Grid item xs={12}>
            <Skeleton variant="rectangular" width="100%" height={60} />
          </Grid>
          {/* Distance */}
          <Grid item xs={12} sm={4}>
            <Skeleton variant="rectangular" width="100%" height={80} />
          </Grid>
          {/* Plan */}
          <Grid item xs={12} sm={4}>
            <Skeleton variant="rectangular" width="100%" height={80} />
          </Grid>
          {/* Credit Balance */}
          <Grid item xs={12} sm={4}>
            <Skeleton variant="rectangular" width="100%" height={80} />
          </Grid>
        </Grid>
      </Paper>
    );
  };

  if (loading) {
    return renderSkeleton();
  }

  // Reusable Detail Item Component
  const DetailItem = ({ icon, label, value }) => (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      bgcolor="#f9f9f9"
      p={2}
      borderRadius={2}
      boxShadow={1}
    >
      {icon}
      <Box>
        <Typography variant="body2" fontWeight="bold" color="primary.main">
          {label}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {value}
        </Typography>
      </Box>
    </Box>
  );

  // Reusable Box for Uniform Size (Distance, Plan, Credit Balance)
  const DetailBox = ({ icon, label, value }) => (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bgcolor="#f9f9f9"
      p={3}
      borderRadius={2}
      boxShadow={1}
      minWidth={100} // Ensures consistent width
      minHeight={80} // Ensures consistent height
      textAlign="center"
    >
      {icon}
      <Typography variant="body2" fontWeight="bold" color="primary.main" mt={1}>
        {label}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {value}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      {/* OTP Verification Modal */}
      <Dialog
        open={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        sx={{ "& .MuiPaper-root": { borderRadius: 3, p: 2, minWidth: 350 } }}
      >
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
          🔐 Verify OTP
        </DialogTitle>

        <DialogContent>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Enter the OTP sent to your registered Email.
          </Typography>

          {/* OTP Input Field */}
          <TextField
            fullWidth
            label="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            sx={{ mt: 2 }}
            error={!!error}
            helperText={error}
            inputProps={{ maxLength: 6 }}
          />

          {/* OTP Expiry Timer */}
          <Box textAlign="center" mt={2}>
            <Typography
              variant="body2"
              color={otpTimer > 10 ? "text.secondary" : "error"}
            >
              ⏳ OTP expires in: <strong>{formatTime(otpTimer)}</strong>
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button onClick={() => setShowOtpModal(false)} color="error">
            Cancel
          </Button>
          <Button onClick={verifyOTP} variant="contained" color="primary">
            Verify
          </Button>
          <Button
            onClick={handleResendOTP}
            disabled={!canResendOtp || resending}
            variant="outlined"
            color="secondary"
            startIcon={resending ? <CircularProgress size={18} /> : null}
          >
            {resending ? "Resending..." : "Resend OTP"}
          </Button>
        </DialogActions>
      </Dialog>

      <Card
        sx={{
          mb: 3,
          borderRadius: 4,
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
          mx: "auto",
          textAlign: "center",
          p: 3,
          bgcolor: "background.default",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.03)",
          },
        }}
      >
        <CardContent>
          {/* Avatar with Glow & Hover Effect */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <Avatar
              sx={{
                width: 100,
                height: 100,
                background:
                  "linear-gradient(135deg, #1976D2, #64B5F6, #42A5F5)",
                color: "white",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.1)",
                  boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.25)",
                },
              }}
            >
              <Person fontSize="large" />
            </Avatar>
          </Box>

          {/* User Name */}
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {profileData.name}
          </Typography>

          {/* Email */}
          <Typography variant="body1" color="text.secondary">
            {profileData.email}
          </Typography>

          {/* Subtle Divider */}
          <Box
            sx={{
              mt: 2,
              height: 3,
              width: "60%",
              mx: "auto",
              bgcolor: "primary.light",
              borderRadius: 2,
            }}
          />
        </CardContent>
      </Card>

      <Card
        sx={{
          mx: "auto",
          p: 2,
          borderRadius: 4,
          boxShadow: 3,
          bgcolor: "background.paper",
        }}
      >
        {/* Tabs Section */}
        <Tabs
          value={tab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "15px",
              minHeight: 50,
              transition: "0.3s",
              borderRadius: 2,
              "&:hover": {
                bgcolor: "action.hover",
              },
            },
            "& .MuiTabs-indicator": {
              height: 4,
              borderRadius: 2,
              bgcolor: "primary.main",
            },
          }}
        >
          <Tab label="View Profile" icon={<Person />} iconPosition="start" />
          <Tab label="Update Profile" icon={<Edit />} iconPosition="start" />
          <Tab label="Change Password" icon={<Lock />} iconPosition="start" />
        </Tabs>

        <Divider />
        <CardContent sx={{ p: 1, mt: 1 }}>
          <Box
            sx={{
              opacity: 0,
              transform: "translateY(10px)",
              animation: "fadeIn 0.3s ease-in-out forwards",
              "@keyframes fadeIn": {
                "100%": { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            {tab === 0 && (
              <Paper
                elevation={4}
                sx={{ p: 4, borderRadius: 2, bgcolor: "#fff" }}
              >
                {/* Profile Header */}
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mb={3}
                  gap={1}
                >
                  <AccountCircle sx={{ fontSize: 32, color: "primary.main" }} />
                  <Typography variant="h5" color="primary">
                    Profile Details
                  </Typography>
                </Box>

                <Grid container spacing={3}>
                  {/* Shop Name */}
                  <Grid item xs={12} sm={6}>
                    <DetailItem
                      icon={<Business sx={{ color: "#ff9800" }} />}
                      label="Shop Name"
                      value={profileData.shopName}
                    />
                  </Grid>

                  {/* Unique User ID */}
                  <Grid item xs={12} sm={6}>
                    <DetailItem
                      icon={<AccountCircle sx={{ color: "#6a11cb" }} />}
                      label="Unique User ID"
                      value={profileData.userId}
                    />
                  </Grid>

                  {/* Phone */}
                  <Grid item xs={12} sm={6}>
                    <DetailItem
                      icon={<Phone sx={{ color: "#2575fc" }} />}
                      label="Phone"
                      value={profileData.phone}
                    />
                  </Grid>

                  {/* Alternate Phone */}
                  <Grid item xs={12} sm={6}>
                    <DetailItem
                      icon={<Phone sx={{ color: "#2575fc" }} />}
                      label="Alternate Phone"
                      value={formattedAlternatePhone}
                    />
                  </Grid>

                  {/* Address */}
                  <Grid item xs={12}>
                    <DetailItem
                      icon={<Home sx={{ color: "#4caf50" }} />}
                      label="Address"
                      value={`${profileData.address.line1}, ${
                        profileData.address.line2 || ""
                      }, ${profileData.address.city}, ${
                        profileData.address.state
                      } - ${profileData.address.pinCode}`}
                    />
                  </Grid>

                  {/* Distance */}
                  <Grid item xs={12} sm={4}>
                    <DetailBox
                      icon={<LocationOn sx={{ color: "#e91e63" }} />}
                      label="Distance"
                      value={`${profileData.distance} km`}
                    />
                  </Grid>

                  {/* Plan */}
                  <Grid item xs={12} sm={4}>
                    <DetailBox
                      icon={<CardMembership sx={{ color: "#009688" }} />}
                      label="Plan"
                      value={profileData.plan}
                    />
                  </Grid>

                  {/* Credit Balance */}
                  <Grid item xs={12} sm={4}>
                    <DetailBox
                      icon={<AccountBalanceWallet sx={{ color: "#673ab7" }} />}
                      label="Credit Balance"
                      value={`₹ ${profileData.creditBalance}`}
                    />
                  </Grid>
                </Grid>
              </Paper>
            )}

            {tab === 1 && (
              <Paper
                elevation={4}
                sx={{ p: 4, borderRadius: 3, bgcolor: "#fff" }}
              >
                {/* Header */}
                <Box display="flex" alignItems="center" gap={1} mb={3}>
                  <AccountCircle sx={{ fontSize: 32, color: "primary.main" }} />
                  <Typography variant="h5" color="primary">
                    Update Profile
                  </Typography>
                </Box>

                <Box component="form" onSubmit={handleUpdate}>
                  <Grid container spacing={2}>
                    {/* Name */}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={profileData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircle />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    {/* Email (Disabled) */}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        disabled
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    {/* Phone Numbers */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone"
                        name="phone"
                        value={profileData.phone}
                        // disabled
                        onChange={handleChange}
                        error={!!errors.phone}
                        helperText={errors.phone}
                        required
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
                        fullWidth
                        label="Alternate Phone"
                        name="alternatePhone"
                        value={profileData.alternatePhone}
                        error={!!errors.alternatePhone}
                        helperText={errors.alternatePhone}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Phone />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    {/* Shop Name */}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Shop Name"
                        name="shopName"
                        value={profileData.shopName}
                        onChange={handleChange}
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

                    {/* Address Fields */}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Address Line 1"
                        name="address.line1"
                        value={profileData.address.line1}
                        onChange={handleChange}
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
                        fullWidth
                        label="Address Line 2 (Optional)"
                        name="address.line2"
                        value={profileData.address.line2}
                        onChange={handleChange}
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
                        fullWidth
                        label="Landmark (Optional)"
                        name="address.landmark"
                        value={profileData.address.landmark}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationOn />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    {/* City & State */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="City"
                        name="address.city"
                        value={profileData.address.city}
                        onChange={handleChange}
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
                        fullWidth
                        label="State"
                        name="address.state"
                        value={profileData.address.state}
                        onChange={handleChange}
                        required
                      />
                    </Grid>

                    {/* Pin Code */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Pin Code"
                        name="address.pinCode"
                        value={profileData.address.pinCode}
                        onChange={handleChange}
                        helperText={errors["address.pinCode"]}
                        error={!!errors["address.pinCode"]}
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PinDrop />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>

                  {/* Submit Button */}
                  <Box textAlign="center" mt={4}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      sx={{ px: 4, py: 1.5, fontSize: 16, borderRadius: 2 }}
                      disabled={showOtpModal}
                    >
                      {showOtpModal ? <CircularProgress size={24} /> : "Update"}
                    </Button>
                  </Box>
                </Box>
              </Paper>
            )}

            {tab === 2 && (
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
                              onClick={() =>
                                handleClickShowPassword("oldPassword")
                              }
                              edge="end"
                            >
                              {showOldPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
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
                              onClick={() =>
                                handleClickShowPassword("newPassword")
                              }
                              edge="end"
                            >
                              {showNewPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
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
                              onClick={() =>
                                handleClickShowPassword("confirmPassword")
                              }
                              edge="end"
                            >
                              {showConfirmPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>

                {/* Update Button */}
                <Box textAlign="center" mt={3}>
                  <Button variant="contained" color="primary" type="submit">
                    Update Password
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;

import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
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
} from "@mui/icons-material";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    userId: "",
    alternatePhone: "",
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

  // Change Password State
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Timer Interval Ref
  const timerInterval = useRef(null);

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
  const handleChange = (e) => {
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
  };

  // Request OTP
  const requestOTP = useCallback(async () => {
    try {
      const emailError = validate("email", profileData.email);
      if (emailError) {
        setError(emailError);
        return;
      }

      const token = localStorage.getItem("authToken");
      await axios.post(
        "https://lenz-backend.onrender.com/api/otp/request-otp",
        { email: profileData.email },
        { headers: { Authorization: `Bearer ${token}` } }
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
      const token = localStorage.getItem("authToken");
      await axios.post(
        "https://lenz-backend.onrender.com/api/otp/verify-otp",
        { email: profileData.email, otp },
        { headers: { Authorization: `Bearer ${token}` } }
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
        setSuccess("Profile updated successfully");
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

  // Re-trigger update after OTP verification
  useEffect(() => {
    if (otpVerified && pendingUpdate) {
      if (tab === 1) handleUpdate(); // Re-trigger profile update
      if (tab === 2) handleChangePassword(); // Re-trigger password change
    }
  }, [otpVerified, pendingUpdate, handleUpdate, handleChangePassword, tab]);

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

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
      <Dialog open={showOtpModal} onClose={() => setShowOtpModal(false)}>
        <DialogTitle>Verify OTP</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            sx={{ mt: 2 }}
            error={!!error}
            helperText={error}
          />
          <Typography variant="body2" sx={{ mt: 2 }}>
            OTP expires in: {Math.floor(otpTimer / 60)}:{otpTimer % 60}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowOtpModal(false)}>Cancel</Button>
          <Button onClick={verifyOTP} variant="contained" color="primary">
            Verify
          </Button>
          <Button
            onClick={requestOTP}
            disabled={!canResendOtp}
            variant="outlined"
            color="secondary"
          >
            Resend OTP
          </Button>
        </DialogActions>
      </Dialog>

      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              margin: "auto",
              bgcolor: "primary.main",
              mb: 2,
            }}
          >
            <Person fontSize="large" />
          </Avatar>
          <Typography variant="h5" fontWeight="bold">
            {profileData.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {profileData.email}
          </Typography>
        </CardContent>
      </Card>

      <Card>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="View Profile" icon={<Person />} />
          <Tab label="Update Profile" icon={<Edit />} />
          <Tab label="Change Password" icon={<Lock />} />
        </Tabs>
        <Divider />
        <CardContent>
          {tab === 0 && (
            <Box>
              <Typography variant="h6" mb={2}>
                Profile Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography>
                    <strong>Unique User ID:</strong> {profileData.userId}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography>
                    <strong>Phone:</strong> {profileData.phone}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography>
                    <strong>Alternate Phone:</strong>{" "}
                    {profileData.alternatePhone || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    <strong>Shop Name:</strong> {profileData.shopName}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    <strong>Address:</strong> {profileData.address.line1},{" "}
                    {profileData.address.line2 || ""},{" "}
                    {profileData.address.city}, {profileData.address.state} -{" "}
                    {profileData.address.pinCode}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    <strong>Plan:</strong> {profileData.plan}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}

          {tab === 1 && (
            <Box component="form" onSubmit={handleUpdate}>
              <Typography variant="h6" mb={2}>
                Update Profile
              </Typography>
              <Grid container spacing={2}>
                {/* Name Field */}
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

                {/* Email Field */}
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

                {/* Phone Field */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={profileData.phone}
                    disabled
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

                {/* Alternate Phone Field */}
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

                {/* Address Line 1 */}
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

                {/* Address Line 2 */}
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

                {/* Landmark */}
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

                {/* City */}
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

                {/* State */}
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
                  />
                </Grid>
              </Grid>

              <Box textAlign="center" mt={3}>
                <Button variant="contained" color="primary" type="submit">
                  Save Changes
                </Button>
              </Box>
            </Box>
          )}

          {tab === 2 && (
            <Box component="form" onSubmit={handleChangePassword}>
              <Typography variant="h6" mb={2}>
                Change Password
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Old Password"
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="New Password"
                    type="password"
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
                          <Lock />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Box textAlign="center" mt={3}>
                <Button variant="contained" color="primary" type="submit">
                  Update Password
                </Button>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;

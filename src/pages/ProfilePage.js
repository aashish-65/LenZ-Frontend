import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  Avatar,
  Tabs,
  Tab,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Edit, Lock, Person } from "@mui/icons-material";

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

  const validate = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required.";
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Enter a valid email.";
        break;
      case "phone":
      case "alternatePhone":
        if (!/^\+91\d{10}$/.test(value)) error = "Enter a valid 10-digit phone number.";
        if (name === "alternatePhone" && value === profileData.phone)
          error = "Alternate phone number cannot be the same as phone number.";
        break;
      case "address.pinCode":
        if (!/^\d{6}$/.test(value)) error = "Pin code must be 6 digits.";
        break;
      default:
        break;
    }
    return error;
  };

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

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    setError("");
    setSuccess("");
  };

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

  const handleUpdate = async (e) => {
    e.preventDefault();

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

    try {
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
    } catch (err) {
      setError("Failed to update profile");
      setSuccess("");
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    // Logic for password change
    setSuccess("Password updated successfully!");
  };

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
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="New Password"
                    type="password"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    type="password"
                    required
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

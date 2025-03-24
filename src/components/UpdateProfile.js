import React, { useState, useCallback } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import {
  AccountCircle,
  Email,
  Phone,
  Business,
  Home,
  LocationCity,
  PinDrop,
  LocationOn,
} from "@mui/icons-material";

const UpdateProfile = ({ profileData, setProfileData, handleUpdate, errors, showOtpModal }) => {
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

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
    [setProfileData]
  );

  return (
    <Paper elevation={4} sx={{ p: 4, borderRadius: 3, bgcolor: "#fff" }}>
      <Box display="flex" alignItems="center" gap={1} mb={3}>
        <AccountCircle sx={{ fontSize: 32, color: "primary.main" }} />
        <Typography variant="h5" color="primary">
          Update Profile
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleUpdate}>
        <Grid container spacing={2}>
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
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={profileData.phone}
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
  );
};

export default UpdateProfile;
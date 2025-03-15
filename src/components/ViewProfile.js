import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
} from "@mui/material";
import {
  Business,
  AccountCircle,
  Phone,
  Home,
  LocationOn,
  CardMembership,
  AccountBalanceWallet,
} from "@mui/icons-material";

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
    minWidth={100}
    minHeight={80}
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

const ViewProfile = ({ profileData }) => {
  const formattedAlternatePhone =
    profileData.alternatePhone?.replace(/\s+/g, "") === "+91"
      ? "N/A"
      : profileData.alternatePhone;

  return (
    <Paper elevation={4} sx={{ p: 4, borderRadius: 2, bgcolor: "#fff" }}>
      <Box display="flex" alignItems="center" justifyContent="center" mb={3} gap={1}>
        <AccountCircle sx={{ fontSize: 32, color: "primary.main" }} />
        <Typography variant="h5" color="primary">
          Profile Details
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <DetailItem
            icon={<Business sx={{ color: "#ff9800" }} />}
            label="Shop Name"
            value={profileData.shopName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DetailItem
            icon={<AccountCircle sx={{ color: "#6a11cb" }} />}
            label="Unique User ID"
            value={profileData.userId}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DetailItem
            icon={<Phone sx={{ color: "#2575fc" }} />}
            label="Phone"
            value={profileData.phone}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DetailItem
            icon={<Phone sx={{ color: "#2575fc" }} />}
            label="Alternate Phone"
            value={formattedAlternatePhone}
          />
        </Grid>
        <Grid item xs={12}>
          <DetailItem
            icon={<Home sx={{ color: "#4caf50" }} />}
            label="Address"
            value={`${profileData.address.line1}, ${profileData.address.line2 || ""}, ${profileData.address.city}, ${profileData.address.state} - ${profileData.address.pinCode}`}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <DetailBox
            icon={<LocationOn sx={{ color: "#e91e63" }} />}
            label="Distance"
            value={`${profileData.distance} km`}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <DetailBox
            icon={<CardMembership sx={{ color: "#009688" }} />}
            label="Plan"
            value={profileData.plan}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <DetailBox
            icon={<AccountBalanceWallet sx={{ color: "#673ab7" }} />}
            label="Credit Balance"
            value={`₹ ${profileData.creditBalance}`}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ViewProfile;
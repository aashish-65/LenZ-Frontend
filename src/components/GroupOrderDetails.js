import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Skeleton,
  useMediaQuery,
  LinearProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PersonIcon from "@mui/icons-material/Person";

const GroupOrderDetails = () => {
  const { groupOrderId } = useParams();
  const [groupOrder, setGroupOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authToken } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)"); // Check for mobile view

  useEffect(() => {
    const fetchGroupOrderDetails = async () => {
      try {
        const response = await axios.get(
          `https://lenz-backend.onrender.com/api/orders/get-group-order/${groupOrderId}`,
          { headers: { Authorization: `Bearer ${authToken}` }}
        );
        setGroupOrder(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupOrderDetails();
  }, [groupOrderId, authToken]);

  // 🎨 **Color for Tracking Status**
  const getStatusColor = (status) => {
    switch (status) {
      case "Order Placed For Pickup":
        return "warning.main"; // Yellow
      case "Pickup Accepted":
        return "info.main"; // Blue
      case "Order Picked Up":
        return "success.main"; // Green
      case "Order Received By Admin":
        return "secondary.main"; // Purple
      case "Work Completed":
        return "primary.main"; // Primary color
      case "Out For Delivery":
        return "info.light"; // Light blue
      case "Order Completed":
        return "success.dark"; // Dark green
      default:
        return "text.primary"; // Default color
    }
  };

  // 📊 **Progress Bar Value**
  const getProgressValue = (status) => {
    switch (status) {
      case "Order Placed For Pickup":
        return 14;
      case "Pickup Accepted":
        return 28;
      case "Order Picked Up":
        return 42;
      case "Order Received By Admin":
        return 56;
      case "Work Completed":
        return 70;
      case "Out For Delivery":
        return 84;
      case "Order Completed":
        return 100;
      default:
        return 0;
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Skeleton variant="rectangular" width="100%" height={400} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  if (!groupOrder) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>No group order found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* 🚪 **Back Button** */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2, color: "powderblue" }}
      >
        Back to Orders
      </Button>

      {/* 📄 **Group Order Header** */}
      <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            Group Order Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <CheckCircleIcon fontSize="small" />
                <strong>Order ID:</strong> {groupOrder._id}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: getStatusColor(groupOrder.tracking_status),
                }}
              >
                <LocalShippingIcon fontSize="small" />
                <strong>Status:</strong> {groupOrder.tracking_status}
              </Typography>
              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <AssignmentTurnedInIcon fontSize="small" />
                <strong>Total Amount:</strong> ₹{groupOrder.finalAmount}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <PersonIcon fontSize="small" />
                <strong>Delivery Charge:</strong> ₹{groupOrder.deliveryCharge}
              </Typography>
              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <PersonIcon fontSize="small" />
                <strong>Paid Amount:</strong> ₹{groupOrder.paidAmount}
              </Typography>
              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <PersonIcon fontSize="small" />
                <strong>Left Amount:</strong> ₹{groupOrder.leftAmount}
              </Typography>
            </Grid>
          </Grid>

          {/* 📊 **Progress Bar** */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Progress: {getProgressValue(groupOrder.tracking_status)}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={getProgressValue(groupOrder.tracking_status)}
              sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: `${getStatusColor(groupOrder.tracking_status)}.light`,
                "& .MuiLinearProgress-bar": {
                  backgroundColor: getStatusColor(groupOrder.tracking_status),
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* 📦 **Orders in this Group** */}
      <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            Orders in this Group
          </Typography>
          {isMobile ? (
            // Mobile View: Card Layout
            <Box>
              {groupOrder.orders.map((order) => (
                <Card key={order._id} sx={{ mb: 2, p: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {order.customerDetails.name}
                  </Typography>
                  <Typography>Bill No.: {order.customerDetails.billNumber || "N/A"}</Typography>
                  <Typography>Order ID: {order._id}</Typography>
                  <Typography>Total Amount: ₹{order.totalAmount}</Typography>
                </Card>
              ))}
            </Box>
          ) : (
            // Desktop View: Table Layout
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Customer Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Bill No.</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Order ID</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Total Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {groupOrder.orders.map((order) => (
                    <TableRow key={order._id} hover sx={{ cursor: "pointer" }}>
                      <TableCell>{order.customerDetails.name}</TableCell>
                      <TableCell>{order.customerDetails.billNumber || "N/A"}</TableCell>
                      <TableCell>{order._id}</TableCell>
                      <TableCell>₹{order.totalAmount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default GroupOrderDetails;
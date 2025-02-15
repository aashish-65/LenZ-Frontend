import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import apiCall from "../utils/api";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(orderId);
    const fetchOrder = async () => {
      try {
        const response = await apiCall(`/orders/order/${orderId}`);
        setOrder(response.data);
      } catch (err) {
        setError("Failed to fetch order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ padding: 4, maxWidth: "800px", margin: "auto" }}>
      <Card component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Order Details
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />

          <Typography variant="h6">Customer Information</Typography>
          <Typography>Name: {order.customerDetails?.name}</Typography>
          <Typography>Bill Number: {order.customerDetails?.billNumber}</Typography>
          <Divider sx={{ marginY: 2 }} />

          <Typography variant="h6">Frame Details</Typography>
          <Typography>Type: {order.frameOptions?.type || "N/A"}</Typography>
          <Divider sx={{ marginY: 2 }} />

          <Typography variant="h6">Total Amount: ₹{order.totalAmount}</Typography>
          <Typography>Status: {order.orderPlaced ? "Placed" : "Pending"}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderDetails;

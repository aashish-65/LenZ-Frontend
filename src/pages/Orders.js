import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import apiCall from "../utils/api";
import { styled } from "@mui/system";

// Styled Components
const OrderCard = styled(Card)(({ theme }) => ({
  background: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
  padding: "24px",
  marginBottom: "24px",
  [theme.breakpoints.up("md")]: { // Adjust size for larger screens (laptops/desktops)
    maxWidth: "800px", 
    width: "100%",
    // margin: "auto",
  },
}));

const Title = styled(Typography)(({
  fontWeight: 600,
  color: "#4f4f4f",
  marginBottom: "16px",
  fontSize: "1.5rem",
}));

const OrderListItem = styled(ListItem)({
  background: "#f9f9f9",
  marginBottom: "12px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  "&:hover": {
    background: "#f0f0f0",
    transform: "scale(1.02)",
    transition: "transform 0.2s ease-in-out",
  },
});

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user?._id) {
        setLoading(true);
        try {
          const data = await apiCall(`/orders/get-order/${user._id}`);
          setOrders(data.data);
        } catch (error) {
          console.error(error.message);
          setError("Failed to load your orders.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchOrders();
  }, [user?._id]);

  return (
    <Box
      component={motion.div}
      initial="hidden"
      animate="visible"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 4,
        minHeight: "100vh",
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
        color: "#fff",
      }}
    >
      <Typography
        variant="h3"
        component={motion.div}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        sx={{ fontWeight: "bold", marginBottom: 4 }}
      >
        Your Orders
      </Typography>

      {/* Orders List Section */}
      <OrderCard
        component={motion.div}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.5 } },
        }}
      >
        <CardContent>
          {loading ? (
            <CircularProgress
              color="primary"
              sx={{ display: "block", margin: "auto", marginTop: "40px" }}
            />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : orders.length === 0 ? (
            <Typography>No orders found.</Typography>
          ) : (
            <>
              <Title>Your Orders</Title>
              <Divider sx={{ marginBottom: "24px" }} />
              <List>
                {orders.map((order) => (
                  <OrderListItem key={order._id} divider>
                    <ListItemText
                      primary={`Order ID: ${order._id}`}
                      secondary={
                        <>
                          <Typography variant="body2" sx={{ color: "#555" }}>
                            Customer: {order.customerDetails?.name || "Unknown"}{" "}
                            | Bill Number:{" "}
                            {order.customerDetails?.billNumber || "N/A"}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#888" }}>
                            Date:{" "}
                            {new Date(order.createdAt).toLocaleDateString()} |
                            Status: {order.orderPlaced ? "Placed" : "Pending"} |
                            Total: ₹{order.totalAmount}
                          </Typography>
                        </>
                      }
                    />
                  </OrderListItem>
                ))}
              </List>
            </>
          )}
        </CardContent>
      </OrderCard>
    </Box>
  );
};

export default Orders;

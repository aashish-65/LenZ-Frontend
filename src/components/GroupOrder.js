import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import axios from "axios";
import {
  Box,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Fab,
  Fade,
  Grow,
  Skeleton,
} from "@mui/material";
import {
  AddShoppingCart,
  Payment,
  LocalShipping,
  ExpandMore,
} from "@mui/icons-material";

const Orders = () => {
  const { user, authToken } = useAuth();
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [groupOrderBill, setGroupOrderBill] = useState(null);
  const [paymentOption, setPaymentOption] = useState("full");
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check for mobile view

  // Fetch user's orders and filter out grouped orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `https://lenz-backend.onrender.com/api/orders/get-order/${user._id}`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        // Filter out orders that are already part of a group order
        const filteredOrders = response.data.data.filter(
          (order) => !order.isGroupOrder && !order.groupOrderId
        );
        setOrders(filteredOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };
    if (user && authToken) {
      fetchOrders();
    }
  }, [user, authToken]);

  // Handle order selection
  const handleOrderSelection = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  // Calculate group order bill
  const calculateGroupOrderBill = () => {
    const selectedOrderDetails = orders.filter((order) =>
      selectedOrders.includes(order._id)
    );
    const totalAmount = selectedOrderDetails.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );
    const deliveryCharge = 100; // Fixed delivery charge
    const finalAmount =
      paymentOption === "full" ? totalAmount + deliveryCharge : deliveryCharge;

    setGroupOrderBill({
      totalAmount,
      deliveryCharge,
      finalAmount,
      selectedOrders: selectedOrderDetails,
    });
    setOpenDialog(true); // Open payment options dialog
  };

  // Handle payment and create group order
  const handlePayment = async () => {
    try {
      const response = await axios.post(
        "https://lenz-backend.onrender.com/api/orders/create-group-order",
        {
          userId: user._id,
          orderIds: selectedOrders,
          paymentOption,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      if (response.data.confirmation) {
        alert("Pickup created successfully!");
        setOpenDialog(false);
        setSelectedOrders([]); // Clear selected orders
        // Refetch orders to update the list (remove grouped orders)
        const fetchResponse = await axios.get(
          `https://lenz-backend.onrender.com/api/orders/get-order/${user._id}`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        const filteredOrders = fetchResponse.data.data.filter(
          (order) => !order.isGroupOrder && !order.groupOrderId
        );
        setOrders(filteredOrders);
      }
    } catch (error) {
      console.error("Failed to create pickup:", error);
      alert("Failed to create pickup. Please try again.");
    }
  };

  return (
    <Box sx={{ padding: isMobile ? 2 : 3 }}>
      <Typography variant="h4" gutterBottom>
        Place Your Orders
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ textAlign: "center", backgroundColor: "#f5f5f5", padding: 2 }}>
        Total Orders Left for Pickup: {loading ? "Loading..." : orders.length}
      </Typography>

      {loading ? (
        <Box>
          {[...Array(3)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              height={100}
              sx={{ marginBottom: 2 }}
            />
          ))}
        </Box>
      ) : orders.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: "center", marginTop: 4 }}>
          No orders available.
        </Typography>
      ) : (
        <>
          {isMobile ? (
            // Mobile view: Card-based layout
            <Box>
              {orders.map((order) => (
                <Fade in={true} key={order._id}>
                  <Card
                    sx={{
                      marginBottom: 2,
                      transition: "box-shadow 0.3s",
                      "&:hover": { boxShadow: 3 },
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Checkbox
                          checked={selectedOrders.includes(order._id)}
                          onChange={() => handleOrderSelection(order._id)}
                        />
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="body1">
                            <strong>Order ID:</strong> {order._id}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Name:</strong> {order.customerDetails.name}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Bill Number:</strong>{" "}
                            {order.customerDetails.billNumber || "N/A"}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Total Amount:</strong> ₹{order.totalAmount}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Status:</strong> {order.paymentStatus}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Fade>
              ))}
            </Box>
          ) : (
            // Desktop view: Table layout
            <TableContainer
              component={Paper}
              sx={{ maxHeight: "60vh", overflow: "auto" }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Select</TableCell>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Name </TableCell>
                    <TableCell>Bill Number</TableCell>
                    <TableCell>Total Amount</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <Fade in={true} key={order._id}>
                      <TableRow
                        hover
                        sx={{
                          "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                          transition: "background-color 0.3s",
                        }}
                      >
                        <TableCell>
                          <Checkbox
                            checked={selectedOrders.includes(order._id)}
                            onChange={() => handleOrderSelection(order._id)}
                          />
                        </TableCell>
                        <TableCell>{order._id}</TableCell>
                        <TableCell>{order.customerDetails.name}</TableCell>
                        <TableCell>
                          {order.customerDetails.billNumber || "N/A"}
                        </TableCell>
                        <TableCell>₹{order.totalAmount}</TableCell>
                        <TableCell>{order.paymentStatus}</TableCell>
                      </TableRow>
                    </Fade>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {selectedOrders.length > 0 && (
            <>
              {isMobile ? (
                // Mobile view: Floating Action Button (FAB)

                <Grow in={true}>
                  <Fab
                    color="info"
                    aria-label="Create Group Order"
                    onClick={calculateGroupOrderBill}
                    sx={{ position: "fixed", top: 64, right: 16 }}
                  >
                    <AddShoppingCart />
                  </Fab>
                </Grow>
              ) : (
                // Desktop view: Regular button
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddShoppingCart />}
                  onClick={calculateGroupOrderBill}
                  sx={{
                    marginTop: 2,
                    transition: "transform 0.3s",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                >
                  Create Group Order
                </Button>
              )}
            </>
          )}
        </>
      )}

      {/* Payment Options Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullScreen={isMobile}
      >
        <DialogTitle>Payment Options</DialogTitle>
        <DialogContent>
          <Card sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Group Order Bill
              </Typography>
              <Typography>
                Total Amount: ₹{groupOrderBill?.totalAmount}
              </Typography>
              <Typography>
                Delivery Charge: ₹{groupOrderBill?.deliveryCharge}
              </Typography>
              <Typography>
                Final Amount: ₹{groupOrderBill?.finalAmount}
              </Typography>
            </CardContent>
          </Card>

          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h6" gutterBottom>
              Choose Payment Option:
            </Typography>
            {isMobile ? (
              // Mobile view: Accordion for payment options
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography>Payment Options</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Button
                    fullWidth
                    variant={
                      paymentOption === "full" ? "contained" : "outlined"
                    }
                    startIcon={<Payment />}
                    onClick={() => setPaymentOption("full")}
                    sx={{ marginBottom: 2 }}
                  >
                    Pay Full Amount
                  </Button>
                  <Button
                    fullWidth
                    variant={
                      paymentOption === "delivery" ? "contained" : "outlined"
                    }
                    startIcon={<LocalShipping />}
                    onClick={() => setPaymentOption("delivery")}
                  >
                    Pay Delivery Charge Only
                  </Button>
                </AccordionDetails>
              </Accordion>
            ) : (
              // Desktop view: Regular buttons
              <>
                <Button
                  variant={paymentOption === "full" ? "contained" : "outlined"}
                  startIcon={<Payment />}
                  onClick={() => setPaymentOption("full")}
                  sx={{
                    marginRight: 2,
                    transition: "transform 0.3s",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                >
                  Pay Full Amount
                </Button>
                <Button
                  variant={
                    paymentOption === "delivery" ? "contained" : "outlined"
                  }
                  startIcon={<LocalShipping />}
                  onClick={() => setPaymentOption("delivery")}
                  sx={{
                    transition: "transform 0.3s",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                >
                  Pay Delivery Charge Only
                </Button>
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handlePayment} color="primary" variant="contained">
            Confirm Payment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Orders;

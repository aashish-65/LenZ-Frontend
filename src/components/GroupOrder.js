import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import apiCall from "../utils/api";
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
  TextField,
  TablePagination,
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
  CircularProgress,
  SwipeableDrawer,
  MenuItem,
  Menu,
} from "@mui/material";
import {
  AddShoppingCart,
  Payment,
  LocalShipping,
  ExpandMore,
  Person,
  Receipt,
  CurrencyRupee,
  CheckCircle,
  Sort,
  ArrowDownward,
  ArrowUpward,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Orders = () => {
  const { user, authToken } = useAuth();
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [groupOrderBill, setGroupOrderBill] = useState(null);
  const [paymentOption, setPaymentOption] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(0);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "_id",
    direction: "desc",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  // const [expandedOrderId, setExpandedOrderId] = useState(null);

  // Delete confirmation dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const currency = "INR";
  const receiptId = "qwsaq1";

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check for mobile view

  const navigate = useNavigate();

  // Fetch user's orders and filter out grouped orders
  useEffect(() => {
    console.log("User:", user);
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
        console.log("Orders:", filteredOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        toast.error("Failed to fetch orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    // const 
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
    const deliveryCharge = user.deliveryCharge;
    const finalAmount = totalAmount + deliveryCharge;

    setGroupOrderBill({
      totalAmount,
      deliveryCharge,
      finalAmount,
      selectedOrders: selectedOrderDetails,
    });
    setOpenDialog(true); // Open payment options dialog
  };

  const createRazorpayOrder = async (amountInPaise) => {
    const response = await axios.post(
      "https://lenz-backend.onrender.com/api/payments/order",
      {
        amount: amountInPaise,
        currency,
        receipt: receiptId,
      }
    );
    return response.data;
  };

  const handlePaymentSuccess = async (response) => {
    const validateResponse = await axios.post(
      "https://lenz-backend.onrender.com/api/payments/verify",
      response
    );
    return validateResponse.data;
  };

  const createGroupOrder = async () => {
    try {
      const createOrderResponse = await axios.post(
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
      if (createOrderResponse.data.confirmation) {
        toast.success("Pickup created successfully!");
        setOpenDialog(false);
        setSelectedOrders([]);

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
      console.error("Failed to create group order:", error);
      // alert("Failed to create group order. Please try again.");
      toast.error("Failed to create group order. Please try again.");
    }
  };

  // Handle payment and create group order
  const handlePayment = async (e) => {
    setIsProcessingPayment(true);
    try {
      if (!paymentOption) {
        // alert("Please select a payment option");
        toast.warning("Please select a payment option");
        return;
      }
      const amountInPaise = amount * 100;
      const order = await createRazorpayOrder(amountInPaise);
      console.log(order);

      var options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        amount: amountInPaise,
        currency,
        name: "LenZ Booking App",
        description: "Order Payment",
        image: "https://lenz-booking.netlify.app/favicon-96x96.png",
        order_id: order.id,
        handler: async function (response) {
          const body = {
            ...response,
          };

          const payment = await handlePaymentSuccess(body);
          console.log(payment);
          // alert("Payment successful! Your order has been placed.");
          toast.success("Payment successful! Your order has been placed.");

          createGroupOrder();
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "powderblue",
        },
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        // alert(response.error.code);
        // alert(response.error.description);
        // alert(response.error.source);
        // alert(response.error.step);
        // alert(response.error.reason);
        // alert(response.error.metadata.order_id);
        // alert(response.error.metadata.payment_id);
        // alert(`Payment failed: ${response.error.description}`);
        toast.error(`Payment failed: ${response.error.description}`);
      });

      rzp1.open();
      e.preventDefault();
    } catch (error) {
      console.error("Payment failed:", error);
      if (error.response) {
        toast.error(`Payment failed: ${error.response.data.message}`);
      } else if (error.request) {
        toast.error("Network error. Please check your internet connection.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map((order) => order._id));
    }
  };

  // Handle sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    setAnchorEl(null);
  };

  // Sort orders
  const sortedOrders = React.useMemo(() => {
    if (sortConfig.key) {
      return [...orders].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return orders;
  }, [orders, sortConfig]);

  // Filter orders
  const filteredOrders = sortedOrders.filter(
    (order) =>
      order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerDetails.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle actions
  const handleViewDetails = (orderId) => {
    console.log("View details for order:", orderId);
    navigate(`/orders/${orderId}/details`);
  };
  const handleDeleteOrder = async () => {
    if (!orderToDelete) return;
    console.log("Delete order:", orderToDelete);
    setIsDeleting(true);
    try {
      // Call the delete API
      await apiCall(`/orders/delete-order/${orderToDelete}`, "DELETE");
      // Remove the order from the state with animation
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderToDelete)
      );
      toast.success("Order deleted successfully!");
    } catch (error) {
      console.error("Failed to delete order:", error);
      toast.error("Failed to delete order. Please try again.");
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setOrderToDelete(null);
    }
  };

  // Open delete confirmation dialog
  const openDeleteDialog = (orderId) => {
    setOrderToDelete(orderId);
    setDeleteDialogOpen(true);
  };

  // Close delete confirmation dialog
  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setOrderToDelete(null);
  };

  // Sorting menu
  const handleSortMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortMenuClose = () => {
    setAnchorEl(null);
  };

  // Get the current sorting label
  // const getSortLabel = () => {
  //   const { key } = sortConfig;
  //   const labels = {
  //     _id: "Order ID",
  //     "customerDetails.name": "Name",
  //     totalAmount: "Total Amount",
  //     paymentStatus: "Status",
  //   };
  //   return `${labels[key]}`;
  // };

  return (
    <Box sx={{ padding: isMobile ? 2 : 3 }}>
      <Box
        sx={{
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: theme.palette.common.white,
          padding: 2,
          borderRadius: 2,
          boxShadow: 3,
          textAlign: "center",
          marginBottom: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <AddShoppingCart fontSize="large" />
          Place Your Orders
        </Typography>
      </Box>

      {/* Sorting Button and Search Bar */}
      <Box sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}>
        <Button
          variant="outlined"
          startIcon={<Sort />}
          endIcon={
            sortConfig.direction === "asc" ? <ArrowUpward /> : <ArrowDownward />
          }
          onClick={handleSortMenuOpen}
          sx={{
            // textTransform: "none",
            backgroundColor: theme.palette.background.paper,
            borderColor: theme.palette.divider,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          Sort By
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleSortMenuClose}
        >
          <MenuItem onClick={() => handleSort("_id")}>Order ID</MenuItem>
          <MenuItem onClick={() => handleSort("customerDetails.name")}>
            Name
          </MenuItem>
          <MenuItem onClick={() => handleSort("totalAmount")}>
            Total Amount
          </MenuItem>
          <MenuItem onClick={() => handleSort("paymentStatus")}>
            Status
          </MenuItem>
        </Menu>

        <TextField
          fullWidth
          placeholder="Search by Order ID or Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: 1,
            },
          }}
        />
      </Box>

      {/* <Typography
        variant="h6"
        gutterBottom
        sx={{ textAlign: "center", backgroundColor: "#f5f5f5", padding: 2 }}
      >
        Total Orders Left for Pickup: {loading ? "Loading..." : orders.length}
      </Typography> */}

      <Box
        sx={{
          mb: 2,
          textAlign: "center",
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
          padding: 2,
          boxShadow: 1,
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: 3,
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            mb: 1,
            color: theme.palette.text.secondary,
          }}
        >
          <LocalShipping fontSize="medium" />
          Pending Pickups
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: theme.palette.primary.main,
          }}
        >
          {loading ? "Loading..." : orders.length}
        </Typography>
        {/* Optional: Progress Bar */}
        {/* <Box sx={{ width: "100%", mt: 2 }}>
          <Box
            sx={{
              width: `${(orders.length / (orders.length + 10)) * 100}%`, // Example progress calculation
              height: 8,
              backgroundColor: theme.palette.primary.main,
              borderRadius: 4,
            }}
          />
        </Box> */}
      </Box>

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
              {filteredOrders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                  <Fade in={true} key={order._id}>
                    <Card
                      sx={{
                        marginBottom: 2,
                        transition: "box-shadow 0.3s, transform 0.3s",
                        "&:hover": {
                          boxShadow: 3,
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Checkbox
                            checked={selectedOrders.includes(order._id)}
                            onChange={() => handleOrderSelection(order._id)}
                            sx={{ marginRight: 1 }}
                            inputProps={{
                              "aria-label": `Select order ${order._id}`,
                            }}
                          />
                          <Box sx={{ flexGrow: 1 }}>
                            {/* Order ID */}
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                              }}
                            >
                              <LocalShipping
                                fontSize="small"
                                sx={{ mr: 1, color: "text.secondary" }}
                              />
                              <Typography
                                variant="body1"
                                sx={{ fontWeight: "bold" }}
                              >
                                Order ID: {order._id}
                              </Typography>
                            </Box>

                            {/* Name */}
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                              }}
                            >
                              <Person
                                fontSize="small"
                                sx={{ mr: 1, color: "text.secondary" }}
                              />
                              <Typography variant="body1">
                                <strong>Name:</strong>{" "}
                                {order.customerDetails.name}
                              </Typography>
                            </Box>

                            {/* Bill Number */}
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                              }}
                            >
                              <Receipt
                                fontSize="small"
                                sx={{ mr: 1, color: "text.secondary" }}
                              />
                              <Typography variant="body1">
                                <strong>Bill Number:</strong>{" "}
                                {order.customerDetails.billNumber || "N/A"}
                              </Typography>
                            </Box>

                            {/* Total Amount */}
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                              }}
                            >
                              <CurrencyRupee
                                fontSize="small"
                                sx={{ mr: 1, color: "text.secondary" }}
                              />
                              <Typography variant="body1">
                                <strong>Total Amount:</strong> ₹
                                {order.totalAmount}
                              </Typography>
                            </Box>

                            {/* Status */}
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <CheckCircle
                                fontSize="small"
                                sx={{ mr: 1, color: "text.secondary" }}
                              />
                              <Typography variant="body1">
                                <strong>Status:</strong>{" "}
                                <Typography
                                  component="span"
                                  sx={{
                                    fontWeight: "bold",
                                    color:
                                      order.paymentStatus === "Paid"
                                        ? "green"
                                        : order.paymentStatus === "Pending"
                                        ? "orange"
                                        : "red", // Color-coded status
                                  }}
                                >
                                  {order.paymentStatus}
                                </Typography>
                              </Typography>
                            </Box>
                            {/* Action Buttons */}
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                mt: 1,
                                gap: 1,
                              }}
                            >
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={() => handleViewDetails(order._id)}
                              >
                                View Details
                              </Button>
                              {/* <Button
                            size="small"
                            variant="outlined"
                            onClick={() => handleEditOrder(order._id)}
                          >
                            Edit
                          </Button> */}
                              <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                onClick={() => openDeleteDialog(order._id)}
                              >
                                Delete
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Fade>
                ))}
              {/* Pagination */}
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredOrders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          ) : (
            // Desktop view: Improved Table layout
            <TableContainer
              component={Paper}
              sx={{ maxHeight: "60vh", overflow: "auto" }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      <Checkbox
                        checked={selectedOrders.length === orders.length}
                        indeterminate={
                          selectedOrders.length > 0 &&
                          selectedOrders.length < orders.length
                        }
                        onChange={handleSelectAll}
                        inputProps={{ "aria-label": "Select all orders" }} // Accessibility
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Order ID</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Bill Number
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Total Amount
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredOrders
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((order) => (
                      <Fade in={true} key={order._id}>
                        <TableRow
                          hover
                          sx={{
                            "&:nth-of-type(odd)": {
                              backgroundColor: "#f9f9f9",
                            },
                            transition: "background-color 0.3s",
                            "&:hover": { backgroundColor: "#e0e0e0" }, // Hover effect
                          }}
                        >
                          <TableCell>
                            <Checkbox
                              checked={selectedOrders.includes(order._id)}
                              onChange={() => handleOrderSelection(order._id)}
                              inputProps={{
                                "aria-label": `Select order ${order._id}`,
                              }} // Accessibility
                            />
                          </TableCell>
                          <TableCell>{order._id}</TableCell>
                          <TableCell>{order.customerDetails.name}</TableCell>
                          <TableCell>
                            {order.customerDetails.billNumber || "N/A"}
                          </TableCell>
                          <TableCell>₹{order.totalAmount}</TableCell>
                          <TableCell>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: "bold",
                                color:
                                  order.paymentStatus === "Paid"
                                    ? "green"
                                    : order.paymentStatus === "Pending"
                                    ? "orange"
                                    : "red", // Color-coded status
                              }}
                            >
                              {order.paymentStatus}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </Fade>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredOrders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
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
      {isMobile ? (
        <SwipeableDrawer
          anchor="bottom" // Drawer opens from the bottom
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onOpen={() => setOpenDialog(true)}
          sx={{
            "& .MuiDrawer-paper": {
              borderTopLeftRadius: 16, // Rounded corners at the top
              borderTopRightRadius: 16,
            },
          }}
        >
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
                    onClick={() => {
                      setAmount(groupOrderBill.finalAmount);
                      setPaymentOption("full");
                    }}
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
                    onClick={() => {
                      setAmount(groupOrderBill.deliveryCharge);
                      setPaymentOption("delivery");
                    }}
                  >
                    Pay Delivery Charge Only
                  </Button>
                </AccordionDetails>
              </Accordion>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button
              onClick={handlePayment}
              color="primary"
              variant="contained"
              disabled={isProcessingPayment}
            >
              {isProcessingPayment ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Confirm Payment"
              )}
            </Button>
          </DialogActions>
        </SwipeableDrawer>
      ) : (
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
              <Button
                variant={paymentOption === "full" ? "contained" : "outlined"}
                startIcon={<Payment />}
                onClick={() => {
                  setAmount(groupOrderBill.finalAmount);
                  setPaymentOption("full");
                }}
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
                onClick={() => {
                  setAmount(groupOrderBill.deliveryCharge);
                  setPaymentOption("delivery");
                }}
                sx={{
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                Pay Delivery Charge Only
              </Button>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button
              onClick={handlePayment}
              color="primary"
              variant="contained"
              disabled={isProcessingPayment}
            >
              {isProcessingPayment ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Confirm Payment"
              )}
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Delete Order</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this order?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteOrder}
            color="error"
            disabled={isDeleting}
            startIcon={isDeleting ? <CircularProgress size={20} /> : null}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Orders;

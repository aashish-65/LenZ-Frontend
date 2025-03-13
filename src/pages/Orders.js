import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import {
  Box,
  Typography,
  Card,
  CardContent,
  ListItem,
  CircularProgress,
  Grid,
  Chip,
  Button,
  Avatar,
  TextField,
  TablePagination,
  Menu,
  MenuItem,
  IconButton,
  InputAdornment,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Skeleton,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import apiCall from "../utils/api";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import {
  Person,
  Receipt,
  DateRange,
  Payment,
  LocalShipping,
  ArrowForward,
  Tune,
  Search,
  Delete,
  SettingsSuggest,
} from "@mui/icons-material";
import { toast } from "react-toastify";

// Styled Components
const OrderCard = styled(Card)(({ theme }) => ({
  background: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: "800px",
    width: "100%",
  },
}));

// const Title = styled(Typography)(({ theme }) => ({
//   fontWeight: 700,
//   color: "#2c3e50",
//   marginBottom: theme.spacing(2),
//   fontSize: "1.5rem",
//   textAlign: "center",
//   [theme.breakpoints.down("sm")]: {
//     fontSize: "1.25rem",
//   },
// }));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: "#34495e",
  marginBottom: theme.spacing(1),
  fontSize: "1.1rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

const OrderListItem = styled(ListItem)(({ theme }) => ({
  background: "#f9f9f9",
  marginBottom: theme.spacing(2),
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  padding: theme.spacing(2),
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  border: "2px solid rgb(162, 160, 237)",
  "&:hover": {
    background: "#f0f0f0",
    transform: "scale(1.02)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
}));

const StatusChip = styled(Chip)(({ status }) => ({
  backgroundColor:
    status === "Placed"
      ? "#27ae60"
      : status === "Pending"
      ? "#f39c12"
      : "#e74c3c",
  color: "#fff",
  fontWeight: 600,
  fontSize: "0.75rem",
}));

// Custom Styled TablePagination
const CustomTablePagination = styled(TablePagination)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  padding: theme.spacing(1),
  marginTop: theme.spacing(2),
  "& .MuiTablePagination-toolbar": {
    padding: 0,
    flexWrap: "wrap",
    justifyContent: "center",
    gap: theme.spacing(1),
  },
  "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
    margin: 0,
    fontSize: "0.875rem",
    color: theme.palette.text.secondary,
  },
  "& .MuiTablePagination-actions": {
    margin: 0,
  },
  "& .MuiButtonBase-root": {
    padding: theme.spacing(1),
    borderRadius: "4px",
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: "#ffffff",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-disabled": {
      opacity: 0.5,
    },
  },
  "& .MuiSelect-select": {
    padding: theme.spacing(1),
    borderRadius: "4px",
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: "#ffffff",
    "&:focus": {
      borderRadius: "4px",
    },
  },
  "& .MuiTablePagination-selectRoot": {
    margin: 0,
  },
}));

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sorting state
  const [sortConfig, setSortConfig] = useState({
    key: "_id",
    direction: "desc",
  });
  const [anchorEl, setAnchorEl] = useState(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Delete confirmation dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Check for mobile view
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        .includes(searchQuery.toLowerCase()) ||
      order.customerDetails.billNumber
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

  // Sorting menu
  const handleSortMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle delete order
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

  // Skeleton Loader
  const renderSkeleton = () => {
    return Array.from({ length: rowsPerPage }).map((_, index) => (
      <OrderListItem key={index} divider>
        <Grid container spacing={2}>
          {/* Delete Button Skeleton */}
          <Box sx={{ position: "absolute", top: 8, right: 8 }}>
            <Skeleton variant="circular" width={30} height={30} />
          </Box>

          {/* Customer Details Skeleton */}
          <Grid item xs={12} md={6}>
            <SectionTitle>
              <Skeleton variant="text" width="40%" />
            </SectionTitle>
            <Box display="flex" alignItems="center" mb={1}>
              <Skeleton variant="circular" width={30} height={30} />
              <Box sx={{ ml: 1, flexGrow: 1 }}>
                <Skeleton variant="text" width="60%" />
              </Box>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <Skeleton variant="circular" width={30} height={30} />
              <Box sx={{ ml: 1, flexGrow: 1 }}>
                <Skeleton variant="text" width="50%" />
              </Box>
            </Box>
          </Grid>

          {/* Order Summary Skeleton */}
          <Grid item xs={12} md={6}>
            <SectionTitle>
              <Skeleton variant="text" width="40%" />
            </SectionTitle>
            <Box display="flex" alignItems="center" mb={1}>
              <Skeleton variant="circular" width={30} height={30} />
              <Box sx={{ ml: 1, flexGrow: 1 }}>
                <Skeleton variant="text" width="70%" />
              </Box>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <Skeleton variant="circular" width={30} height={30} />
              <Box sx={{ ml: 1, flexGrow: 1 }}>
                <Skeleton variant="text" width="60%" />
              </Box>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <Skeleton variant="circular" width={30} height={30} />
              <Box sx={{ ml: 1, flexGrow: 1 }}>
                <Skeleton variant="text" width="50%" />
              </Box>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <Skeleton variant="circular" width={30} height={30} />
              <Box sx={{ ml: 1, flexGrow: 1 }}>
                <Skeleton variant="text" width="40%" />
              </Box>
            </Box>
          </Grid>

          {/* View Details Button Skeleton */}
          <Grid item xs={12}>
            <Box sx={{ marginTop: 1 }}>
              <Skeleton variant="rectangular" width="100%" height={40} />
            </Box>
          </Grid>
        </Grid>
      </OrderListItem>
    ));
  };

  return (
    <Box
      component={motion.div}
      initial="hidden"
      animate="visible"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: isMobile ? 2 : 3,
        minHeight: "100vh",
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
        color: "#fff",
      }}
    >
      <Typography
        variant="h4"
        component={motion.div}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        sx={{
          fontWeight: "bold",
          marginBottom: 3,
          fontSize: isMobile ? "1.5rem" : "2rem",
        }}
      >
        Your Orders
      </Typography>

      {/* Search and Sort Section */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
          mb: 3,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 2,
          alignItems: "center",
        }}
      >
        {/* Search Bar */}
        <TextField
          fullWidth
          placeholder="Search by Order ID, Name or Bill Number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: 1,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "#6a11cb" }} />
              </InputAdornment>
            ),
          }}
        />

        {/* Sort Button */}
        <Button
          variant="outlined"
          onClick={handleSortMenuOpen}
          startIcon={<Tune />}
          sx={{
            backgroundColor: "#ffffff",
            color: "#6a11cb",
            borderColor: "#6a11cb",
            "&:hover": {
              backgroundColor: "#f0f0f0",
              borderColor: "#6a11cb",
            },
            width: isMobile ? "100%" : "auto",
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
          <MenuItem onClick={() => handleSort("createdAt")}>Date</MenuItem>
          <MenuItem onClick={() => handleSort("totalAmount")}>Amount</MenuItem>
        </Menu>
      </Box>

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
            renderSkeleton()
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : filteredOrders.length === 0 ? (
            <Typography>No orders found.</Typography>
          ) : (
            <>
              <AnimatePresence>
                {filteredOrders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order) => (
                    <motion.div
                      key={order._id}
                      initial={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <OrderListItem divider>
                        <Grid container spacing={2}>
                          {/* Delete Button */}
                          <Tooltip title="Delete Order" arrow>
                            <IconButton
                              sx={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                color: "#e74c3c",
                                "&:hover": {
                                  backgroundColor: "rgba(231, 76, 60, 0.1)",
                                },
                              }}
                              onClick={() => openDeleteDialog(order._id)}
                              disabled={isDeleting || order.isGroupOrder}
                            >
                              {isDeleting && orderToDelete === order._id ? (
                                <CircularProgress size={24} />
                              ) : (
                                <Delete />
                              )}
                            </IconButton>
                          </Tooltip>

                          {/* Customer Details */}
                          <Grid item xs={12} md={6}>
                            <SectionTitle>Customer Details</SectionTitle>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Avatar
                                sx={{
                                  bgcolor: "#9b59b6",
                                  mr: 1,
                                  width: 30,
                                  height: 30,
                                }}
                              >
                                <Person fontSize="small" />
                              </Avatar>
                              <Typography
                                variant="body2"
                                sx={{ color: "#555" }}
                              >
                                <strong>Name:</strong>{" "}
                                {order.customerDetails?.name || "Unknown"}
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Avatar
                                sx={{
                                  bgcolor: "#8e44ad",
                                  mr: 1,
                                  width: 30,
                                  height: 30,
                                }}
                              >
                                <Receipt fontSize="small" />
                              </Avatar>
                              <Typography
                                variant="body2"
                                sx={{ color: "#555" }}
                              >
                                <strong>Bill Number:</strong>{" "}
                                {order.customerDetails?.billNumber || "N/A"}
                              </Typography>
                            </Box>
                          </Grid>
                          {/* Order Summary */}
                          <Grid item xs={12} md={6}>
                            <SectionTitle>Order Summary</SectionTitle>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Avatar
                                sx={{
                                  bgcolor: "#27ae60",
                                  mr: 1,
                                  width: 30,
                                  height: 30,
                                }}
                              >
                                <Receipt fontSize="small" />
                              </Avatar>
                              <Typography
                                variant="body2"
                                sx={{ color: "#555" }}
                              >
                                <strong>Order ID:</strong> {order._id}
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Avatar
                                sx={{
                                  bgcolor: "#f39c12",
                                  mr: 1,
                                  width: 30,
                                  height: 30,
                                }}
                              >
                                <DateRange fontSize="small" />
                              </Avatar>
                              <Typography
                                variant="body2"
                                sx={{ color: "#555" }}
                              >
                                <strong>Date:</strong>{" "}
                                {new Date(order.createdAt).toLocaleDateString()}
                              </Typography>
                            </Box>

                            <Box display="flex" alignItems="center" mb={1}>
                              <Avatar
                                sx={{
                                  bgcolor: "#111111",
                                  mr: 1,
                                  width: 30,
                                  height: 30,
                                }}
                              >
                                <SettingsSuggest fontSize="small" />
                              </Avatar>
                              <Typography
                                variant="body2"
                                sx={{ color: "#555" }}
                              >
                                <strong>Work Type: </strong>
                                {order.shiftingOrFitting}
                              </Typography>
                            </Box>

                            <Box display="flex" alignItems="center" mb={1}>
                              <Avatar
                                sx={{
                                  bgcolor: "#3498db",
                                  mr: 1,
                                  width: 30,
                                  height: 30,
                                }}
                              >
                                <Payment fontSize="small" />
                              </Avatar>
                              <Typography
                                variant="body2"
                                sx={{ color: "#555" }}
                              >
                                <strong>Total Amount:</strong> ₹
                                {order.totalAmount}
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                              <Avatar
                                sx={{
                                  bgcolor: "#e74c3c",
                                  mr: 1,
                                  width: 30,
                                  height: 30,
                                }}
                              >
                                <LocalShipping fontSize="small" />
                              </Avatar>
                              <Typography
                                variant="body2"
                                sx={{ color: "#555" }}
                              >
                                <strong>Status:</strong>{" "}
                                <StatusChip
                                  label={
                                    order.orderPlaced ? "Placed" : "Pending"
                                  }
                                  status={
                                    order.orderPlaced ? "Placed" : "Pending"
                                  }
                                />
                              </Typography>
                            </Box>
                          </Grid>

                          {/* Link to Detailed Page */}
                          <Grid item xs={12}>
                            <Box sx={{ marginTop: 1 }}>
                              <Button
                                variant="contained"
                                component={Link}
                                to={`/orders/${order._id}/details`}
                                sx={{
                                  width: "100%",
                                  mt: 1,
                                  background:
                                    "linear-gradient(to right, #6a11cb, #2575fc)",
                                  color: "#fff",
                                  "&:hover": {
                                    background:
                                      "linear-gradient(to right, #2575fc, #6a11cb)",
                                  },
                                }}
                                endIcon={<ArrowForward />}
                              >
                                View Detailed Order
                              </Button>
                            </Box>
                          </Grid>
                        </Grid>
                      </OrderListItem>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </>
          )}
        </CardContent>
        {/* Custom Table Pagination */}
        <CustomTablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            "& .MuiTablePagination-toolbar": {
              flexDirection: "row",
              alignItems: "center",
            },
            "& .MuiTablePagination-actions": {
              marginTop: 0,
            },
          }}
        />
      </OrderCard>
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

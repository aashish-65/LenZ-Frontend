import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
// import { AuthContext } from "../AuthContext";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Button,
  Grid,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Avatar,
  // Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Person,
  Receipt,
  DateRange,
  // Payment,
  Delete,
  ArrowBack,
  LocalShipping,
  Visibility,
  SettingsSuggest,
  EditNote,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import apiCall from "../utils/api";
import { styled } from "@mui/system";
import { toast } from "react-toastify";

// Styled components
const DetailCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  marginBottom: theme.spacing(3),
  background: "#ffffff",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
  },
}));

const DetailItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}));

const DetailLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: "#555",
  marginRight: theme.spacing(1),
}));

const DetailValue = styled(Typography)(({ theme }) => ({
  color: "#333",
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: "#2c3e50",
  marginBottom: theme.spacing(2),
  position: "relative",
  paddingBottom: theme.spacing(1),
  "&:after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "40px",
    height: "3px",
    background: "linear-gradient(to right, #6a11cb, #2575fc)",
    borderRadius: "2px",
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

const OrderDetails = () => {
  const { orderId } = useParams();
  // const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await apiCall(`/orders/order/${orderId}`);
        setOrder(response.data);
      } catch (err) {
        console.error("Error fetching order:", err);
        setError("Failed to fetch order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  // Convert UTC date to IST
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleString("en-IN", options);
  };

  const handleDeleteOrder = async () => {
    setIsDeleting(true);
    try {
      await apiCall(`/orders/delete-order/${orderId}`, "DELETE");
      toast.success("Order deleted successfully!");
      navigate("/orders");
    } catch (error) {
      console.error("Failed to delete order:", error);
      toast.error("Failed to delete order. Please try again.");
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(to right, #6a11cb, #2575fc)",
        }}
      >
        <CircularProgress sx={{ color: "#ffffff" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(to right, #6a11cb, #2575fc)",
          color: "#ffffff",
        }}
      >
        <Typography variant="h5" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{
        padding: isMobile ? 2 : 4,
        minHeight: "100vh",
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
      }}
    >
      <Card
        sx={{
          maxWidth: "900px",
          margin: "0 auto",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(to right, #6a11cb, #2575fc)",
            padding: 3,
            color: "#ffffff",
            position: "relative",
          }}
        >
          <IconButton
            sx={{ position: "absolute", left: 16, top: 16, color: "#ffffff" }}
            onClick={() => navigate("/orders")}
          >
            <ArrowBack />
          </IconButton>

          <Typography
            variant="h4"
            align="center"
            sx={{ fontWeight: 700, mb: 1 }}
          >
            Order Details
          </Typography>

          <Typography variant="subtitle1" align="center">
            Order ID: {order._id}
          </Typography>
        </Box>

        <CardContent sx={{ padding: isMobile ? 2 : 4 }}>
          {/* Group Order Information - Conditional */}
          {order.isGroupOrder && (
            <DetailCard component={motion.div} whileHover={{ y: -5 }}>
              <SectionTitle variant="h6">
                <SettingsSuggest sx={{ mr: 1, verticalAlign: "middle" }} />
                Group Order Information
              </SectionTitle>
              <DetailItem>
                <DetailLabel variant="body2" sx={{ minWidth: "120px" }}>
                  Group Status:
                </DetailLabel>
                <DetailValue variant="body1">
                  <Chip
                    label="Part of Group Order"
                    color="primary"
                    sx={{ fontWeight: 500 }}
                  />
                </DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel variant="body2" sx={{ minWidth: "120px" }}>
                  Group Order ID:
                </DetailLabel>
                <DetailValue variant="body2">{order.groupOrderId}</DetailValue>
              </DetailItem>
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Button
                  variant="contained"
                  component={Link}
                  to={`/group-orders/${order.groupOrderId}`}
                  startIcon={<Visibility />}
                  sx={{
                    background: "linear-gradient(to right, #6a11cb, #2575fc)",
                    color: "#fff",
                    "&:hover": {
                      background: "linear-gradient(to right, #2575fc, #6a11cb)",
                    },
                  }}
                >
                  View Details
                </Button>
              </Box>
            </DetailCard>
          )}
          
          {/* Customer Details Section */}
          <DetailCard component={motion.div} whileHover={{ y: -5 }}>
            <SectionTitle variant="h6">
              <Person sx={{ mr: 1, verticalAlign: "middle" }} />
              Customer Information
            </SectionTitle>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <DetailItem>
                  <Avatar sx={{ bgcolor: "#9b59b6", mr: 2 }}>
                    <Person />
                  </Avatar>
                  <Box>
                    <DetailLabel variant="body2">Name</DetailLabel>
                    <DetailValue variant="body1">
                      {order.customerDetails?.name || "Not specified"}
                    </DetailValue>
                  </Box>
                </DetailItem>
              </Grid>
              <Grid item xs={12} md={6}>
                <DetailItem>
                  <Avatar sx={{ bgcolor: "#8e44ad", mr: 2 }}>
                    <Receipt />
                  </Avatar>
                  <Box>
                    <DetailLabel variant="body2">Bill Number</DetailLabel>
                    <DetailValue variant="body1">
                      {order.customerDetails?.billNumber || "Not specified"}
                    </DetailValue>
                  </Box>
                </DetailItem>
              </Grid>
            </Grid>
          </DetailCard>

          {/* Order Details Section */}
          <DetailCard component={motion.div} whileHover={{ y: -5 }}>
            <SectionTitle variant="h6">
              <EditNote sx={{ mr: 1, verticalAlign: "middle" }} />
              Order Details
            </SectionTitle>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <DetailItem>
                  <Avatar sx={{ bgcolor: "#27ae60", mr: 2 }}>
                    <SettingsSuggest />
                  </Avatar>
                  <Box>
                    <DetailLabel variant="body2">Service Type</DetailLabel>
                    <DetailValue variant="body1">
                      {order.shiftingOrFitting}
                    </DetailValue>
                  </Box>
                </DetailItem>

                <DetailItem>
                  <Avatar sx={{ bgcolor: "#2980b9", mr: 2 }}>
                    <DateRange />
                  </Avatar>
                  <Box>
                    <DetailLabel variant="body2">Date Created</DetailLabel>
                    <DetailValue variant="body1">
                      {formatDate(order.createdAt)}
                    </DetailValue>
                  </Box>
                </DetailItem>
              </Grid>

              <Grid item xs={12} md={6}>
                <DetailItem>
                  <Avatar sx={{ bgcolor: "#e67e22", mr: 2 }}>
                    <LocalShipping />
                  </Avatar>
                  <Box>
                    <DetailLabel variant="body2">Order Status</DetailLabel>
                    <DetailValue variant="body1">
                      <StatusChip
                        label={order.isGroupOrder ? "Placed" : "Unplaced"}
                        status={order.isGroupOrder ? "Placed" : "Unplaced"}
                      />
                    </DetailValue>
                  </Box>
                </DetailItem>

                {/* <DetailItem>
                  <Avatar sx={{ bgcolor: "#2c3e50", mr: 2 }}>
                    <Payment />
                  </Avatar>
                  <Box>
                    <DetailLabel variant="body2">Payment Status</DetailLabel>
                    <DetailValue variant="body1" sx={{ textTransform: "capitalize" }}>
                      {order.paymentStatus}
                    </DetailValue>
                  </Box>
                </DetailItem> */}
              </Grid>
            </Grid>
          </DetailCard>

          {/* Frame Options Section */}
          <DetailCard component={motion.div} whileHover={{ y: -5 }}>
            <SectionTitle variant="h6">
              <SettingsSuggest sx={{ mr: 1, verticalAlign: "middle" }} />
              Frame Options
            </SectionTitle>
            <DetailItem>
              <DetailLabel variant="body2" sx={{ minWidth: "120px" }}>
                Frame Type:
              </DetailLabel>
              <DetailValue variant="body1">
                {order.frameOptions?.type || "Not specified"}
              </DetailValue>
            </DetailItem>
          </DetailCard>

          {/* Service Details Section - Conditional Based on Service Type */}
          <DetailCard component={motion.div} whileHover={{ y: -5 }}>
            <SectionTitle variant="h6">
              <SettingsSuggest sx={{ mr: 1, verticalAlign: "middle" }} />
              Service Details
            </SectionTitle>

            {order.shiftingOrFitting === "Shifting" ? (
              // Shifting Details
              <DetailItem>
                <DetailLabel variant="body2" sx={{ minWidth: "120px" }}>
                  Shifting Charge:
                </DetailLabel>
                <DetailValue variant="body1">
                  ₹{order.shiftingCharge}
                </DetailValue>
              </DetailItem>
            ) : (
              // Fitting Details
              <>
                <DetailItem>
                  <DetailLabel variant="body2" sx={{ minWidth: "120px" }}>
                    Purchase Lens:
                  </DetailLabel>
                  <DetailValue variant="body1">
                    {order.purchaseLens === "true" ? "Yes" : "No"}
                  </DetailValue>
                </DetailItem>

                <DetailItem>
                  <DetailLabel variant="body2" sx={{ minWidth: "120px" }}>
                    Glass Type:
                  </DetailLabel>
                  <DetailValue variant="body1">
                    {order.glassType || "Not specified"}
                  </DetailValue>
                </DetailItem>

                {order.lensDetails && (
                  <DetailItem>
                    <DetailLabel variant="body2" sx={{ minWidth: "120px" }}>
                      Lens Details:
                    </DetailLabel>
                    <DetailValue variant="body1">
                      {order.lensDetails}
                    </DetailValue>
                  </DetailItem>
                )}

                {/* <DetailItem>
                  <DetailLabel variant="body2" sx={{ minWidth: "120px" }}>
                    Power Type:
                  </DetailLabel>
                  <DetailValue variant="body1" sx={{ textTransform: "capitalize" }}>
                    {order.powerType || "Not specified"}
                  </DetailValue>
                </DetailItem>

                <DetailItem>
                  <DetailLabel variant="body2" sx={{ minWidth: "120px" }}>
                    Power Entry Type:
                  </DetailLabel>
                  <DetailValue variant="body1">
                    {order.powerEntryType || "Not specified"}
                  </DetailValue>
                </DetailItem> */}

                {order.powerDetails && (
                  <Box sx={{ mt: 2 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 600, mb: 1 }}
                    >
                      Power Details
                    </Typography>
                    <Grid container spacing={3}>
                      {/* Right Eye */}
                      {order.powerDetails.right && (
                        <Grid item xs={12} md={6}>
                          <Paper
                            sx={{ p: 2, borderRadius: 2, bgcolor: "#f9f9f9" }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ mb: 1, fontWeight: 600 }}
                            >
                              Right Eye
                            </Typography>
                            <Grid container spacing={1}>
                              {order.powerDetails.right.spherical && (
                                <Grid item xs={6}>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Spherical:{" "}
                                    {order.powerDetails.right.spherical}
                                  </Typography>
                                </Grid>
                              )}
                              {order.powerDetails.right.cylindrical && (
                                <Grid item xs={6}>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Cylindrical:{" "}
                                    {order.powerDetails.right.cylindrical}
                                  </Typography>
                                </Grid>
                              )}
                              {order.powerDetails.right.axis && (
                                <Grid item xs={6}>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Axis: {order.powerDetails.right.axis}
                                  </Typography>
                                </Grid>
                              )}
                              {order.powerDetails.right.addition && (
                                <Grid item xs={6}>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Addition:{" "}
                                    {order.powerDetails.right.addition}
                                  </Typography>
                                </Grid>
                              )}
                            </Grid>
                          </Paper>
                        </Grid>
                      )}

                      {/* Left Eye */}
                      {order.powerDetails.left && (
                        <Grid item xs={12} md={6}>
                          <Paper
                            sx={{ p: 2, borderRadius: 2, bgcolor: "#f9f9f9" }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ mb: 1, fontWeight: 600 }}
                            >
                              Left Eye
                            </Typography>
                            <Grid container spacing={1}>
                              {order.powerDetails.left.spherical && (
                                <Grid item xs={6}>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Spherical:{" "}
                                    {order.powerDetails.left.spherical}
                                  </Typography>
                                </Grid>
                              )}
                              {order.powerDetails.left.cylindrical && (
                                <Grid item xs={6}>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Cylindrical:{" "}
                                    {order.powerDetails.left.cylindrical}
                                  </Typography>
                                </Grid>
                              )}
                              {order.powerDetails.left.axis && (
                                <Grid item xs={6}>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Axis: {order.powerDetails.left.axis}
                                  </Typography>
                                </Grid>
                              )}
                              {order.powerDetails.left.addition && (
                                <Grid item xs={6}>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Addition: {order.powerDetails.left.addition}
                                  </Typography>
                                </Grid>
                              )}
                            </Grid>
                          </Paper>
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                )}

                <DetailItem sx={{ mt: 2 }}>
                  <DetailLabel variant="body2" sx={{ minWidth: "120px" }}>
                    Fitting Charge:
                  </DetailLabel>
                  <DetailValue variant="body1">
                    ₹{order.fittingCharge}
                  </DetailValue>
                </DetailItem>
              </>
            )}
          </DetailCard>

          {/* Total Section */}
          <DetailCard
            component={motion.div}
            whileHover={{ y: -5 }}
            sx={{
              background: "linear-gradient(to right, #6a11cb, #2575fc)",
              color: "white",
            }}
          >
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Total Amount
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  ₹{order.totalAmount}
                </Typography>
              </Grid>
            </Grid>
          </DetailCard>

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 3,
              flexDirection: isMobile ? "column" : "row",
              gap: 2,
            }}
          >
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={() => navigate("/orders")}
              sx={{
                borderColor: "#6a11cb",
                color: "#6a11cb",
                "&:hover": {
                  borderColor: "#2575fc",
                  backgroundColor: "rgba(106, 17, 203, 0.05)",
                },
              }}
            >
              Back to Orders
            </Button>

            {!order.isGroupOrder && (
              <Button
                variant="contained"
                startIcon={<Delete />}
                color="error"
                onClick={() => setDeleteDialogOpen(true)}
                sx={{
                  backgroundColor: "#e74c3c",
                  "&:hover": {
                    backgroundColor: "#c0392b",
                  },
                }}
              >
                Delete Order
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Order</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this order? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            disabled={isDeleting}
          >
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

export default OrderDetails;

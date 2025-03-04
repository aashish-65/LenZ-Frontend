import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Divider,
  Skeleton,
  useMediaQuery,
  useTheme,
  Avatar,
  Chip,
  Badge,
  IconButton,
  Paper,
  Tooltip,
  alpha,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CallIcon from "@mui/icons-material/Call";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion, AnimatePresence } from "framer-motion";
import { styled } from "@mui/material/styles";

// Styled components for enhanced UI
const GradientCard = styled(Card)(({ theme }) => ({
  background: "linear-gradient(1deg, #6a11cb 0%, #2575fc 100%)",
  borderRadius: 16,
  boxShadow: "0 10px 20px rgba(106, 17, 203, 0.2)",
  overflow: "hidden",
  position: "relative",
  transition: "all 0.3s ease",
  "&::before": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
    zIndex: 1,
  },
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 15px 30px rgba(106, 17, 203, 0.3)",
  },
}));

const WhiteCard = styled(Card)(({ theme }) => ({
  background: "#fff",
  borderRadius: 16,
  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.08)",
  overflow: "hidden",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 15px 30px rgba(106, 17, 203, 0.2)",
  },
}));

const StatusChip = styled(Chip)(({ status }) => ({
  fontWeight: "bold",
  fontSize: "0.75rem",
  borderRadius: "12px",
  padding: "0 2px",
  height: "24px",
  backgroundColor:
    status === "Pickup Accepted"
      ? alpha("#6a11cb", 0.1)
      : status === "Out for Delivery"
      ? alpha("#00c853", 0.1)
      : alpha("#ff9800", 0.1),
  color:
    status === "Pickup Accepted"
      ? "#6a11cb"
      : status === "Out for Delivery"
      ? "#00c853"
      : "#ff9800",
  border: `1px solid ${
    status === "Pickup Accepted"
      ? "#6a11cb"
      : status === "Out for Delivery"
      ? "#00c853"
      : "#ff9800"
  }`,
}));

const OtpChip = styled(Chip)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: alpha("#6a11cb", 0.1),
  color: "#6a11cb",
  borderRadius: "8px",
  letterSpacing: "1px",
  fontFamily: "monospace",
  border: "1px dashed #6a11cb",
}));

const CallButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: alpha("#00c853", 0.1),
  color: "#00c853",
  "&:hover": {
    backgroundColor: alpha("#00c853", 0.2),
  },
}));

const ViewDetailsButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontSize: "0.75rem",
  borderRadius: "8px",
  padding: "4px 12px",
  backgroundColor: alpha("#2575fc", 0.1),
  color: "#2575fc",
  "&:hover": {
    backgroundColor: alpha("#2575fc", 0.2),
  },
}));

const DashboardSkeleton = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 4,
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        color: "#fff",
      }}
    >
      {/* Skeleton for Welcome Message */}
      <Skeleton
        variant="text"
        animation="wave"
        sx={{
          fontSize: "3rem",
          width: "60%",
          marginBottom: 4,
          bgcolor: "rgba(255, 255, 255, 0.3)",
        }}
      />

      <Grid container spacing={4} maxWidth="lg">
        {/* Active Deliveries Skeleton */}
        <Grid item xs={12}>
          <WhiteCard>
            <CardContent>
              <Skeleton
                variant="text"
                animation="wave"
                sx={{ fontSize: "1.5rem", width: "40%", bgcolor: "grey.300" }}
              />
              <Divider sx={{ marginY: 2 }} />
              {[1, 2].map((item) => (
                <Box key={item} sx={{ mb: 2 }}>
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    height={80}
                    sx={{ borderRadius: "12px", bgcolor: "grey.200" }}
                  />
                </Box>
              ))}
            </CardContent>
          </WhiteCard>
        </Grid>
        {/* Create Order Section Skeleton */}
        <Grid item xs={12}>
          <GradientCard>
            <CardContent>
              <Skeleton
                variant="text"
                animation="wave"
                sx={{
                  fontSize: "1.5rem",
                  width: "40%",
                  bgcolor: "rgba(255, 255, 255, 0.3)",
                }}
              />
              <Divider
                sx={{ marginY: 2, bgcolor: "rgba(255, 255, 255, 0.2)" }}
              />
              <Box textAlign="center">
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width={180}
                  height={50}
                  sx={{
                    borderRadius: "12px",
                    bgcolor: "rgba(255, 255, 255, 0.3)",
                    margin: "0 auto",
                  }}
                />
              </Box>
            </CardContent>
          </GradientCard>
        </Grid>
        {/* Profile Section Skeleton */}
        <Grid item xs={12} md={6}>
          <WhiteCard>
            <CardContent>
              <Skeleton
                variant="text"
                animation="wave"
                sx={{ fontSize: "1.5rem", width: "40%", bgcolor: "grey.300" }}
              />
              <Divider sx={{ marginY: 2 }} />
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Skeleton
                  variant="circular"
                  width={60}
                  height={60}
                  sx={{ mr: 2 }}
                />
                <Box>
                  <Skeleton variant="text" width={120} />
                  <Skeleton variant="text" width={160} />
                </Box>
              </Box>
              <Skeleton
                variant="text"
                animation="wave"
                sx={{ bgcolor: "grey.300" }}
              />
              <Skeleton
                variant="text"
                animation="wave"
                sx={{ bgcolor: "grey.300" }}
              />
            </CardContent>
          </WhiteCard>
        </Grid>

        {/* Orders Section Skeleton */}
        <Grid item xs={12} md={6}>
          <WhiteCard>
            <CardContent>
              <Skeleton
                variant="text"
                animation="wave"
                sx={{ fontSize: "1.5rem", width: "40%", bgcolor: "grey.300" }}
              />
              <Divider sx={{ marginY: 2 }} />
              <Box display="flex" justifyContent="center" gap={2}>
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width={120}
                  height={40}
                  sx={{ borderRadius: "8px", bgcolor: "grey.300" }}
                />
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width={160}
                  height={40}
                  sx={{ borderRadius: "8px", bgcolor: "grey.300" }}
                />
              </Box>
            </CardContent>
          </WhiteCard>
        </Grid>
      </Grid>
    </Box>
  );
};

const Dashboard = () => {
  const { user, authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeDeliveries, setActiveDeliveries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  // Simulate fetching active deliveries
  useEffect(() => {
    // This would be replaced with an actual API call
    const fetchActiveDeliveries = async () => {
      setIsLoading(true);
      try {
        // Simulating API response with mock data
        const response = await axios.get(
          "https://lenz-backend.onrender.com/api/orders/active-shop-orders",
          { headers: { "lenz-api-key": "a99ed2023194a3356d37634474417f8b" } }
        );
        setActiveDeliveries(response.data.data);
        setIsLoading(false);
      } catch (err) {
        setError("Error fetching active deliveries");
        console.error(error, " ", err);
        setIsLoading(false);
      }
    };

    fetchActiveDeliveries();
  }, [authToken, error]);

  const handleCreateOrder = () => {
    navigate("/create-order");
  };

  const handleGoToOrders = () => {
    navigate("/orders");
  };

  const handleBookForPickup = () => {
    navigate("/pickup-orders");
  };

  const handleViewDetails = (orderId) => {
    navigate(`/group-orders/${orderId}`);
  };

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleCopyOtp = (otp) => {
    navigator.clipboard.writeText(otp);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const cardHoverVariants = {
    hover: {
      scale: 1.02,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
    },
  };

  if (!user) {
    return <DashboardSkeleton />;
  }

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: { xs: 2, md: 4 },
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        color: "#fff",
      }}
    >
      {/* Welcome message with badge */}
      <Box
        component={motion.div}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 4,
          position: "relative",
        }}
      >
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <Chip
              label={user?.plan || "Base Plan"}
              size="small"
              sx={{
                backgroundColor: "#00c853",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "0.65rem",
              }}
            />
          }
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              mb: 2,
              border: "3px solid white",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
            alt={user?.name || "User"}
            // src={user?.avatar || "https://via.placeholder.com/80"}
          />
        </Badge>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            textShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          Welcome, {user?.name || "User"}!
        </Typography>
      </Box>

      {/* Dashboard content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ width: "100%", maxWidth: "1200px" }}
      >
        <Grid container spacing={3}>
          {/* Active Deliveries Section */}
          <Grid item xs={12}>
            <motion.div variants={itemVariants}>
              <WhiteCard
                component={motion.div}
                whileHover={cardHoverVariants.hover}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <LocalShippingIcon sx={{ mr: 1, color: "#6a11cb" }} />
                      <Typography
                        variant="h5"
                        color="text.primary"
                        fontWeight="bold"
                      >
                        Active Deliveries
                      </Typography>
                    </Box>
                    <Chip
                      label={`${activeDeliveries.length} Active`}
                      size="small"
                      sx={{
                        backgroundColor: alpha("#6a11cb", 0.1),
                        color: "#6a11cb",
                        fontWeight: "bold",
                      }}
                    />
                  </Box>
                  <Divider sx={{ mb: 2 }} />

                  {isLoading ? (
                    // Skeleton loading state
                    Array(2)
                      .fill()
                      .map((_, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                          <Skeleton
                            variant="rectangular"
                            animation="wave"
                            height={80}
                            sx={{ borderRadius: "12px", bgcolor: "grey.200" }}
                          />
                        </Box>
                      ))
                  ) : activeDeliveries.length > 0 ? (
                    // Active deliveries
                    <AnimatePresence>
                      {activeDeliveries.map((delivery) => (
                        <motion.div
                          key={delivery.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Paper
                            elevation={0}
                            sx={{
                              p: 2,
                              mb: 2,
                              borderRadius: "12px",
                              backgroundColor: alpha("#f5f5f5", 0.7),
                              border: "1px solid #f0f0f0",
                              display: "flex",
                              flexDirection: { xs: "column", sm: "row" },
                              alignItems: { xs: "flex-start", sm: "center" },
                              justifyContent: "space-between",
                              gap: 2,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                                flex: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Typography
                                  variant="subtitle1"
                                  fontWeight="bold"
                                  color="text.primary"
                                >
                                  #{delivery.id.slice(-8)}
                                </Typography>
                                <StatusChip
                                  label={delivery.trackingStatus}
                                  status={delivery.trackingStatus}
                                  size="small"
                                  sx={{
                                    mr: isXs ? 2 : 5,
                                    ml: isXs ? 5 : 5,
                                  }}
                                />
                              </Box>

                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <Avatar
                                  sx={{
                                    width: 24,
                                    height: 24,
                                    bgcolor: alpha("#6a11cb", 0.1),
                                  }}
                                >
                                  <Typography variant="caption" color="#6a11cb">
                                    {delivery.deliveryPersonName.charAt(0)}
                                  </Typography>
                                </Avatar>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {delivery.deliveryPersonName}
                                </Typography>
                              </Box>
                            </Box>

                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                flexWrap: { xs: "wrap", md: "nowrap" },
                                justifyContent: {
                                  xs: "space-between",
                                  md: "flex-end",
                                },
                                width: { xs: "100%", md: "auto" },
                              }}
                            >
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <OtpChip
                                  label={`OTP: ${delivery.otpCode}`}
                                  size="small"
                                  deleteIcon={
                                      copied ? (
                                        <CheckCircleIcon fontSize="small" color="success.main"/>
                                      ) : (
                                        <ContentCopyIcon fontSize="small" />
                                      )
                                  }
                                  onDelete={() =>
                                    handleCopyOtp(delivery.otpCode)
                                  }
                                />
                              </Box>

                              <Tooltip title="Call Delivery Person">
                                <CallButton
                                  size="small"
                                  onClick={() =>
                                    handleCall(delivery.deliveryPersonPhone)
                                  }
                                >
                                  <CallIcon fontSize="small" />
                                </CallButton>
                              </Tooltip>

                              <ViewDetailsButton
                                endIcon={<InfoOutlinedIcon fontSize="small" />}
                                onClick={() => handleViewDetails(delivery.id)}
                                size="small"
                              >
                                View Details
                              </ViewDetailsButton>
                            </Box>
                          </Paper>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  ) : (
                    // No active deliveries
                    <Box
                      sx={{
                        textAlign: "center",
                        py: 3,
                        backgroundColor: alpha("#f5f5f5", 0.5),
                        borderRadius: "12px",
                      }}
                    >
                      <Typography variant="body1" color="text.secondary">
                        No active deliveries at the moment
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </WhiteCard>
            </motion.div>
          </Grid>

          {/* Create Order Section */}
          <Grid item xs={12}>
            <motion.div variants={itemVariants}>
              <GradientCard
                component={motion.div}
                whileHover={cardHoverVariants.hover}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    gutterBottom
                    color="white"
                    fontWeight="bold"
                    sx={{ textShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)" }}
                  >
                    Create New Order
                  </Typography>
                  <Divider
                    sx={{ marginY: 2, bgcolor: "rgba(255, 255, 255, 0.2)" }}
                  />

                  <Box textAlign="center">
                    <Button
                      variant="contained"
                      startIcon={<AddShoppingCartIcon />}
                      onClick={handleCreateOrder}
                      sx={{
                        py: 1.5,
                        px: 4,
                        fontSize: "16px",
                        fontWeight: "bold",
                        borderRadius: "12px",
                        backgroundColor: "#00c853",
                        textTransform: "none",
                        boxShadow: "0 8px 16px rgba(0, 200, 83, 0.3)",
                        "&:hover": {
                          backgroundColor: "#00a844",
                          boxShadow: "0 8px 20px rgba(0, 200, 83, 0.4)",
                        },
                      }}
                    >
                      Create New Order
                    </Button>
                  </Box>
                </CardContent>
              </GradientCard>
            </motion.div>
          </Grid>

          {/* Profile Section */}
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <WhiteCard
                component={motion.div}
                whileHover={cardHoverVariants.hover}
                onClick={() => navigate("/profile")}
                sx={{ cursor: "pointer" }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    color="text.primary"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Your Profile
                  </Typography>
                  <Divider sx={{ marginY: 2 }} />

                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        mr: 2,
                        background:
                          "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                      }}
                    >
                      {user?.name?.charAt(0) || "U"}
                    </Avatar>
                    <Box>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                      >
                        {user?.name || "John Doe"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user?.email || "johndoe@example.com"}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 1.5,
                      borderRadius: "12px",
                      backgroundColor: alpha("#f5f5f5", 0.7),
                    }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Subscription Plan
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="#6a11cb"
                      >
                        {user?.plan || "Base Plan"}
                      </Typography>
                    </Box>
                    {/* <Chip
                      label="Upgrade"
                      size="small"
                      sx={{
                        backgroundColor: alpha("#6a11cb", 0.1),
                        color: "#6a11cb",
                        fontWeight: "bold",
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: alpha("#6a11cb", 0.2),
                        },
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/upgrade-plan");
                      }}
                    /> */}
                  </Box>
                </CardContent>
              </WhiteCard>
            </motion.div>
          </Grid>

          {/* Orders Button Section */}
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <WhiteCard
                component={motion.div}
                whileHover={cardHoverVariants.hover}
              >
                <CardContent sx={{ height: "216.825px" }}>
                  <Typography
                    variant="h5"
                    color="text.primary"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Your Orders
                  </Typography>
                  <Divider sx={{ marginY: 2 }} />

                  <Box
                    sx={{
                      py: 4,
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      justifyContent: "center",
                      gap: 2,
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={handleGoToOrders}
                      sx={{
                        py: 1.5,
                        px: 3,
                        fontSize: "15px",
                        borderRadius: "12px",
                        borderColor: "#6a11cb",
                        color: "#6a11cb",
                        fontWeight: "medium",
                        textTransform: "none",
                        borderWidth: "1.5px",
                        "&:hover": {
                          borderWidth: "1.5px",
                          backgroundColor: alpha("#6a11cb", 0.05),
                        },
                      }}
                    >
                      View All Orders
                    </Button>

                    <Button
                      variant="contained"
                      onClick={handleBookForPickup}
                      sx={{
                        py: 1.5,
                        px: 3,
                        fontSize: "15px",
                        borderRadius: "12px",
                        color: "#fff",
                        fontWeight: "medium",
                        textTransform: "none",
                        background:
                          "linear-gradient(135deg, #6a11cb 30%, #2575fc 90%)",
                        boxShadow: "0 8px 16px rgba(37, 117, 252, 0.2)",
                        "&:hover": {
                          boxShadow: "0 8px 20px rgba(37, 117, 252, 0.4)",
                        },
                      }}
                    >
                      Book For Pickup
                    </Button>
                  </Box>
                </CardContent>
              </WhiteCard>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Box>
  );
};

export default Dashboard;

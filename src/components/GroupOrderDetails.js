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
  Button,
  Skeleton,
  useMediaQuery,
  LinearProgress,
  Chip,
  Divider,
  Container,
  Avatar,
  IconButton,
  Tooltip,
  alpha,
  useTheme,
  Fade,
  Zoom,
  Collapse,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PaymentIcon from "@mui/icons-material/Payment";
import PendingIcon from "@mui/icons-material/Pending";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PaidIcon from "@mui/icons-material/CurrencyRupee";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ListAltIcon from "@mui/icons-material/ListAlt";

const GroupOrderDetails = () => {
  const { groupOrderId } = useParams();
  const [groupOrder, setGroupOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const { authToken } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("md"));
  const isMd = useMediaQuery(theme.breakpoints.down("lg"));
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const [otp, setOtp] = useState(null);

  useEffect(() => {
    const fetchGroupOrderDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/orders/get-group-order/${groupOrderId}`,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        setGroupOrder(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        // Simulate slightly longer loading for animation effect
        setTimeout(() => {
          setLoading(false);
        }, 800);
      }
    };

    fetchGroupOrderDetails();
  }, [groupOrderId, authToken]);

  useEffect(() => {
    const fetchOtp = async () => {
      if (
        groupOrder &&
        (groupOrder.tracking_status === "Pickup Accepted" ||
          groupOrder.tracking_status === "Out For Delivery")
      ) {
        const purpose =
          groupOrder.tracking_status === "Pickup Accepted"
            ? "shop_pickup"
            : "shop_delivery";
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/otp/request-tracking-otp`,
            {
              groupOrder_id: groupOrder._id,
              purpose: purpose,
            },
            { headers: { "lenz-api-key": "a99ed2023194a3356d37634474417f8b" } }
          );
          setOtp(response.data.otp_code);
          setError(null);
        } catch (err) {
          setError(err.message);
          setOtp(null);
        }
      }
    };

    fetchOtp();
  }, [groupOrder, authToken]);

  // Copy Order ID function
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Toggle order expansion for mobile view
  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  // Format date from ISO string (assuming order has createdAt property)
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  // Color for Tracking Status with enhanced palette
  const getStatusColor = (status) => {
    switch (status) {
      case "Order Placed For Pickup":
        return {
          main: theme.palette.warning.main,
          light: theme.palette.warning.light,
          dark: theme.palette.warning.dark,
          contrastText: theme.palette.warning.contrastText,
        };
      case "Pickup Accepted":
        return {
          main: theme.palette.info.main,
          light: theme.palette.info.light,
          dark: theme.palette.info.dark,
          contrastText: theme.palette.info.contrastText,
        };
      case "Order Picked Up":
        return {
          main: theme.palette.success.main,
          light: theme.palette.success.light,
          dark: theme.palette.success.dark,
          contrastText: theme.palette.success.contrastText,
        };
      case "Order Received By Admin":
        return {
          main: theme.palette.secondary.main,
          light: theme.palette.secondary.light,
          dark: theme.palette.secondary.dark,
          contrastText: theme.palette.secondary.contrastText,
        };
      case "Work Completed":
        return {
          main: theme.palette.primary.main,
          light: theme.palette.primary.light,
          dark: theme.palette.primary.dark,
          contrastText: theme.palette.primary.contrastText,
        };
      case "Internal Tracking":
        return {
          main: theme.palette.primary.main,
          light: theme.palette.primary.light,
          dark: theme.palette.primary.dark,
          contrastText: theme.palette.primary.contrastText,
        };
      case "Delivery Accepted":
        return {
          main: theme.palette.info.main,
          light: theme.palette.info.light,
          dark: theme.palette.info.dark,
          contrastText: theme.palette.info.contrastText,
        };
      case "Out For Delivery":
        return {
          main: "#3f51b5", // Indigo
          light: "#7986cb",
          dark: "#303f9f",
          contrastText: "#ffffff",
        };
      case "Order Completed":
        return {
          main: "#2e7d32", // Dark green
          light: "#60ad5e",
          dark: "#005005",
          contrastText: "#ffffff",
        };
      default:
        return {
          main: theme.palette.text.primary,
          light: theme.palette.text.secondary,
          dark: theme.palette.text.primary,
          contrastText: theme.palette.background.paper,
        };
    }
  };

  // Progress Bar Value
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
      case "Internal Tracking":
        return 70;
      case "Delivery Accepted":
        return 70;
      case "Out For Delivery":
        return 84;
      case "Order Completed":
        return 100;
      default:
        return 0;
    }
  };

  // Status Icon with more detailed icons
  const getStatusIcon = (status) => {
    switch (status) {
      case "Order Placed For Pickup":
        return <PendingIcon />;
      case "Pickup Accepted":
        return <CheckCircleIcon />;
      case "Order Picked Up":
        return <LocalShippingIcon />;
      case "Order Received By Admin":
        return <AssignmentTurnedInIcon />;
      case "Work Completed":
        return <CheckCircleIcon />;
      case "Internal Tracking":
        return <LocalShippingIcon />;
      case "Delivery Accepted":
        return <PersonIcon />;
      case "Out For Delivery":
        return <LocalShippingIcon />;
      case "Order Completed":
        return <CheckCircleIcon />;
      default:
        return <PendingIcon />;
    }
  };

  // Status step labels for timeline
  const getStatusSteps = () => {
    return [
      {
        label: "Order Placed",
        icon: <ReceiptIcon fontSize="small" />,
        description: "Order placed for pickup",
      },
      {
        label: "Pickup Accepted",
        icon: <CheckCircleIcon fontSize="small" />,
        description: "Pickup request accepted",
      },
      {
        label: "Picked Up",
        icon: <LocalShippingIcon fontSize="small" />,
        description: "Order picked up",
      },
      {
        label: "Received",
        icon: <AssignmentTurnedInIcon fontSize="small" />,
        description: "Order received by admin",
      },
      {
        label: "Processed",
        icon: <CheckCircleIcon fontSize="small" />,
        description: "Work completed",
      },
      {
        label: "Out for Delivery",
        icon: <LocalShippingIcon fontSize="small" />,
        description: "Order out for delivery",
      },
      {
        label: "Delivered",
        icon: <CheckCircleIcon fontSize="small" />,
        description: "Order completed",
      },
    ];
  };

  // Get current step index based on status
  const getCurrentStepIndex = (status) => {
    switch (status) {
      case "Order Placed For Pickup":
        return 0;
      case "Pickup Accepted":
        return 1;
      case "Order Picked Up":
        return 2;
      case "Order Received By Admin":
        return 3;
      case "Work Completed":
      case "Internal Tracking":
      case "Delivery Accepted":
        return 4;
      case "Out For Delivery":
        return 5;
      case "Order Completed":
        return 6;
      default:
        return 0;
    }
  };

  // Function to generate random colors for customer avatars
  const getAvatarColor = (name) => {
    if (!name) return "#1976d2";
    const colors = [
      "#ef5350",
      "#ec407a",
      "#ab47bc",
      "#7e57c2",
      "#5c6bc0",
      "#42a5f5",
      "#29b6f6",
      "#26c6da",
      "#26a69a",
      "#66bb6a",
      "#9ccc65",
      "#d4e157",
    ];
    const charCode = name.charCodeAt(0);
    return colors[charCode % colors.length];
  };

  // Loading Skeleton
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Skeleton
            variant="rounded"
            width={120}
            height={40}
            sx={{ borderRadius: 2 }}
          />
        </Box>

        <Zoom in={true} style={{ transitionDelay: "150ms" }}>
          <Skeleton
            variant="rounded"
            width="100%"
            height={250}
            sx={{ mb: 4, borderRadius: 3 }}
          />
        </Zoom>

        <Fade in={true} style={{ transitionDelay: "300ms" }}>
          <Box>
            <Skeleton variant="text" width={250} height={40} sx={{ mb: 2 }} />
            {[1, 2, 3].map((i) => (
              <Skeleton
                key={i}
                variant="rounded"
                width="100%"
                height={70}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  opacity: 1 - i * 0.2,
                }}
              />
            ))}
          </Box>
        </Fade>
      </Container>
    );
  }

  // Error State
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Zoom in={true}>
          <Card
            sx={{
              p: 4,
              borderRadius: 3,
              textAlign: "center",
              boxShadow: theme.shadows[10],
              background: `linear-gradient(135deg, ${alpha(
                theme.palette.error.light,
                0.1
              )} 0%, ${alpha(theme.palette.error.dark, 0.1)} 100%)`,
              border: `1px solid ${theme.palette.error.main}20`,
            }}
          >
            <Typography
              color="error"
              variant="h5"
              sx={{ mb: 2, fontWeight: "bold" }}
            >
              Unable to Load Order Details
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              We encountered an error: {error}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
              sx={{
                borderRadius: 2,
                py: 1.2,
                px: 3,
              }}
            >
              Return to Orders
            </Button>
          </Card>
        </Zoom>
      </Container>
    );
  }

  // Empty State
  if (!groupOrder) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Zoom in={true}>
          <Card
            sx={{
              p: 4,
              borderRadius: 3,
              textAlign: "center",
              boxShadow: theme.shadows[5],
              background: `linear-gradient(135deg, ${alpha(
                theme.palette.primary.light,
                0.05
              )} 0%, ${alpha(theme.palette.primary.dark, 0.05)} 100%)`,
            }}
          >
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
              No Group Order Found
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              The requested group order does not exist or has been removed.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
              sx={{
                borderRadius: 2,
                py: 1.2,
                px: 3,
              }}
            >
              Return to Orders
            </Button>
          </Card>
        </Zoom>
      </Container>
    );
  }

  // Get status color object for current order
  const statusColor = getStatusColor(groupOrder.tracking_status);
  const currentStepIndex = getCurrentStepIndex(groupOrder.tracking_status);
  const statusSteps = getStatusSteps();

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 2, sm: 4 },
        px: { xs: 1.5, sm: 3 },
      }}
    >
      {/* Back Button with animations */}
      <Fade in={true} style={{ transitionDelay: "100ms" }}>
        <Box
          sx={{
            mb: { xs: 6, sm: 6 },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
              border: `5px solid ${theme.palette.primary.main}`,
              borderRadius: 2,
              transition: "all 0.2s ease-in-out",
              color: "whitesmoke",
              "&:hover": {
                transform: "translateX(-5px)",
                bgcolor: alpha(theme.palette.primary.main, 0.05),
              },
            }}
          >
            Back to Orders
          </Button>
        </Box>
      </Fade>

      {/* Order Status Card with Zoom animation */}
      <Zoom in={true} style={{ transitionDelay: "200ms" }}>
        <Card
          elevation={isSm ? 2 : 3}
          sx={{
            mb: 4,
            borderRadius: { xs: 2, sm: 3 },
            overflow: "visible",
            position: "relative",
            border: `1px solid ${statusColor.main}30`,
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              boxShadow: `0 8px 32px -8px ${alpha(statusColor.main, 0.3)}`,
            },
          }}
        >
          {/* Status Chip */}
          <Box
            sx={{
              position: "absolute",
              top: { xs: -25, sm: -20 },
              left: { xs: 16, sm: 24 },
              backgroundColor: "background.paper",
              px: 2,
              borderRadius: 4,
              zIndex: 1,
            }}
          >
            <Chip
              icon={getStatusIcon(groupOrder.tracking_status)}
              label={groupOrder.tracking_status}
              sx={{
                py: 2.5,
                mt: 0.5,
                fontWeight: "bold",
                backgroundColor: statusColor.main,
                color: statusColor.contrastText,
                "& .MuiChip-icon": { color: statusColor.contrastText },
                boxShadow: `0 4px 12px -2px ${alpha(statusColor.main, 0.4)}`,
              }}
            />
          </Box>

          <CardContent sx={{ pt: { xs: 3, sm: 4 }, pb: { xs: 2, sm: 3 } }}>
            {/* Order Header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: { xs: 2, sm: 3 },
                gap: 1.5,
                flexWrap: "wrap",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: isSm && !isXs ? 30 : 5,
                }}
              >
                <Typography
                  variant={isSm ? "h6" : "h5"}
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    ml: { xs: 0, sm: 1 },
                  }}
                >
                  Group Order{" "}
                  <Typography
                    component="span"
                    color="text.secondary"
                    variant="body2"
                    sx={{ display: { xs: "inline", sm: "inline" } }}
                  >
                    #
                  </Typography>
                  <Typography
                    component="span"
                    sx={{
                      color: statusColor.main,
                      fontSize: { xs: "0.9em", sm: "1em" },
                    }}
                  >
                    {groupOrder._id.slice(-8)}
                  </Typography>
                </Typography>

                {/* OTP Chip */}
                {otp && (
                  <Chip
                    icon={<CheckCircleIcon fontSize="small" />}
                    label={
                      <>
                        {groupOrder.tracking_status === "Pickup Accepted"
                          ? "Pickup OTP: "
                          : "Delivery OTP: "}
                        <Box
                          component="span"
                          sx={{
                            display: "flex",
                            gap: 1,
                            alignItems: "center",
                            ml: 0.5,
                          }}
                        >
                          {otp.split("").map((digit, index) => (
                            <Typography
                              key={index}
                              component="span"
                              sx={{
                                fontWeight: "bold",
                                letterSpacing: 2,
                                fontSize: "1.1rem",
                              }}
                            >
                              {digit}
                            </Typography>
                          ))}
                        </Box>
                      </>
                    }
                    sx={{
                      height: 40,
                      borderRadius: 1.5,
                      bgcolor: alpha(theme.palette.success.main, 0.1),
                      color: theme.palette.success.dark,
                      border: `1px solid ${alpha(
                        theme.palette.success.main,
                        0.2
                      )}`,
                      "& .MuiChip-label": {
                        display: "flex",
                        alignItems: "center",
                        py: 1,
                      },
                      "& .MuiChip-icon": {
                        color: theme.palette.success.main,
                        fontSize: "18px",
                        ml: 0.5,
                      },
                    }}
                  />
                )}
              </Box>

              {!isSm && (
                <Chip
                  label={`${groupOrder?.orders?.length} Order${
                    groupOrder?.orders?.length !== 1 ? "s" : ""
                  }`}
                  icon={<ListAltIcon />}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ borderRadius: 1.5 }}
                />
              )}
            </Box>

            {/* Progress Tracker */}
            <Box
              sx={{
                mb: 3.5,
                px: { xs: 0, sm: 1, md: 2 },
              }}
            >
              {/* Mobile Stepper */}
              {isMd ? (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 1,
                      fontWeight: "medium",
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    <AccessTimeIcon
                      fontSize="small"
                      sx={{ color: statusColor.main }}
                    />
                    Current Status:
                    <Typography
                      component="span"
                      fontWeight="bold"
                      color={statusColor.main}
                    >
                      {statusSteps[currentStepIndex]?.label ||
                        groupOrder.tracking_status}
                    </Typography>
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={getProgressValue(groupOrder.tracking_status)}
                    sx={{
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: alpha(statusColor.main, 0.15),
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: statusColor.main,
                        transition:
                          "transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
                      },
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 0.5,
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Order Placed
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Completed
                    </Typography>
                  </Box>
                </Box>
              ) : (
                /* Desktop Timeline Stepper */
                <Box sx={{ position: "relative" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      position: "relative",
                      "&:after": {
                        content: '""',
                        position: "absolute",
                        height: "4px",
                        backgroundColor: alpha(statusColor.main, 0.15),
                        left: "10px",
                        right: "10px",
                        top: "13px",
                        zIndex: 0,
                        borderRadius: 2,
                      },
                    }}
                  >
                    {/* Step indicators */}
                    {statusSteps.map((step, index) => (
                      <Box
                        key={index}
                        sx={{
                          zIndex: 1,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          width: 30,
                          position: "relative",
                        }}
                      >
                        <Tooltip title={step.description}>
                          <Avatar
                            sx={{
                              width: 30,
                              height: 30,
                              bgcolor:
                                index <= currentStepIndex
                                  ? statusColor.main
                                  : alpha(theme.palette.text.secondary, 0.2),
                              boxShadow:
                                index <= currentStepIndex
                                  ? `0 0 0 3px ${alpha(statusColor.main, 0.2)}`
                                  : "none",
                              transition: "all 0.3s ease-in-out",
                              mb: 0.5,
                            }}
                          >
                            {step.icon}
                          </Avatar>
                        </Tooltip>
                        <Typography
                          variant="caption"
                          sx={{
                            position: "absolute",
                            top: 40,
                            color:
                              index <= currentStepIndex
                                ? statusColor.main
                                : theme.palette.text.secondary,
                            fontWeight:
                              index <= currentStepIndex ? "bold" : "normal",
                            textAlign: "center",
                            width: 70,
                            left: -20,
                          }}
                        >
                          {step.label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  {/* Progress overlay */}
                  <Box
                    sx={{
                      position: "absolute",
                      height: "4px",
                      backgroundColor: statusColor.main,
                      left: "10px",
                      width: `${
                        (currentStepIndex / (statusSteps.length - 1)) * 100
                      }%`,
                      top: "13px",
                      zIndex: 0,
                      borderRadius: 2,
                      transition: "width 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  />
                </Box>
              )}
            </Box>

            <Divider sx={{ my: isSm ? 3 : 8 }} />

            {/* Order Information Grid */}
            <Grid container spacing={{ xs: 2, sm: 3 }}>
              {/* Order Info Column */}
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        mb: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <InfoOutlinedIcon fontSize="small" color="primary" />
                      Order Information
                    </Typography>

                    {isSm && (
                      <Chip
                        label={`${groupOrder?.orders?.length} Order${
                          groupOrder?.orders?.length !== 1 ? "s" : ""
                        }`}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ borderRadius: 1.5 }}
                      />
                    )}
                  </Box>

                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                      boxShadow: "none",
                      backgroundColor: alpha(theme.palette.primary.main, 0.04),
                      p: 2,
                      mb: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        mb: 2,
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: alpha(theme.palette.primary.main, 0.3),
                          color: theme.palette.primary.main,
                          width: 38,
                          height: 38,
                        }}
                      >
                        <ReceiptIcon fontSize="small" />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Order ID
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: "medium",
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          {isSm
                            ? `${groupOrder._id.slice(-8)}`
                            : groupOrder._id.slice(-8)}
                          <IconButton
                            size="small"
                            onClick={() => copyToClipboard(groupOrder._id)}
                            sx={{
                              opacity: 0.6,
                              "&:hover": { opacity: 1 },
                              ml: -0.5,
                              color: copied ? "success.main" : "inherit",
                            }}
                          >
                            {copied ? (
                              <CheckCircleIcon fontSize="small" />
                            ) : (
                              <ContentCopyIcon fontSize="small" />
                            )}
                          </IconButton>
                        </Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ my: 1.5 }} />

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: alpha(theme.palette.primary.main, 0.3),
                            color: theme.palette.primary.main,
                            width: 38,
                            height: 38,
                          }}
                        >
                          <PaidIcon fontSize="small" />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Total Amount
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold", color: "gray" }}
                          >
                            {groupOrder?.finalAmount?.toLocaleString("en-IN")}
                          </Typography>
                        </Box>
                      </Box>

                      <Tooltip title="Final amount includes all orders and delivery charges">
                        <IconButton
                          size="small"
                          sx={{ mt: -0.5, opacity: 0.7 }}
                        >
                          <HelpOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Card>
                </Box>
              </Grid>

              {/* Payment Details Column */}
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    height: "100%",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      mb: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <PaymentIcon fontSize="small" color="primary" />
                    Payment Details
                  </Typography>

                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                      boxShadow: "none",
                      p: 2,
                      bgcolor: alpha(theme.palette.background.paper, 0.7),
                      backdropFilter: "blur(20px)",
                      mb: 1,
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Box
                          sx={{
                            p: 1.5,
                            borderRadius: 2,
                            bgcolor: alpha(theme.palette.success.main, 0.04),
                          }}
                        >
                          <Typography variant="caption" color="text.secondary">
                            Paid Amount
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: "bold",
                              color: "success.main",
                            }}
                          >
                            ₹{groupOrder?.paidAmount?.toLocaleString("en-IN")}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box
                          sx={{
                            p: 1.5,
                            borderRadius: 2,
                            bgcolor: alpha(theme.palette.error.main, 0.04),
                          }}
                        >
                          <Typography variant="caption" color="text.secondary">
                            Remaining Amount
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: "bold",
                              color: theme.palette.error.main,
                            }}
                          >
                            ₹
                            {(
                              groupOrder.finalAmount - groupOrder.paidAmount
                            ).toLocaleString("en-IN")}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            mt: 1,
                          }}
                        >
                          <Avatar
                            sx={{
                              bgcolor: alpha(theme.palette.info.main, 0.3),
                              color: theme.palette.info.main,
                              width: 38,
                              height: 38,
                            }}
                          >
                            <AccessTimeIcon fontSize="small" />
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              Order Date
                            </Typography>
                            <Typography variant="body1" fontWeight="medium">
                              {formatDate(groupOrder.createdAt)}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Card>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Zoom>

      {/* Individual Orders Section with Fade animation */}
      <Fade in={true} style={{ transitionDelay: "400ms" }}>
        <Box>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <ListAltIcon color="primary" />
            Orders in this Group ({groupOrder?.orders?.length})
          </Typography>

          {/* Orders List */}
          {groupOrder?.orders?.map((order) => (
            <Card
              key={order._id}
              sx={{
                mb: 2,
                borderRadius: 2,
                overflow: "visible",
                transition: "all 0.2s ease-in-out",
                border: `1px solid ${theme.palette.divider}`,
                "&:hover": {
                  boxShadow: theme.shadows[3],
                  borderColor: "transparent",
                },
              }}
            >
              <CardContent
                sx={{ pt: 2, pb: isSm ? 1 : 2, px: { xs: 2, sm: 3 } }}
              >
                {/* Desktop View */}
                {!isSm && (
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={0.5}>
                      <Avatar
                        sx={{
                          bgcolor: getAvatarColor(order.customerDetails?.name),
                          width: 40,
                          height: 40,
                          fontSize: 16,
                        }}
                      >
                        {order.customerDetails?.name ? (
                          order.customerDetails.name.charAt(0).toUpperCase()
                        ) : (
                          <PersonIcon />
                        )}
                      </Avatar>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="subtitle2">
                        {order.customerDetails?.name || "Unknown Customer"}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Order #{order._id.slice(-6)}
                      </Typography>
                    </Grid>
                    <Grid item xs={2.5}>
                      <Typography variant="body2" fontWeight="medium">
                        ₹{order.totalAmount?.toLocaleString("en-IN")}
                      </Typography>
                      <Chip
                        label={order.isGroupOrder ? "Placed" : "Unplaced"}
                        size="small"
                        sx={{
                          fontSize: "0.7rem",
                          height: 20,
                          bgcolor: order.isGroupOrder
                            ? "success.light"
                            : "warning.light",
                          color: order.isGroupOrder
                            ? "success.dark"
                            : "warning.dark",
                        }}
                      />
                    </Grid>
                    <Grid item xs={2.5}>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(order.createdAt)}
                      </Typography>
                    </Grid>

                    <Grid item xs={1} sx={{ textAlign: "right" }}>
                      <Button
                        variant="outlined"
                        size="small"
                        endIcon={<KeyboardArrowRightIcon />}
                        onClick={() => navigate(`/orders/${order._id}/details`)}
                        sx={{ borderRadius: 1.5 }}
                      >
                        View
                      </Button>
                    </Grid>
                  </Grid>
                )}

                {/* Mobile View */}
                {isSm && (
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: getAvatarColor(
                              order.customerDetails?.name
                            ),
                            width: 34,
                            height: 34,
                            fontSize: 15,
                          }}
                        >
                          {order.customerDetails?.name ? (
                            order.customerDetails.name.charAt(0).toUpperCase()
                          ) : (
                            <PersonIcon />
                          )}
                        </Avatar>
                        <Box>
                          <Typography
                            variant="subtitle2"
                            sx={{ lineHeight: 1.2 }}
                          >
                            {order.customerDetails?.name || "Unknown Customer"}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Order #{order._id.slice(-6)}
                          </Typography>
                        </Box>
                      </Box>

                      <IconButton
                        size="small"
                        onClick={() => toggleOrderExpansion(order._id)}
                        sx={{
                          transition: "all 0.2s ease",
                          transform:
                            expandedOrder === order._id
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                        }}
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        px: 1,
                      }}
                    >
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <PaidIcon
                            fontSize="small"
                            color="success"
                            sx={{ fontSize: 16 }}
                          />
                          {order.totalAmount.toLocaleString("en-IN")}
                        </Typography>
                      </Box>

                      <Box sx={{ textAlign: "right" }}>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                        >
                          {formatDate(order.createdAt)}
                        </Typography>
                      </Box>
                    </Box>

                    <Collapse in={expandedOrder === order._id}>
                      <Divider sx={{ my: 1.5 }} />
                      <Box sx={{ px: 1, pb: 1 }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Order Status:
                          <Chip
                            label={order.isGroupOrder ? "Placed" : "Unplaced"}
                            size="small"
                            sx={{
                              ml: 1,
                              fontSize: "0.7rem",
                              height: 20,
                              bgcolor: order.isGroupOrder
                                ? "success.light"
                                : "warning.light",
                              color: order.isGroupOrder
                                ? "success.dark"
                                : "warning.dark",
                            }}
                          />
                        </Typography>

                        <Button
                          fullWidth
                          variant="outlined"
                          size="small"
                          endIcon={<KeyboardArrowRightIcon />}
                          onClick={() =>
                            navigate(`/orders/${order._id}/details`)
                          }
                          sx={{ borderRadius: 1.5, mt: 1 }}
                        >
                          View Order Details
                        </Button>
                      </Box>
                    </Collapse>
                  </Box>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Fade>
    </Container>
  );
};

export default GroupOrderDetails;

import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Button,
  Grid,
  Divider,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PaymentIcon from "@mui/icons-material/Payment";
import VisionIcon from "@mui/icons-material/Visibility";
import SvgIcon from "@mui/material/SvgIcon";
import apiCall from "../utils/api";
import { useTheme } from "@mui/material/styles";

const Bill = ({
  customerDetails,
  frameOptions,
  shiftingOrFitting,
  lensDetails,
  materialDetails,
  // coatingDetails,
  powerDetails,
  powerType,
  powerEntryType,
  shiftingCharge,
  setShiftingCharge,
  fittingCharge,
  setFittingCharge,
  totalAmount,
  setTotalAmount,
  glassType,
  prevStep,
  nextStep,
}) => {
  const { name, billNumber } = customerDetails;
  const { type: frameType } = frameOptions;

  const [charges, setCharges] = useState({
    shiftingCharges: {},
    fittingCharges: {},
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDate] = useState(new Date().toLocaleDateString());

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  useEffect(() => {
    const fetchCharges = async () => {
      setIsLoading(true);
      try {
        const data = await apiCall("/charges/");
        setCharges(data);
      } catch (error) {
        console.error("Failed to fetch charges:", error.message);
        setError("Failed to load charges");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharges();
  }, []);

  const getFrameTypeKey = () => {
    if (frameType === "Rimless") {
      if (glassType === "Sunglass") return "Sunglass";
      if (
        materialDetails === "Poly" &&
        (lensDetails === "SV" || lensDetails === "KT")
      ) {
        return "Poly";
      } else if (lensDetails === "PR" && materialDetails === "Poly") {
        return "PolyPR";
      }
    }
    if (glassType === "Sunglass") return "Sunglass";
    return lensDetails === "PR" ? "PR" : "Normal";
  };

  let total = 0;
  let shiftingAmt = 0;
  let fittingAmt = 0;

  if (shiftingOrFitting === "Shifting" && !isLoading) {
    shiftingAmt = charges[0]?.data[frameType] || 0;
    setShiftingCharge(shiftingAmt);
    total += shiftingAmt;
    setTotalAmount(total);
  } else if (shiftingOrFitting === "Fitting" && !isLoading) {
    const frameCategory = charges[1]?.data[frameType];
    const frameTypeKey = getFrameTypeKey();
    fittingAmt =
      frameCategory?.[frameTypeKey]?.[powerType]?.[powerEntryType] || 0;
    setFittingCharge(fittingAmt);
    total += fittingAmt;
    setTotalAmount(total);
  }

  function SpectacleFrameIcon(props) {
    return (
      <SvgIcon {...props} viewBox="0 0 24 24">
        {/* Left Lens Frame */}
        <circle
          cx="7"
          cy="12"
          r="4"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Right Lens Frame */}
        <circle
          cx="17"
          cy="12"
          r="4"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Bridge */}
        <path
          d="M11 12h2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Temples (Arms of Glasses) */}
        <path
          d="M2 10c1-3 3-5 6-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M22 10c-1-3-3-5-6-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </SvgIcon>
    );
  }

  if (isLoading) {
    return (
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading charges...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  // Mobile-optimized invoice component
  if (isMobile) {
    return (
      <Container maxWidth="md" sx={{ mt: 2, mb: 2, px: 1 }}>
        <Card sx={{ borderRadius: 2, overflow: "hidden", boxShadow: 3 }}>
          <CardHeader
            title="Invoice"
            subheader="LenZ Spectacle Store"
            titleTypographyProps={{
              align: "center",
              variant: "h5",
              color: "primary",
            }}
            subheaderTypographyProps={{
              align: "center",
              variant: "subtitle2",
              color: "text.secondary",
            }}
            sx={{ backgroundColor: "#f4f4f4", py: 1.5 }}
          />
          <CardContent sx={{ p: 1.5 }}>
            {/* Customer Details */}
            <Stack direction="row" justifyContent="space-between" mb={1.5}>
              <Typography variant="body2">
                <strong>Customer:</strong> {name}
              </Typography>
              <Typography variant="body2">
                <strong>Bill #:</strong> {billNumber || "N/A"}
              </Typography>
            </Stack>

            <Divider sx={{ my: 1.5 }} />

            {/* Accordion sections for details */}
            <Accordion disableGutters>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle2">Frame & Charges</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 0 }}>
                <Typography variant="body2" gutterBottom>
                  <strong>Frame Type:</strong> {frameType}
                </Typography>
                {shiftingOrFitting && (
                  <Typography variant="body2" gutterBottom>
                    <strong>{shiftingOrFitting} Charge:</strong> Rs{" "}
                    {shiftingOrFitting === "Shifting"
                      ? shiftingCharge
                      : fittingCharge}
                  </Typography>
                )}
                {lensDetails && (
                  <Typography variant="body2" gutterBottom>
                    <strong>Lens Type:</strong> {lensDetails}
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>

            {powerDetails && (
              <Accordion disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle2">Power Details</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 0 }}>
                  <TableContainer
                    component={Paper}
                    elevation={1}
                    sx={{ mt: 1 }}
                  >
                    <Table size="small">
                      <TableBody>
                        {powerDetails.right && (
                          <TableRow>
                            <TableCell sx={{ p: 1 }}>
                              <Typography variant="body2">Right Eye</Typography>
                            </TableCell>
                            <TableCell sx={{ p: 1 }}>
                              {Object.entries(powerDetails.right).map(
                                ([key, value]) => {
                                  const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
                                  return (
                                  <Typography key={key} variant="body2">
                                    <strong>{capitalizedKey}:</strong> {value}
                                  </Typography>
                                );
                              }
                              )}
                            </TableCell>
                          </TableRow>
                        )}
                        {powerDetails.left && (
                          <TableRow>
                            <TableCell sx={{ p: 1 }}>
                              <Typography variant="body2">Left Eye</Typography>
                            </TableCell>
                            <TableCell sx={{ p: 1 }}>
                              {Object.entries(powerDetails.left).map(
                                ([key, value]) => {
                                  const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
                                  return (
                                  <Typography key={key} variant="body2">
                                    <strong>{capitalizedKey}:</strong> {value}
                                  </Typography>
                                );
                              }
                              )}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            )}

            {/* Total Amount - Always visible */}
            <Box textAlign="center" my={2.5}>
              <Typography
                variant="h6"
                sx={{
                  backgroundColor: "#e0f7fa",
                  padding: 1.5,
                  borderRadius: 1,
                  color: "teal",
                }}
              >
                Total: Rs {totalAmount}
              </Typography>
            </Box>
          </CardContent>

          <Divider />

          {/* Actions */}
          <Box display="flex" justifyContent="space-between" p={1.5}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={prevStep}
              size="small"
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={nextStep}
              size="small"
            >
              Next
            </Button>
          </Box>
        </Card>
      </Container>
    );
  }

  // Tablet and Laptop view - enhanced with better design and fixed layout issues
  return (
    <Container
      maxWidth={isTablet ? "sm" : "lg"}
      sx={{
        my: 3, // Reduced margin to prevent overflow
        pt: isTablet && shiftingOrFitting === "Fitting" ? 40 : 4, // Added top padding to avoid header overlap
        pb: 2,
        animation: "fadeIn 0.4s ease-in-out",
        "@keyframes fadeIn": {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        height: "auto", // Ensure container adjusts to content
        overflow: "visible", // Prevent container from cropping content
      }}
    >
      <Card
        sx={{
          borderRadius: 2,
          overflow: "visible", // Changed from "hidden" to prevent content cropping
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease-in-out",
          maxHeight: "none", // Removed max height restriction
          "&:hover": {
            boxShadow: "0 6px 24px rgba(0,0,0,0.12)",
          },
        }}
      >
        <CardHeader
          avatar={<ReceiptIcon color="primary" fontSize="medium" />}
          title="Invoice"
          subheader={`LenZ Spectacle Store • ${currentDate}`}
          titleTypographyProps={{
            align: "center",
            variant: isTablet ? "h5" : "h5", // Reduced from h4 to h5 for desktop
            color: "primary",
            fontWeight: "bold",
          }}
          subheaderTypographyProps={{
            align: "center",
            variant: "subtitle1",
            color: "text.secondary",
          }}
          sx={{
            backgroundColor: theme.palette.primary,
            color: "white",
            py: 2, // Reduced padding to save space
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "4px", // Reduced from 6px
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            },
          }}
        />
        <CardContent sx={{ p: isTablet ? 2 : 2.5 }}>
          {" "}
          {/* Reduced padding */}
          {/* Customer Details */}
          <Box
            mb={2} // Reduced margin
            p={1.5} // Reduced padding
            sx={{
              backgroundColor: "#f9f9f9",
              borderRadius: 2,
              border: "1px solid #eaeaea",
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={isTablet ? 12 : 6}>
                <Box display="flex" alignItems="center">
                  <Typography variant="h6" color="text.primary">
                    {name}
                  </Typography>
                  <Chip
                    label="Customer"
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ ml: 1 }}
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={isTablet ? 12 : 6}
                sx={{ textAlign: isTablet ? "left" : "right" }}
              >
                <Typography variant="body1" color="text.secondary">
                  <strong>Bill Number:</strong> {billNumber || "N/A"}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          {/* Details Section */}
          <Grid container spacing={2}>
            {" "}
            {/* Reduced spacing */}
            {/* Frame Information */}
            <Grid item xs={12} md={6} mt={4} mb={2}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  height: "100%",
                  border: "1px solid rgb(204, 65, 65)",
                  borderRadius: 2,
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.17)",
                  },
                }}
              >
                <Box display="flex" alignItems="center" mb={1}>
                  {/* <GlassesIcon color="secondary" sx={{ mr: 1 }} /> */}
                  <SpectacleFrameIcon
                    style={{ fontSize: "26px" }}
                    color="secondary"
                    sx={{ mr: 1 }}
                  />
                  <Typography variant="h6" color="text.secondary">
                    Frame Information
                  </Typography>
                </Box>
                <Divider sx={{ mb: 1.5 }} />
                <Box>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Frame Type:</strong>{" "}
                    <Chip
                      label={frameType}
                      size="small"
                      variant="filled"
                      color="secondary"
                      sx={{
                        fontWeight: "bold",
                        ml: 1,
                      }}
                    />
                  </Typography>

                  {lensDetails && (
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Lens Type:</strong>{" "}
                      <Chip
                        label={lensDetails}
                        size="small"
                        variant="outlined"
                        color="primary"
                        sx={{ ml: 1 }}
                      />
                    </Typography>
                  )}

                  {shiftingOrFitting && (
                    <Box
                      mt={1.5}
                      p={1.5}
                      sx={{ backgroundColor: "#f5f5f5", borderRadius: 1 }}
                    >
                      <Typography variant="body1">
                        <strong>{shiftingOrFitting} Charge:</strong> Rs{" "}
                        <Typography
                          component="span"
                          variant="body1"
                          sx={{
                            fontWeight: "bold",
                            color: theme.palette.primary.main,
                          }}
                        >
                          {shiftingOrFitting === "Shifting"
                            ? shiftingCharge
                            : fittingCharge}
                        </Typography>
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Paper>
            </Grid>
            {/* Power Details */}
            {powerDetails && (
              <Grid item xs={12} md={6} mt={4} mb={2}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    height: "100%",
                    border: "1px solid rgb(204, 65, 65)",
                    borderRadius: 2,
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.17)",
                    },
                  }}
                >
                  <Box display="flex" alignItems="center" mb={1}>
                    <VisionIcon color="secondary" sx={{ mr: 1 }} />
                    <Typography variant="h6" color="text.secondary">
                      Power Details
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 1.5 }} />
                  <TableContainer sx={{ borderRadius: 2, overflow: "hidden" }}>
                    <Table size="small">
                      {" "}
                      {/* Always use small size for better space efficiency */}
                      <TableHead>
                        <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                          <TableCell sx={{ fontWeight: "bold", py: 1 }}>
                            Eye
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold", py: 1 }}>
                            Power Values
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {powerDetails.right && (
                          <TableRow
                            sx={{
                              "&:nth-of-type(odd)": {
                                backgroundColor: "#fafafa",
                              },
                              "&:hover": { backgroundColor: "#f0f7ff" },
                            }}
                          >
                            <TableCell sx={{ fontWeight: "medium", py: 1 }}>
                              Right Eye
                            </TableCell>
                            <TableCell sx={{ py: 1 }}>
                              <Grid container spacing={1}>
                                {Object.entries(powerDetails.right).map(
                                  ([key, value]) => {
                                    const capitalizedKey =
                                      key.charAt(0).toUpperCase() +
                                      key.slice(1);
                                    return (
                                      <Grid item xs={6} key={key}>
                                        <Typography variant="body2">
                                          <strong>{capitalizedKey}:</strong>{" "}
                                          {value}
                                        </Typography>
                                      </Grid>
                                    );
                                  }
                                )}
                              </Grid>
                            </TableCell>
                          </TableRow>
                        )}
                        {powerDetails.left && (
                          <TableRow
                            sx={{
                              "&:nth-of-type(odd)": {
                                backgroundColor: "#fafafa",
                              },
                              "&:hover": { backgroundColor: "#f0f7ff" },
                            }}
                          >
                            <TableCell sx={{ fontWeight: "medium", py: 1 }}>
                              Left Eye
                            </TableCell>
                            <TableCell sx={{ py: 1 }}>
                              <Grid container spacing={1}>
                                {Object.entries(powerDetails.left).map(
                                  ([key, value]) => {
                                    const capitalizedKey =
                                      key.charAt(0).toUpperCase() +
                                      key.slice(1);
                                      return(
                                    <Grid item xs={6} key={key}>
                                      <Typography variant="body2">
                                        <strong>{capitalizedKey}:</strong> {value}
                                      </Typography>
                                    </Grid>
                                  );
                                })}
                              </Grid>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
            )}
          </Grid>
          {/* Total Amount */}
          <Box
            textAlign="center"
            my={3} // Reduced margin
            p={2} // Reduced padding
            sx={{
              backgroundColor: "rgba(0, 188, 212, 0.1)",
              borderRadius: 2,
              border: "1px dashed rgba(0, 188, 212, 0.5)",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                width: "6px",
                backgroundColor: theme.palette.primary.main,
              },
            }}
          >
            <Box display="flex" alignItems="center" justifyContent="center">
              <PaymentIcon
                sx={{
                  mr: 1.5,
                  fontSize: 28, // Reduced size
                  color: theme.palette.primary.main,
                }}
              />
              <Typography
                variant="h5" // Consistently use h5 for all views
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.primary.dark,
                }}
              >
                Total Amount: Rs {totalAmount}
              </Typography>
            </Box>
          </Box>
        </CardContent>

        <Divider />

        {/* Actions */}
        <Box
          display="flex"
          justifyContent="space-between"
          p={2}
          sx={{ backgroundColor: "#f8f8f8" }}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={prevStep}
            size="medium" // Consistent size
            sx={{
              px: 3,
              borderRadius: 2,
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={nextStep}
            size="medium" // Consistent size
            sx={{
              px: 3,
              borderRadius: 2,
              boxShadow: "0 4px 8px rgba(0,137,179,0.2)",
              "&:hover": {
                boxShadow: "0 6px 12px rgba(0,137,179,0.3)",
              },
            }}
          >
            Next
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default Bill;

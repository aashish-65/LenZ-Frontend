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
  TableRow,
  Paper,
  useMediaQuery,
} from "@mui/material";
import apiCall from "../utils/api";
import { useTheme } from "@mui/material/styles";

const Bill = ({
  customerDetails,
  frameOptions,
  shiftingOrFitting,
  lensDetails,
  materialDetails,
  coatingDetails,
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

  const [charges, setCharges] = useState({ shiftingCharges: {}, fittingCharges: {} });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

  return (
    <Container maxWidth="md" sx={{ mt: isMobile ? 20 : 6, mb: isMobile ? 1 : 0}}>
      <Card sx={{ mt: 4, borderRadius: 2, overflow: "hidden", boxShadow: 6 }}>
        <CardHeader
          title="Invoice"
          subheader="LenZ Spectacle Store"
          titleTypographyProps={{
            align: "center",
            variant: "h4",
            color: "primary",
          }}
          subheaderTypographyProps={{
            align: "center",
            variant: "subtitle1",
            color: "text.secondary",
          }}
          sx={{ backgroundColor: "#f4f4f4", paddingY: 2 }}
        />
        <CardContent>
          {/* Customer Details */}
          <Box mb={3}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1">
                  <strong>Customer Name:</strong> {name}
                </Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Typography variant="body1">
                  <strong>Bill Number:</strong> {billNumber || "N/A"}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Frame Information */}
          <Box mb={3}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Frame Information
            </Typography>
            <Typography variant="body1">
              <strong>Frame Type:</strong> {frameType}
            </Typography>
          </Box>

          {/* Charges */}
          {shiftingOrFitting && (
            <Box mb={3}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {shiftingOrFitting} Charges
              </Typography>
              <Typography variant="body1">
                <strong>Charge Amount:</strong> Rs{" "}
                {shiftingOrFitting === "Shifting"
                  ? shiftingCharge
                  : fittingCharge}
              </Typography>
            </Box>
          )}

          {/* Lens Details */}
          {lensDetails && (
            <Box mb={3}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Lens Details
              </Typography>
              <Typography variant="body1">
                <strong>Lens Type:</strong> {lensDetails}
              </Typography>
            </Box>
          )}

          {/* Power Details */}
          {powerDetails && (
            <Box mb={3}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Power Details
              </Typography>
              <TableContainer component={Paper} elevation={3}>
                <Table size="small">
                  <TableBody>
                    {powerDetails.right && (
                      <TableRow>
                        <TableCell>
                          <Typography variant="subtitle2">
                            Right Eye
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {Object.entries(powerDetails.right).map(
                            ([key, value]) => (
                              <Typography key={key}>
                                <strong>{key}:</strong> {value}
                              </Typography>
                            )
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                    {powerDetails.left && (
                      <TableRow>
                        <TableCell>
                          <Typography variant="subtitle2">
                            Left Eye
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {Object.entries(powerDetails.left).map(
                            ([key, value]) => (
                              <Typography key={key}>
                                <strong>{key}:</strong> {value}
                              </Typography>
                            )
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {/* Total Amount */}
          <Box textAlign="center" my={4}>
            <Typography
              variant="h5"
              sx={{
                backgroundColor: "#e0f7fa",
                padding: 2,
                borderRadius: 1,
                color: "teal",
              }}
            >
              Total Amount: Rs {totalAmount}
            </Typography>
          </Box>
        </CardContent>

        <Divider />

        {/* Actions */}
        <Box display="flex" justifyContent="space-between" p={2}>
          <Button variant="outlined" color="secondary" onClick={prevStep}>
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={nextStep}>
            Next
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default Bill;

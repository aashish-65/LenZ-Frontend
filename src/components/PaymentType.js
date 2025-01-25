import React from "react";
import {
  Typography,
  Button,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

const PaymentType = ({ paymentType, setPaymentType, placeOrder, prevStep }) => {
  const handleCOD = () => {
    setPaymentType("COD");
    placeOrder();
  };

  const handleOnlinePayment = () => {
    setPaymentType("Online");
    placeOrder();
  };

  return (
    <Paper
      elevation={4}
      sx={{
        maxWidth: 600,
        margin: "40px auto",
        padding: "30px",
        borderRadius: 4,
        textAlign: "center",
      }}
    >
      {/* Title */}
      <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
        Select Payment Type
      </Typography>
      <Typography
        variant="subtitle1"
        color="textSecondary"
        gutterBottom
        sx={{ mb: 4 }}
      >
        Please choose your preferred payment method
      </Typography>

      {/* Payment Buttons */}
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Button
            variant={paymentType === "COD" ? "contained" : "outlined"}
            color="primary"
            fullWidth
            sx={{
              py: 1.5,
              fontSize: "16px",
              borderColor: paymentType === "COD" ? "primary.main" : undefined,
            }}
            onClick={handleCOD}
          >
            Cash on Delivery
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant={paymentType === "Online" ? "contained" : "outlined"}
            color="secondary"
            fullWidth
            sx={{
              py: 1.5,
              fontSize: "16px",
              borderColor: paymentType === "Online" ? "secondary.main" : undefined,
            }}
            onClick={handleOnlinePayment}
          >
            Online Payment
          </Button>
        </Grid>
      </Grid>

      {/* Back Button */}
      <Box sx={{ mt: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          color="inherit"
          onClick={prevStep}
          sx={{
            px: 4,
            py: 1,
            borderRadius: 3,
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          Back
        </Button>
      </Box>
    </Paper>
  );
};

export default PaymentType;

import React from "react";
import { Typography, Box, Paper, Button, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

const OrderSuccess = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 600,
          padding: "40px",
          textAlign: "center",
          borderRadius: 6,
        }}
      >
        {/* Success Icon */}
        <CheckCircle
          sx={{
            fontSize: 90,
            color: "green",
            mb: 2,
          }}
        />

        {/* Title */}
        <Typography
          variant="h3"
          fontWeight="bold"
          color="primary"
          gutterBottom
          sx={{ mb: 1 }}
        >
          Order Placed Successfully!
        </Typography>

        {/* Subtext */}
        <Typography
          variant="subtitle1"
          color="textSecondary"
          sx={{ mb: 3 }}
        >
          Your payment method: <strong>Cash on Delivery</strong>
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ mb: 4, px: { xs: 1, sm: 5 } }}
        >
          Thank you for choosing <strong>LenZ</strong>! Your order will be
          processed shortly. Stay tuned for updates.
        </Typography>

        {/* Action Buttons */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
          sx={{ mt: 4 }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 4,
              textTransform: "none",
            }}
            href="/"
          >
            Back to Home
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 4,
              textTransform: "none",
            }}
            href="/orders"
          >
            View My Orders
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default OrderSuccess;

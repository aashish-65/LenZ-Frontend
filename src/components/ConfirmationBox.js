import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Box,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

const ConfirmationBox = ({ placeOrder, prevStep }) => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleConfirm = async () => {
    setLoading(true); // Start loading
    setSelectedOption("confirm");
    try {
      await placeOrder(); // Call the placeOrder function
    } catch (error) {
      console.error("Failed to place order:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleCancel = () => {
    setSelectedOption("cancel");
    navigate("/");
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
        Create The Order
      </Typography>
      <Typography
        variant="subtitle1"
        color="textSecondary"
        gutterBottom
        sx={{ mb: 4 }}
      >
        Please press the CONFIRM button to create the order or press CANCEL
        button to cancel it.
      </Typography>

      {/* Payment Buttons */}
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Button
            variant={selectedOption === "confirm" ? "contained" : "outlined"}
            color="primary"
            fullWidth
            sx={{
              py: 1.5,
              fontSize: "16px",
              borderColor: selectedOption === "confirm" ? "primary.main" : undefined,
            }}
            onClick={handleConfirm}
            disabled={loading} // Disable button when loading
          >
            {loading ? ( // Show CircularProgress when loading
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Confirm" // Show "Confirm" text when not loading
            )}
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant={selectedOption === "cancel" ? "contained" : "outlined"}
            color="secondary"
            fullWidth
            sx={{
              py: 1.5,
              fontSize: "16px",
              borderColor:
                selectedOption === "cancel" ? "secondary.main" : undefined,
            }}
            onClick={handleCancel}
          >
            Cancel
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

export default ConfirmationBox;
import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Divider,
  Slide,
} from "@mui/material";
import { motion } from "framer-motion"; // For animations

const CustomerDetails = ({ setCustomerDetails, nextStep, customerDetails }) => {
  const [name, setName] = useState(customerDetails?.name || "");
  const [billNumber, setBillNumber] = useState(
    customerDetails?.billNumber || ""
  );
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (customerDetails) {
      setName(customerDetails.name ?? "");
      setBillNumber(customerDetails.billNumber ?? "");
    }
    // Show the form with an animation on mount
    setShowForm(true);
  }, [customerDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCustomerDetails({ name, billNumber });
    nextStep();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <Container maxWidth="sm" sx={{ mt: 0 }}>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: "#fdfdfd",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Slide direction="down" in={showForm} mountOnEnter unmountOnExit>
            <Box>
              <Box textAlign="center" mb={3}>
                <Typography
                  variant="h4"
                  component="h2"
                  color="primary"
                  gutterBottom
                >
                  Customer Details
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Please provide the customer's name and bill number (if
                  applicable).
                </Typography>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  {/* Customer Name Field */}
                  <Grid item xs={12}>
                    <motion.div
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <TextField
                        label="Customer Name"
                        variant="outlined"
                        fullWidth
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        inputProps={{
                          "aria-label": "Customer Name",
                        }}
                        InputLabelProps={{
                          style: { color: "#555" },
                        }}
                      />
                    </motion.div>
                  </Grid>

                  {/* Bill Number Field */}
                  <Grid item xs={12}>
                    <motion.div
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <TextField
                        label="Bill Number (Optional)"
                        variant="outlined"
                        fullWidth
                        value={billNumber}
                        onChange={(e) => setBillNumber(e.target.value)}
                        inputProps={{
                          "aria-label": "Bill Number",
                        }}
                        InputLabelProps={{
                          style: { color: "#555" },
                        }}
                      />
                    </motion.div>
                  </Grid>

                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{
                        duration: 0.3,
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                          py: 1.5,
                          fontWeight: "bold",
                          fontSize: "1rem",
                          textTransform: "uppercase",
                          borderRadius: 2,
                        }}
                      >
                        Next
                      </Button>
                    </motion.div>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Slide>
        </Paper>
      </Container>
    </motion.div>
  );
};

export default CustomerDetails;

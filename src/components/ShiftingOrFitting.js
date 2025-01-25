import React, { useEffect, useState } from "react";
import { Button, Box, Typography, Container } from "@mui/material";
import { motion } from "framer-motion";
import "../assets/styles/ShiftingOrFitting.css";

const ShiftingOrFitting = ({ shiftingOrFitting, setShiftingOrFitting, nextStep, prevStep }) => {
  const [selectedOption, setSelectedOption] = useState(shiftingOrFitting || "");

  useEffect(() => {
    if (shiftingOrFitting) {
      setSelectedOption(shiftingOrFitting); // Update the selected option if shiftingOrFitting is updated
    }
  }, [shiftingOrFitting]);

  const handleSelection = (selection) => {
    setSelectedOption(selection);
    setShiftingOrFitting(selection);
    nextStep();
  };

  return (
    <Container maxWidth="sm">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            padding: 4,
            backgroundColor: "#fff",
            borderRadius: 4,
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            transition: "all 0.3s ease",
            ":hover": {
              boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
            What would you like to do?
          </Typography>
          <Typography variant="body1" sx={{ color: "#555", marginBottom: 3 }}>
            Select one of the options below to proceed.
          </Typography>

          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            gap={{ xs: 2, md: 4 }}
            mb={4}
            justifyContent="center"
          >
            {["Shifting", "Fitting"].map((option) => (
              <motion.div
                key={option}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outlined"
                  onClick={() => handleSelection(option)}
                  sx={{
                    width: "100%",
                    padding: "14px 30px",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    borderRadius: 3,
                    textTransform: "none",
                    border: selectedOption === option ? "2px solid #1976d2" : "2px solid #ccc",
                    backgroundColor: selectedOption === option ? "#1976d2" : "#fff",
                    color: selectedOption === option ? "#fff" : "#1976d2",
                    boxShadow: selectedOption === option ? "0 4px 10px rgba(25, 118, 210, 0.2)" : "none",
                    transition: "all 0.3s ease",
                    ":hover": {
                      backgroundColor: selectedOption === option ? "#1565c0" : "#f1f1f1",
                      color: selectedOption === option ? "#fff" : "#1976d2",
                      borderColor: "#1976d2",
                    },
                  }}
                >
                  {option}
                </Button>
              </motion.div>
            ))}
          </Box>

          <Button
            variant="outlined"
            onClick={prevStep}
            sx={{
              padding: "10px 20px",
              fontWeight: "bold",
              borderRadius: 2,
              textTransform: "none",
              borderColor: "#1976d2",
              color: "#1976d2",
              ":hover": {
                backgroundColor: "#1976d2",
                color: "#fff",
              },
              marginTop: 3,
            }}
          >
            Back
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
};

export default ShiftingOrFitting;

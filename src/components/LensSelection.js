import React from "react";
import { Container, Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";

const LensSelection = ({ setLensDetails, nextStep, prevStep, glassType }) => {
  const handleLensSelection = (lensType) => {
    setLensDetails(lensType);
    nextStep();
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          padding: 4,
          backgroundColor: "#fff",
          borderRadius: 5,
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          transition: "all 0.3s ease",
          ":hover": {
            boxShadow: "0 14px 28px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#1a237e",
            marginBottom: 3,
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
          }}
        >
          Select Lens for {glassType}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#424242",
            marginBottom: 4,
            lineHeight: 1.6,
          }}
        >
          Choose the lens type based on the selected glass.
        </Typography>

        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="center"
          gap={3}
          mb={4}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outlined"
              onClick={() => handleLensSelection("SV")}
              sx={{
                padding: "14px 35px",
                fontSize: "1.1rem",
                fontWeight: "600",
                borderRadius: 30,
                textTransform: "none",
                backgroundColor: "#fff",
                color: "#3949ab",
                borderColor: "#3949ab",
                boxShadow: "none",
                transition: "all 0.3s ease",
                ":hover": {
                  backgroundColor: "#3949ab",
                  color: "#fff",
                },
              }}
            >
              SV
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outlined"
              onClick={() => handleLensSelection("KT")}
              sx={{
                padding: "14px 35px",
                fontSize: "1.1rem",
                fontWeight: "600",
                borderRadius: 30,
                textTransform: "none",
                backgroundColor: "#fff",
                color: "#3949ab",
                borderColor: "#3949ab",
                boxShadow: "none",
                transition: "all 0.3s ease",
                ":hover": {
                  backgroundColor: "#3949ab",
                  color: "#fff",
                },
              }}
            >
              KT
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outlined"
              onClick={() => handleLensSelection("PR")}
              sx={{
                padding: "14px 35px",
                fontSize: "1.1rem",
                fontWeight: "600",
                borderRadius: 30,
                textTransform: "none",
                backgroundColor: "#fff",
                color: "#3949ab",
                borderColor: "#3949ab",
                boxShadow: "none",
                transition: "all 0.3s ease",
                ":hover": {
                  backgroundColor: "#3949ab",
                  color: "#fff",
                },
              }}
            >
              PR
            </Button>
          </motion.div>
        </Box>

        <Button
          variant="outlined"
          onClick={prevStep}
          sx={{
            padding: "12px 30px",
            fontWeight: "bold",
            borderRadius: 20,
            textTransform: "none",
            borderColor: "#3949ab",
            color: "#3949ab",
            ":hover": {
              backgroundColor: "#3949ab",
              color: "#fff",
            },
            marginTop: 3,
          }}
        >
          Back
        </Button>
      </Box>
    </Container>
  );
};

export default LensSelection;

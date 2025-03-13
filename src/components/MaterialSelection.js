import React from "react";
import { Container, Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";

const MaterialSelection = ({
  setMaterialDetails,
  nextStep,
  prevStep,
  frameOptions,
}) => {
  const handleMaterialSelection = (materialType) => {
    setMaterialDetails(materialType);
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
          Select Material for {frameOptions.type}
        </Typography>

        <Box
          className="material-selection-buttons"
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="center"
          gap={3}
          mb={4}
        >
          {frameOptions.type === "Full Frame" && (
            <>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outlined"
                  onClick={() => handleMaterialSelection("CR")}
                  sx={{
                    padding: "14px 35px",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    borderRadius: 30,
                    textTransform: "none",
                    backgroundColor: "#fff",
                    color: "#1976d2",
                    borderColor: "#1976d2",
                    boxShadow: "none",
                    transition: "all 0.3s ease",
                    ":hover": {
                      backgroundColor: "#1976d2",
                      color: "#fff",
                    },
                  }}
                >
                  CR
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outlined"
                  onClick={() => handleMaterialSelection("Glass")}
                  sx={{
                    padding: "14px 35px",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    borderRadius: 30,
                    textTransform: "none",
                    backgroundColor: "#fff",
                    color: "#1976d2",
                    borderColor: "#1976d2",
                    boxShadow: "none",
                    transition: "all 0.3s ease",
                    ":hover": {
                      backgroundColor: "#1976d2",
                      color: "#fff",
                    },
                  }}
                >
                  Glass
                </Button>
              </motion.div>
            </>
          )}

          {frameOptions.type === "Supra" && (
            <>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outlined"
                  onClick={() => handleMaterialSelection("CR")}
                  sx={{
                    padding: "14px 35px",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    borderRadius: 30,
                    textTransform: "none",
                    backgroundColor: "#fff",
                    color: "#1976d2",
                    borderColor: "#1976d2",
                    boxShadow: "none",
                    transition: "all 0.3s ease",
                    ":hover": {
                      backgroundColor: "#1976d2",
                      color: "#fff",
                    },
                  }}
                >
                  CR
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outlined"
                  onClick={() => handleMaterialSelection("Glass")}
                  sx={{
                    padding: "14px 35px",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    borderRadius: 30,
                    textTransform: "none",
                    backgroundColor: "#fff",
                    color: "#1976d2",
                    borderColor: "#1976d2",
                    boxShadow: "none",
                    transition: "all 0.3s ease",
                    ":hover": {
                      backgroundColor: "#1976d2",
                      color: "#fff",
                    },
                  }}
                >
                  Glass
                </Button>
              </motion.div>
            </>
          )}

          {frameOptions.type === "Rimless" && (
            <>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outlined"
                  onClick={() => handleMaterialSelection("Poly")}
                  sx={{
                    padding: "14px 35px",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    borderRadius: 30,
                    textTransform: "none",
                    backgroundColor: "#fff",
                    color: "#1976d2",
                    borderColor: "#1976d2",
                    boxShadow: "none",
                    transition: "all 0.3s ease",
                    ":hover": {
                      backgroundColor: "#1976d2",
                      color: "#fff",
                    },
                  }}
                >
                  Poly
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outlined"
                  onClick={() => handleMaterialSelection("CR")}
                  sx={{
                    padding: "14px 35px",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    borderRadius: 30,
                    textTransform: "none",
                    backgroundColor: "#fff",
                    color: "#1976d2",
                    borderColor: "#1976d2",
                    boxShadow: "none",
                    transition: "all 0.3s ease",
                    ":hover": {
                      backgroundColor: "#1976d2",
                      color: "#fff",
                    },
                  }}
                >
                  CR
                </Button>
              </motion.div>
            </>
          )}
        </Box>

        <Button
          variant="outlined"
          onClick={prevStep}
          sx={{
            padding: "12px 30px",
            fontWeight: "bold",
            borderRadius: 20,
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
    </Container>
  );
};

export default MaterialSelection;

import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Grid,
  Button,
  Box,
  Slide,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";

const FrameOptions = ({
  frameOptions,
  setFrameOptions,
  nextStep,
  prevStep,
}) => {
  const [selectedFrame, setSelectedFrame] = useState(frameOptions?.type || "");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (frameOptions?.type) {
      setSelectedFrame(frameOptions.type);
    }
  }, [frameOptions]);

  const handleFrameSelection = (frameType) => {
    setSelectedFrame(frameType);
    setFrameOptions({ type: frameType });
    nextStep();
  };

  const frameData = [
    {
      label: "Full Frame",
      description: "Sturdy and reliable design.",
      image: "/images/full-frame.png",
    },
    {
      label: "Supra",
      description: "Minimal and lightweight.",
      image: "/images/supra.png",
    },
    {
      label: "Rimless",
      description: "Elegant and modern style.",
      image: "/images/rimless.png",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <Container
        maxWidth="md"
        sx={{ mt: isMobile ? 2 : 0, mb: isMobile ? 1 : 0 }}
      >
        <Paper
          elevation={6}
          sx={{
            p: isMobile ? 2 : 4,
            borderRadius: 3,
            backgroundColor: "#fdfdfd",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Slide direction="down" in={true} mountOnEnter unmountOnExit>
            <Box>
              <Box textAlign="center" mb={isMobile ? 2 : 3}>
                <Typography
                  variant={isMobile ? "h5" : "h4"}
                  component="h2"
                  color="primary"
                  gutterBottom
                >
                  Select Frame Type
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Choose the frame type that best suits your preference.
                </Typography>
              </Box>

              <Divider sx={{ mb: isMobile ? 2 : 3 }} />

              <Grid
                container
                spacing={isMobile ? 2 : 3}
                justifyContent="center"
              >
                {frameData.map((frame) => (
                  <Grid item xs={12} sm={4} key={frame.label}>
                    <motion.div
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.3 },
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Paper
                        elevation={selectedFrame === frame.label ? 8 : 4}
                        sx={{
                          p: isMobile ? 2 : 3,
                          borderRadius: 2,
                          cursor: "pointer",
                          backgroundColor:
                            selectedFrame === frame.label
                              ? "rgba(25, 118, 210, 0.1)"
                              : "#fff",
                          border:
                            selectedFrame === frame.label
                              ? "2px solid #1976d2"
                              : "2px solid transparent",
                          textAlign: "center",
                          height: isMobile ? "130px" : "160px", // Reduced height on mobile
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                        onClick={() => handleFrameSelection(frame.label)}
                      >
                        <img
                          src={frame.image}
                          alt={frame.label}
                          style={{
                            width: isMobile ? "60%" : "100%", // Smaller images on mobile
                            height: "auto",
                            borderRadius: "8px",
                            marginBottom: isMobile ? "10px" : "16px",
                            margin: "0 auto", // Center the image
                          }}
                        />
                        <Typography
                          variant={isMobile ? "subtitle1" : "h6"}
                          color="textPrimary"
                        >
                          {frame.label}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{
                            mt: isMobile ? 0.5 : 1,
                            fontSize: isMobile ? "0.75rem" : "0.875rem",
                          }}
                        >
                          {frame.description}
                        </Typography>
                      </Paper>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>

              <Box
                display="flex"
                justifyContent="space-between"
                mt={isMobile ? 2 : 4}
                sx={{ gap: isMobile ? 1 : 2 }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={prevStep}
                  sx={{
                    py: isMobile ? 0.8 : 1.2,
                    px: isMobile ? 2 : 4,
                    borderRadius: 2,
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    fontSize: isMobile ? "0.75rem" : "0.875rem",
                  }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!selectedFrame}
                  onClick={nextStep}
                  sx={{
                    py: isMobile ? 0.8 : 1.2,
                    px: isMobile ? 2 : 4,
                    borderRadius: 2,
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    fontSize: isMobile ? "0.75rem" : "0.875rem",
                  }}
                >
                  Next
                </Button>
              </Box>
            </Box>
          </Slide>
        </Paper>
      </Container>
    </motion.div>
  );
};

export default FrameOptions;

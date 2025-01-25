import React from "react";
import { Link } from "react-router-dom";
import { Typography, Box, Stack, Button } from "@mui/material";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        background: "linear-gradient(135deg, #ff7eb3, #ff758c, #f54ea2)",
        color: "#fff",
        padding: 4,
      }}
    >
      {/* Animated 404 Title */}
      <Typography
        component={motion.h1}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        sx={{
          fontSize: "10rem",
          fontWeight: "bold",
          marginBottom: 2,
          textShadow: "3px 3px 8px rgba(0, 0, 0, 0.5)",
        }}
      >
        404
      </Typography>

      {/* Subtitle */}
      <Typography
        component={motion.h2}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        sx={{
          fontSize: "2rem",
          fontWeight: "600",
          marginBottom: 2,
        }}
      >
        Oops! Page Not Found
      </Typography>

      {/* Description */}
      <Typography
        component={motion.p}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        sx={{ marginBottom: 4, fontSize: "1.2rem", lineHeight: 1.6 }}
      >
        The page you're looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </Typography>

      {/* Links with Hover Animation */}
      <Stack
        direction="column"
        spacing={2}
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        sx={{ width: "100%", maxWidth: 400 }}
      >
        <Button
          // component={motion.div}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 4px 12px rgba(255, 118, 150, 0.6)",
          }}
          transition={{ duration: 0.3 }}
          variant="contained"
          to="/"
          component={Link}
          sx={{
            backgroundColor: "#ff508e",
            color: "#fff",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#ff3770",
            },
          }}
        >
          Go to Home
        </Button>
        <Button
          // component={motion.div}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 4px 12px rgba(255, 118, 150, 0.6)",
          }}
          transition={{ duration: 0.3 }}
          variant="contained"
          to="/login"
          component={Link}
          sx={{
            backgroundColor: "#ff508e",
            color: "#fff",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#ff3770",
            },
          }}
        >
          Go to Login
        </Button>
        <Button
          // component={motion.div}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 4px 12px rgba(255, 118, 150, 0.6)",
          }}
          transition={{ duration: 0.3 }}
          variant="contained"
          to="/dashboard"
          component={Link}
          sx={{
            backgroundColor: "#ff508e",
            color: "#fff",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#ff3770",
            },
          }}
        >
          Go to Dashboard
        </Button>
      </Stack>
    </Box>
  );
};

export default NotFound;

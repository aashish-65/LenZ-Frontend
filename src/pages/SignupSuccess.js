import { useEffect, useState } from "react";
import { CheckCircle, Mail, Login } from "@mui/icons-material";
import { motion } from "framer-motion";
import Confetti from "react-confetti"; // 🎉 Import Confetti
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignupSuccess = ({ userId }) => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);
  const isMobile = useMediaQuery("(max-width: 600px)"); // Adjust confetti size for mobile

  // Stop confetti after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      {/* 🎉 Confetti Animation */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={isMobile ? 150 : 300} // Adjust particles for mobile
          recycle={false} // Stop confetti after a few seconds
        />
      )}

      <Box
        component={motion.div}
        whileHover={{ scale: 1.02, boxShadow: "0px 4px 20px rgba(0, 255, 170, 0.3)" }}
        transition={{ duration: 0.3 }}
        sx={{
          textAlign: "center",
          padding: 4,
          background: `linear-gradient(135deg, #4CAF50, #2E7D32)`,
          borderRadius: 3,
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
          color: "white",
          position: "relative",
          overflow: "hidden",
          maxWidth: 500,
          width: "90%",
        }}
      >
        {/* Animated Check Icon */}
        <motion.div initial={{ rotate: -180, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          <CheckCircle fontSize="large" sx={{ mb: 1 }} />
        </motion.div>

        {/* Main Message */}
        <Typography variant="h5" component={motion.div} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          Signup Successful!
        </Typography>

        {/* Unique ID */}
        <Typography variant="body1" component={motion.div} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          Your Unique ID: <strong><h1>{userId}</h1></strong>
        </Typography>

        {/* Notification Box */}
        <Box sx={{ backgroundColor: "#fff", padding: 2, borderRadius: 2, textAlign: "left", color: "#333", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", mt: 2 }}>
          <Typography variant="body2" sx={{ mb: 1, display: "flex", alignItems: "center" }}>
            <Mail fontSize="small" sx={{ mr: 1 }} />
            Your Unique ID has been emailed to you.
          </Typography>
          <Typography variant="body2">
            <strong>Note:</strong> Check your spam folder if you don’t see it in your inbox.
          </Typography>
        </Box>

        {/* Animated Button */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <Button
            onClick={() => navigate("/login")}
            variant="contained"
            sx={{
              mt: 3,
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "8px",
              textTransform: "none",
              background: "linear-gradient(90deg, #1E88E5, #1565C0)",
              color: "#fff",
              "&:hover": { background: "linear-gradient(90deg, #1565C0, #0D47A1)", transform: "scale(1.05)", transition: "all 0.3s ease-in-out" },
              "&:active": { transform: "scale(0.95)" },
            }}
            startIcon={<Login />}
          >
            Go to Login
          </Button>
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default SignupSuccess;
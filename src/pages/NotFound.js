import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Box,
  Stack,
  Button,
  Container,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RefreshIcon from "@mui/icons-material/Refresh";

const NotFound = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isAnimating, setIsAnimating] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const backgroundVariants = {
    initial: {
      background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
      opacity: 0.7,
    },
    animate: {
      background: [
        "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        "linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)",
        "linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)",
      ],
      opacity: [0.7, 0.8, 0.7],
      transition: {
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  const handleRefresh = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const navigationItems = [
    {
      to: "/",
      label: "Go to Home",
      icon: <HomeIcon />,
    },
    {
      to: "/login",
      label: "Go to Login",
      icon: <LoginIcon />,
    },
    {
      to: "/dashboard",
      label: "Go to Dashboard",
      icon: <DashboardIcon />,
    },
  ];

  return (
    <Box
      component={motion.div}
      initial="initial"
      animate="animate"
      variants={backgroundVariants}
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: 3,
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(255,255,255,0.1)",
          transform: "rotate(-45deg)",
          zIndex: 0,
        }}
        component={motion.div}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [-45, -55, -45],
          transition: {
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          },
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 10 }}>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          {/* Left Side - Illustration & Details */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              textAlign: isMobile ? "center" : "left",
              pr: isMobile ? 0 : 4,
            }}
          >
            <AnimatePresence>
              {!isAnimating ? (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                >
                  <motion.div variants={itemVariants}>
                    <ErrorOutlineIcon
                      sx={{
                        fontSize: isMobile ? 80 : 120,
                        color: "primary.main",
                        mb: 2,
                        animation: "pulse 2s infinite",
                      }}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Typography
                      variant={isMobile ? "h2" : "h1"}
                      sx={{
                        fontWeight: "bold",
                        color: "white",
                        mb: 2,
                        textShadow: "3px 3px 6px rgba(0,0,0,0.3)",
                      }}
                    >
                      404
                    </Typography>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Typography
                      variant={isMobile ? "h5" : "h4"}
                      sx={{
                        mb: 2,
                        fontWeight: "medium",
                        color: "white",
                      }}
                    >
                      Page Not Found
                    </Typography>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 3,
                        color: "white",
                        opacity: 0.8,
                        maxWidth: 500,
                        mx: isMobile ? "auto" : 0,
                      }}
                    >
                      Oops! The page you're searching for seems to have vanished
                      into the digital abyss. Don't worry, we'll help you find
                      your way back.
                    </Typography>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1 }}
                >
                  <RefreshIcon
                    sx={{
                      fontSize: 100,
                      color: "white",
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Grid>

          {/* Right Side - Navigation Buttons */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              textAlign: isMobile ? "center" : "left",
              pl: isMobile ? 0 : 4,
            }}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <Stack
                spacing={2}
                direction={isMobile ? "column" : "column"}
                sx={{ width: "100%", maxWidth: 400, mx: "auto" }}
              >
                {navigationItems.map((item) => (
                  <motion.div variants={itemVariants} key={item.to}>
                    <Button
                      component={Link}
                      to={item.to}
                      variant="contained"
                      color="primary"
                      fullWidth
                      startIcon={item.icon}
                      sx={{
                        py: 1.5,
                        transition: "all 0.3s ease",
                        background: "rgba(255,255,255,0.2)",
                        backdropFilter: "blur(10px)",
                        "&:hover": {
                          transform: "scale(1.05)",
                          background: "rgba(255,255,255,0.3)",
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  </motion.div>
                ))}

                <motion.div variants={itemVariants}>
                  <Button
                    variant="outlined"
                    color="inherit"
                    fullWidth
                    startIcon={<RefreshIcon />}
                    onClick={handleRefresh}
                    sx={{
                      py: 1.5,
                      color: "white",
                      borderColor: "rgba(255,255,255,0.5)",
                      "&:hover": {
                        borderColor: "white",
                        background: "rgba(255,255,255,0.1)",
                      },
                    }}
                  >
                    Refresh Page
                  </Button>
                </motion.div>
              </Stack>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Animated Background Elements */}
      <Box
        sx={{
          position: "absolute",
          bottom: -50,
          right: -50,
          width: 200,
          height: 200,
          background: "rgba(255,255,255,0.1)",
          borderRadius: "50%",
          zIndex: 0,
        }}
        component={motion.div}
        animate={{
          scale: [1, 1.2, 1],
          transition: {
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          },
        }}
      />

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </Box>
  );
};

export default NotFound;

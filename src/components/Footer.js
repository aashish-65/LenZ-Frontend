import React from "react";
import { Link } from "react-router-dom";
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  IconButton, 
  useMediaQuery, 
  useTheme,
  Divider,
  Paper,
  Tooltip,
  Zoom
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import PolicyIcon from "@mui/icons-material/Policy";
import TermsIcon from "@mui/icons-material/Description";
import CopyrightIcon from "@mui/icons-material/Copyright";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper 
      elevation={8}
      sx={{
        background: "linear-gradient(135deg, #3f51b5 0%, #1e40af 100%)",
        color: "white",
        borderRadius: 0,
        overflow: "hidden",
        position: "relative",
        marginTop: "auto",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #00c6ff, #0072ff, #00c6ff)",
          backgroundSize: "200% 100%",
          animation: "shimmer 2s infinite linear",
        },
        "@keyframes shimmer": {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "0 0" },
        },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: isMobile ? 3 : 4,
          }}
        >
          {/* Copyright Text */}
          <Box 
            sx={{ 
              display: "flex", 
              alignItems: "center",
              marginBottom: 3,
              padding: "10px 20px",
              borderRadius: "30px",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CopyrightIcon sx={{ marginRight: 1, fontSize: 16 }} />
            <Typography variant="body2">
              2025 LenZ. All rights reserved.
            </Typography>
          </Box>

          {/* Footer Links */}
          <Box 
            sx={{ 
              display: "flex", 
              flexDirection: isMobile ? "column" : "row",
              gap: 2, 
              marginBottom: 3,
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Button
              component={Link}
              to="/shop-privacy-policy"
              startIcon={<PolicyIcon />}
              sx={{
                color: "white",
                textDecoration: "none",
                padding: "10px 20px",
                borderRadius: "30px",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
                "&:hover": { 
                  background: "rgba(255, 255, 255, 0.2)",
                  transform: "translateY(-3px)",
                  boxShadow: "0 7px 14px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              Privacy Policy
            </Button>
            <Button
              component={Link}
              to="https://merchant.razorpay.com/policy/Q5DDWrbvqT2SkD/terms"
              startIcon={<TermsIcon />}
              target="_blank"
              rel="noreferrer"
              sx={{
                color: "white",
                textDecoration: "none",
                padding: "10px 20px",
                borderRadius: "30px",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
                "&:hover": { 
                  background: "rgba(255, 255, 255, 0.2)",
                  transform: "translateY(-3px)",
                  boxShadow: "0 7px 14px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              Terms of Service
            </Button>
          </Box>

          <Divider 
            sx={{ 
              width: "80%", 
              background: "rgba(255, 255, 255, 0.2)",
              marginBottom: 3,
              borderRadius: "50px",
              height: "2px",
            }} 
          />

          {/* Contact Us Section */}
          <Typography 
            variant="h6" 
            align="center" 
            sx={{ 
              marginBottom: 2, 
              fontWeight: "600",
              letterSpacing: "1px",
              textTransform: "uppercase",
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: "-8px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "40px",
                height: "3px",
                background: "#00c6ff",
                borderRadius: "10px",
              }
            }}
          >
            Contact Us
          </Typography>
          
          {/* Contact Information - Desktop view */}
          {!isMobile && (
            <Box 
              sx={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: 2,
                width: "100%",
                maxWidth: "400px",
              }}
            >
              {/* Email */}
              <Paper
                elevation={0}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 20px",
                  borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                  "&:hover": { 
                    background: "rgba(255, 255, 255, 0.2)",
                    transform: "translateY(-3px)",
                    boxShadow: "0 7px 14px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <EmailIcon sx={{ marginRight: 2, color: "#00c6ff" }} />
                <Typography variant="body2" sx={{ marginRight: 1 }}>
                  Email:
                </Typography>
                <Button
                  component="a"
                  href="mailto:connect.lenz@gmail.com"
                  sx={{
                    color: "white",
                    textDecoration: "none",
                    padding: "5px 10px",
                    "&:hover": { color: "#00c6ff" },
                    textTransform: "lowercase",
                  }}
                >
                  connect.lenz@gmail.com
                </Button>
              </Paper>
              
              {/* Phone Number */}
              <Paper
                elevation={0}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 20px",
                  borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                  "&:hover": { 
                    background: "rgba(255, 255, 255, 0.2)",
                    transform: "translateY(-3px)",
                    boxShadow: "0 7px 14px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <PhoneIcon sx={{ marginRight: 2, color: "#00c6ff" }} />
                <Typography variant="body2" sx={{ marginRight: 1 }}>
                  Phone:
                </Typography>
                <Button
                  component="a"
                  href="tel:+918967310388"
                  sx={{
                    color: "white",
                    textDecoration: "none",
                    padding: "5px 10px",
                    "&:hover": { color: "#00c6ff" },
                  }}
                >
                  +91-8967310388
                </Button>
              </Paper>
            </Box>
          )}

          {/* Contact Information - Mobile view (icons only) */}
          {isMobile && (
            <Box sx={{ display: "flex", gap: 4, justifyContent: "center" }}>
              <Tooltip 
                title="Email: connect.lenz@gmail.com" 
                arrow 
                placement="top"
                TransitionComponent={Zoom}
              >
                <IconButton
                  component="a"
                  href="mailto:connect.lenz@gmail.com"
                  sx={{ 
                    color: "white", 
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    padding: "14px",
                    transition: "all 0.3s ease",
                    "&:hover": { 
                      background: "#00c6ff",
                      transform: "translateY(-3px)",
                      boxShadow: "0 7px 14px rgba(0, 0, 0, 0.2)",
                    } 
                  }}
                  aria-label="Email"
                >
                  <EmailIcon />
                </IconButton>
              </Tooltip>
              
              <Tooltip 
                title="Phone: +91-8967310388" 
                arrow 
                placement="top"
                TransitionComponent={Zoom}
              >
                <IconButton
                  component="a"
                  href="tel:+918967310388"
                  sx={{ 
                    color: "white", 
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    padding: "14px",
                    transition: "all 0.3s ease",
                    "&:hover": { 
                      background: "#00c6ff",
                      transform: "translateY(-3px)",
                      boxShadow: "0 7px 14px rgba(0, 0, 0, 0.2)",
                    } 
                  }}
                  aria-label="Phone"
                >
                  <PhoneIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Box>
      </Container>
    </Paper>
  );
};

export default Footer;
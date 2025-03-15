// import React from "react";
// import { Link } from "react-router-dom";
// import { Box, Typography, Button, Container, IconButton, useMediaQuery, useTheme } from "@mui/material";
// import PhoneIcon from "@mui/icons-material/Phone";
// import EmailIcon from "@mui/icons-material/Email";
// import PolicyIcon from "@mui/icons-material/Policy";
// import TermsIcon from "@mui/icons-material/Description";

// const Footer = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   return (
//     <Box
//       sx={{
//         background: "linear-gradient(to right, #3f51b5, #1e40af)", // Gradient background
//         color: "white",
//         padding: 3,
//         marginTop: "auto", // Ensures it stays at the bottom of the page
//       }}
//     >
//       <Container maxWidth="lg">
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           {/* Copyright Text */}
//           <Typography variant="body2" align="center" sx={{ marginBottom: 2 }}>
//             © 2025 LenZ. All rights reserved.
//           </Typography>

//           {/* Footer Links */}
//           <Box sx={{ display: "flex", gap: 3, marginBottom: 3 }}>
//             <Button
//               component={Link}
//               to="/shop-privacy-policy"
//               startIcon={<PolicyIcon />} // Icon added to the link
//               sx={{
//                 color: "white",
//                 textDecoration: "none",
//                 "&:hover": { backgroundColor: "#1e40af" },
//               }}
//             >
//               Privacy Policy
//             </Button>
//             <Button
//               component={Link}
//               to="https://merchant.razorpay.com/policy/Q5DDWrbvqT2SkD/terms"
//               startIcon={<TermsIcon />}
//               target="_blank"
//               rel="noreferrer"
//               sx={{
//                 color: "white",
//                 textDecoration: "none",
//                 "&:hover": { backgroundColor: "#1e40af" },
//               }}
//             >
//               Terms of Service
//             </Button>
//           </Box>

//           {/* Contact Us Section */}
//           <Typography variant="body1" align="center" sx={{ marginBottom: 2, fontWeight: "bold" }}>
//             Contact Us
//           </Typography>
          
//           {/* Contact Information - Desktop view */}
//           {!isMobile && (
//             <>
//               {/* Email */}
//               <Typography
//                 variant="body2"
//                 align="center"
//                 sx={{ marginBottom: 1, display: "flex", alignItems: "center" }}
//               >
//                 <EmailIcon sx={{ marginRight: 1 }} />
//                 Email:
//                 <Button
//                   component="a"
//                   href="mailto:connect.lenz@gmail.com"
//                   sx={{
//                     color: "white",
//                     textDecoration: "none",
//                     marginLeft: 1,
//                     "&:hover": { color: "#ffeb3b" }, // Color change on hover
//                   }}
//                 >
//                   connect.lenz@gmail.com
//                 </Button>
//               </Typography>
              
//               {/* Phone Number */}
//               <Typography
//                 variant="body2"
//                 align="center"
//                 sx={{ display: "flex", alignItems: "center" }}
//               >
//                 <PhoneIcon sx={{ marginRight: 1 }} />
//                 Phone:
//                 <Button
//                   component="a"
//                   href="tel:+918967310388"
//                   sx={{
//                     color: "white",
//                     textDecoration: "none",
//                     marginLeft: 1,
//                     "&:hover": { color: "#ffeb3b" }, // Color change on hover
//                   }}
//                 >
//                   +91-8967310388
//                 </Button>
//               </Typography>
//             </>
//           )}

//           {/* Contact Information - Mobile view (icons only) */}
//           {isMobile && (
//             <Box sx={{ display: "flex", gap: 3, justifyContent: "center" }}>
//               <IconButton
//                 component="a"
//                 href="mailto:connect.lenz@gmail.com"
//                 sx={{ 
//                   color: "white", 
//                   "&:hover": { 
//                     backgroundColor: "#ffeb3b",
//                     color: "#1e40af"
//                   } 
//                 }}
//                 aria-label="Email"
//               >
//                 <EmailIcon />
//               </IconButton>
              
//               <IconButton
//                 component="a"
//                 href="tel:+918967310388"
//                 sx={{ 
//                   color: "white", 
//                   "&:hover": { 
//                     backgroundColor: "#ffeb3b",
//                     color: "#1e40af" 
//                   } 
//                 }}
//                 aria-label="Phone"
//               >
//                 <PhoneIcon />
//               </IconButton>
//             </Box>
//           )}
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default Footer;

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
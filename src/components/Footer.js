import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button, Container, IconButton } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import PolicyIcon from "@mui/icons-material/Policy";
import TermsIcon from "@mui/icons-material/Description";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #3f51b5, #1e40af)", // Gradient background
        color: "white",
        padding: 3,
        marginTop: "auto", // Ensures it stays at the bottom of the page
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Copyright Text */}
          <Typography variant="body2" align="center" sx={{ marginBottom: 2 }}>
            © 2025 LenZ. All rights reserved.
          </Typography>

          {/* Contact Info */}
          <Typography
            variant="body2"
            align="center"
            sx={{ marginBottom: 2, display: "flex", alignItems: "center" }}
          >
            <PhoneIcon sx={{ marginRight: 1 }} />
            Contact us:
            <Button
              component="a"
              href="tel:+918967310388"
              sx={{
                color: "white",
                textDecoration: "none",
                marginLeft: 1,
                "&:hover": { color: "#ffeb3b" }, // Color change on hover
              }}
            >
              +91-8967310388
            </Button>
          </Typography>

          {/* Footer Links */}
          <Box sx={{ display: "flex", gap: 3, marginBottom: 3 }}>
            <Button
              component={Link}
              to="/shop-privacy-policy"
              startIcon={<PolicyIcon />} // Icon added to the link
              sx={{
                color: "white",
                textDecoration: "none",
                "&:hover": { backgroundColor: "#1e40af" },
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
                "&:hover": { backgroundColor: "#1e40af" },
              }}
            >
              Terms of Service
            </Button>
          </Box>

          {/* Social Media Links */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton
              component="a"
              href="https://facebook.com"
              sx={{ color: "white", "&:hover": { backgroundColor: "#3b5998" } }}
            >
              <Facebook />
            </IconButton>
            <IconButton
              component="a"
              href="https://twitter.com"
              sx={{ color: "white", "&:hover": { backgroundColor: "#00acee" } }}
            >
              <Twitter />
            </IconButton>
            <IconButton
              component="a"
              href="https://instagram.com"
              sx={{ color: "white", "&:hover": { backgroundColor: "#e1306c" } }}
            >
              <Instagram />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

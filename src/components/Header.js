import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { AuthContext } from "../AuthContext";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close"; // For close button in the hamburger
import { useTheme } from "@mui/material/styles";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if it's a mobile screen
  const [drawerOpen, setDrawerOpen] = useState(false); // State to control the drawer

  // Handle Drawer Toggle
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  // Drawer Content
  const drawerContent = (
    <Box
      sx={{ width: 250, padding: 2 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {!user ? (
          <>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/signup">
                <ListItemText primary="Signup" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/login">
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/profile">
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/dashboard">
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={logout}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#3f51b5", boxShadow: 3 }}>
      <Toolbar>
        <Container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Title */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            LenZ
          </Typography>

          {/* Hamburger Menu for Mobile */}
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                onClick={toggleDrawer(true)}
                sx={{
                  transition: "transform 0.3s ease",
                  transform: drawerOpen ? "rotate(90deg)" : "rotate(0deg)",
                }}
              >
                {drawerOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
              <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                {drawerContent}
              </Drawer>
            </>
          ) : (
            /* Navigation Links for Desktop */
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              {!user ? (
                <>
                  <Button
                    component={Link}
                    to="/signup"
                    color="inherit"
                    sx={{ "&:hover": { backgroundColor: "#1e40af" } }}
                  >
                    Signup
                  </Button>
                  <Button
                    component={Link}
                    to="/login"
                    color="inherit"
                    sx={{ "&:hover": { backgroundColor: "#1e40af" } }}
                  >
                    Login
                  </Button>
                </>
              ) : (
                <>
                  {/* <Box sx={{ display: "flex", alignItems: "center" }}>
                    <AccountCircleIcon sx={{ color: "white", marginRight: 1 }} />
                    <Typography variant="body1" sx={{ color: "white" }}>
                      {user.name}
                    </Typography>
                  </Box> */}
                  <Button
                    component={Link}
                    to="/profile"
                    color="inherit"
                    sx={{ "&:hover": { backgroundColor: "#1e40af" } }}
                  >
                    <AccountCircleIcon sx={{ color: "white", marginRight: 1 }} />
                    {user.name}
                  </Button>
                  <Button
                    component={Link}
                    to="/dashboard"
                    color="inherit"
                    sx={{ "&:hover": { backgroundColor: "#1e40af" } }}
                  >
                    Dashboard
                  </Button>
                  <Button
                    onClick={logout}
                    color="inherit"
                    sx={{ "&:hover": { backgroundColor: "#1e40af" } }}
                  >
                    Logout
                  </Button>
                </>
              )}
            </Box>
          )}
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

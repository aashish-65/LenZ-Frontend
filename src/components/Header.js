import React, { useState, useContext, memo } from "react";
import { Link, useLocation } from "react-router-dom";
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
  Menu,
  MenuItem,
  Fade,
} from "@mui/material";
import { AuthContext } from "../AuthContext";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close"; // For close button in the hamburger
import { useTheme } from "@mui/material/styles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import ViewOrderIcon from "@mui/icons-material/ViewList";
import GroupOrderIcon from "@mui/icons-material/ListAlt";
import BookPickupIcon from "@mui/icons-material/ShoppingCartCheckout";
import LoginIcon from "@mui/icons-material/Login";
import SignupIcon from "@mui/icons-material/AppRegistration";

const Header = memo(() => {
  const { user, logout } = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if it's a mobile screen
  const [drawerOpen, setDrawerOpen] = useState(false); // State to control the drawer
  const [ordersMenuAnchor, setOrdersMenuAnchor] = useState(null);
  const location = useLocation();

  const handleOrdersMenuOpen = (event) =>
    setOrdersMenuAnchor(event.currentTarget);
  const handleOrdersMenuClose = () => setOrdersMenuAnchor(null);

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
              <ListItemButton
                component={Link}
                to="/"
                sx={{
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  backgroundColor:
                    location.pathname === "/dashboard"
                      ? "#303f9f"
                      : "transparent",
                  color:
                    location.pathname === "/dashboard" ? "white" : "inherit",
                  "&:hover": {
                    backgroundColor: "#acceff",
                    transform: "scale(1.05)",
                    boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.4)",
                  },
                }}
              >
                <HomeIcon
                  sx={{
                    color:
                      location.pathname === "/dashboard" ? "white" : "#3f51b5",
                    marginRight: 1,
                    transition: "color 0.3s ease , transform 0.3s ease",
                    "&:hover": { color: "#303f9f", transform: "scale(1.1)" },
                  }}
                />
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/login"
                sx={{
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  backgroundColor:
                    location.pathname === "/login" ? "#303f9f" : "transparent",
                  color: location.pathname === "/login" ? "white" : "inherit",
                  "&:hover": {
                    color: location.pathname === "/login" ? "#3f51b5" : "black",
                    backgroundColor: "#acceff", // Darker blue on hover
                    transform: "scale(1.05)", // Slight zoom
                    boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.4)", // Shadow effect
                  },
                }}
              >
                <LoginIcon
                  sx={{
                    color: location.pathname === "/login" ? "white" : "#3f51b5",
                    marginRight: 1,
                    transition: "color 0.3s ease , transform 0.3s ease",
                    "&:hover": { color: "#303f9f", transform: "scale(1.1)" },
                  }}
                />
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/signup"
                sx={{
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  backgroundColor:
                    location.pathname === "/signup" ? "#303f9f" : "transparent",
                  color: location.pathname === "/signup" ? "white" : "inherit",
                  "&:hover": {
                    color:
                      location.pathname === "/signup" ? "#3f51b5" : "black",
                    backgroundColor: "#acceff",
                    transform: "scale(1.05)",
                    boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.4)",
                  },
                }}
              >
                <SignupIcon
                  sx={{
                    color:
                      location.pathname === "/signup" ? "white" : "#3f51b5",
                    marginRight: 1,
                    transition: "color 0.3s ease , transform 0.3s ease",
                    "&:hover": { color: "#303f9f", transform: "scale(1.1)" },
                  }}
                />
                <ListItemText primary="Signup" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/"
                sx={{
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  backgroundColor:
                    location.pathname === "/" ? "#303f9f" : "transparent",
                  color: location.pathname === "/" ? "white" : "inherit",
                  "&:hover": {
                    color: location.pathname === "/" ? "#3f51b5" : "black",
                    backgroundColor: "#acceff", // Darker blue on hover
                    transform: "scale(1.05)", // Slight zoom
                    boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.4)", // Shadow effect
                  },
                }}
              >
                <HomeIcon
                  sx={{
                    color: location.pathname === "/" ? "white" : "#3f51b5",
                    marginRight: 1,
                    transition: "color 0.3s ease , transform 0.3s ease",
                    "&:hover": { color: "#303f9f", transform: "scale(1.1)" },
                  }}
                />
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ marginTop: 1 }}>
              <ListItemButton
                component={Link}
                to="/dashboard"
                sx={{
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  backgroundColor:
                    location.pathname === "/dashboard"
                      ? "#303f9f"
                      : "transparent",
                  color:
                    location.pathname === "/dashboard" ? "white" : "inherit",
                  "&:hover": {
                    color:
                      location.pathname === "/dashboard" ? "#3f51b5" : "black",
                    backgroundColor: "#acceff", // Darker blue on hover
                    transform: "scale(1.05)", // Slight zoom
                    boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.4)", // Shadow effect
                  },
                }}
              >
                <DashboardIcon
                  sx={{
                    color:
                      location.pathname === "/dashboard" ? "white" : "#3f51b5",
                    marginRight: 1,
                    transition: "color 0.3s ease , transform 0.3s ease",
                    "&:hover": { color: "#303f9f", transform: "scale(1.1)" },
                  }}
                />
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>

            <Divider sx={{ my: 1 }} />
            <Typography
              sx={{
                pl: 2,
                pt: 1,
                pb: 1,
                fontWeight: "bold",
                fontSize: 14,
                color: "gray",
              }}
            >
              Orders
            </Typography>
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/orders"
                  sx={{
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    backgroundColor:
                      location.pathname === "/orders"
                        ? "#303f9f"
                        : "transparent",
                    color:
                      location.pathname === "/orders" ? "white" : "inherit",
                    "&:hover": {
                      color:
                        location.pathname === "/orders" ? "#3f51b5" : "black",
                      backgroundColor: "#acceff", // Darker blue on hover
                      transform: "scale(1.05)", // Slight zoom
                      boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.4)", // Shadow effect
                    },
                  }}
                >
                  <ViewOrderIcon
                    sx={{
                      color:
                        location.pathname === "/orders" ? "white" : "#3f51b5",
                      marginRight: 1,
                      transition: "color 0.3s ease , transform 0.3s ease",
                      "&:hover": { color: "#303f9f", transform: "scale(1.1)" },
                    }}
                  />
                  <ListItemText primary="View Orders" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ marginTop: 1 }}>
                <ListItemButton
                  component={Link}
                  to="/pickup-orders"
                  sx={{
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    background:
                      location.pathname === "/pickup-orders"
                        ? "linear-gradient(to right,rgb(139, 154, 181),rgb(134, 20, 255))"
                        : "transparent",
                    color:
                      location.pathname === "/pickup-orders"
                        ? "white"
                        : "rgb(94, 0, 165)",
                    "&:hover": {
                      color:
                        location.pathname === "/pickup-orders"
                          ? "white"
                          : "white",
                      background:
                        "linear-gradient(to right,rgb(139, 154, 181),rgb(134, 20, 255))",
                      transform: "scale(1.05)", // Slight zoom
                      boxShadow: "0px 4px 10px rgba(106, 63, 181, 0.4)", // Shadow effect
                    },
                  }}
                >
                  <BookPickupIcon
                    sx={{
                      color:
                        location.pathname === "/pickup-orders"
                          ? "white"
                          : "#3f51b5",
                      marginRight: 1,
                      transition: "color 0.3s ease , transform 0.3s ease",
                      "&:hover": { color: "#fff", transform: "scale(1.1)" },
                    }}
                  />
                  <ListItemText
                    primary="Book For Pickup"
                    sx={{
                      fontWeight: "bold",
                    }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ marginTop: 1 }}>
                <ListItemButton
                  component={Link}
                  to="/group-orders"
                  sx={{
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    backgroundColor:
                      location.pathname === "/group-orders"
                        ? "#303f9f"
                        : "transparent",
                    color:
                      location.pathname === "/group-orders"
                        ? "white"
                        : "inherit",
                    "&:hover": {
                      color:
                        location.pathname === "/group-orders"
                          ? "#3f51b5"
                          : "black",
                      backgroundColor: "#acceff",
                      transform: "scale(1.05)",
                      boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.4)",
                    },
                  }}
                >
                  <GroupOrderIcon
                    sx={{
                      color:
                        location.pathname === "/group-orders"
                          ? "white"
                          : "#3f51b5",
                      marginRight: 1,
                      transition: "color 0.3s ease , transform 0.3s ease",
                      "&:hover": { color: "#303f9f", transform: "scale(1.1)" },
                    }}
                  />
                  <ListItemText primary="View Group Orders" />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider sx={{ my: 1 }} />
            <Typography
              sx={{
                pl: 2,
                pt: 1,
                pb: 1,
                fontWeight: "bold",
                fontSize: 14,
                color: "gray",
              }}
            >
              Account
            </Typography>
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/profile"
                  sx={{
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    backgroundColor:
                      location.pathname === "/profile"
                        ? "#303f9f"
                        : "transparent",
                    color:
                      location.pathname === "/profile" ? "white" : "inherit",
                    "&:hover": {
                      color:
                        location.pathname === "/profile" ? "#3f51b5" : "black",
                      backgroundColor: "#acceff",
                      transform: "scale(1.05)",
                      boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.4)",
                    },
                  }}
                >
                  <AccountCircleIcon
                    sx={{
                      color:
                        location.pathname === "/profile" ? "white" : "#3f51b5",
                      marginRight: 1,
                      transition: "color 0.3s ease , transform 0.3s ease",
                      "&:hover": { color: "#303f9f", transform: "scale(1.1)" },
                    }}
                  />
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ marginTop: 1 }}>
                <ListItemButton
                  onClick={logout}
                  sx={{
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    backgroundColor: "#d32f2f",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#f24b4b",
                      transform: "scale(1.05)",
                      boxShadow: "0px 4px 10px rgba(211, 47, 47, 0.3)",
                    },
                  }}
                >
                  <LogoutIcon
                    sx={{
                      color: "white",
                      marginRight: 1,
                      transition: "color 0.3s ease , transform 0.3s ease",
                      "&:hover": {
                        color: "#fc9999",
                        transform: "scale(1.1) rotate(10deg)",
                      },
                    }}
                  />
                  <ListItemText
                    primary="Logout"
                    sx={{
                      fontWeight: "bold",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#3f51b5", boxShadow: 3 }}>
      <Toolbar>
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Title */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
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
              <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
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
                    sx={{
                      position: "relative",
                      "&:hover": { backgroundColor: "#1e40af" },
                      backgroundColor:
                        location.pathname === "/signup"
                          ? "#1e40af"
                          : "transparent",
                      transition: "background-color 0.3s ease",
                      "&::after": {
                        content: '""',
                        display: "block",
                        height: "2px",
                        width: location.pathname === "/signup" ? "100%" : "0",
                        background: "#ffffff",
                        transition: "width 0.3s ease",
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                      },
                    }}
                  >
                    <SignupIcon
                      sx={{
                        color: "#fff",
                        marginRight: 1,
                        transition: "color 0.3s ease , transform 0.3s ease",
                        "&:hover": {
                          color: "powderblue",
                          transform: "scale(1.1)",
                        },
                      }}
                    />
                    Signup
                  </Button>
                  <Button
                    component={Link}
                    to="/login"
                    color="inherit"
                    sx={{
                      position: "relative",
                      "&:hover": { backgroundColor: "#1e40af" },
                      backgroundColor:
                        location.pathname === "/login"
                          ? "#1e40af"
                          : "transparent",
                      transition: "background-color 0.3s ease",
                      "&::after": {
                        content: '""',
                        display: "block",
                        height: "2px",
                        width: location.pathname === "/login" ? "100%" : "0",
                        background: "#ffffff",
                        transition: "width 0.3s ease",
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                      },
                    }}
                  >
                    <LoginIcon
                      sx={{
                        color: "#ffffff",
                        marginRight: 1,
                        transition: "color 0.3s ease , transform 0.3s ease",
                        "&:hover": {
                          color: "powderblue",
                          transform: "scale(1.1)",
                        },
                      }}
                    />
                    Login
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    component={Link}
                    to="/profile"
                    color="inherit"
                    sx={{
                      textTransform: "none",
                      position: "relative",
                      "&:hover": { backgroundColor: "#1e40af" },
                      backgroundColor:
                        location.pathname === "/profile"
                          ? "#1e40af"
                          : "transparent",
                      transition: "background-color 0.3s ease",
                      "&::after": {
                        content: '""',
                        display: "block",
                        height: "2px",
                        width: location.pathname === "/profile" ? "100%" : "0",
                        background: "#ffffff",
                        transition: "width 0.3s ease",
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                      },
                    }}
                  >
                    <AccountCircleIcon
                      sx={{ color: "white", marginRight: 1 }}
                    />
                    {/* {user.name.split(" ")[0]} */}
                    {user.name}
                  </Button>
                  <Button
                    component={Link}
                    to="/dashboard"
                    color="inherit"
                    sx={{
                      textTransform: "none",
                      position: "relative",
                      "&:hover": { backgroundColor: "#1e40af" },
                      backgroundColor:
                        location.pathname === "/dashboard"
                          ? "#1e40af"
                          : "transparent",
                      transition: "background-color 0.3s ease",
                      "&::after": {
                        content: '""',
                        display: "block",
                        height: "2px",
                        width:
                          location.pathname === "/dashboard" ? "100%" : "0",
                        background: "#ffffff",
                        transition: "width 0.3s ease",
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                      },
                    }}
                  >
                    Dashboard
                  </Button>

                  <Button
                    color="inherit"
                    onClick={handleOrdersMenuOpen}
                    endIcon={<ArrowDropDownIcon />} // Add dropdown indicator
                    sx={{
                      textTransform: "none",
                      position: "relative",
                      "&:hover": { backgroundColor: "#1e40af" },
                      transition: "background-color 0.3s ease",
                      "&::after": {
                        content: '""',
                        display: "block",
                        height: "2px",
                        width:
                          location.pathname === "/orders" ||
                          location.pathname === "/pickup-orders" ||
                          location.pathname === "/group-orders"
                            ? "100%"
                            : "0",
                        background: "#ffffff",
                        transition: "width 0.3s ease-in-out",
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                      },
                    }}
                  >
                    Orders
                  </Button>

                  <Menu
                    anchorEl={ordersMenuAnchor}
                    open={Boolean(ordersMenuAnchor)}
                    onClose={handleOrdersMenuClose}
                    MenuListProps={{ onMouseLeave: handleOrdersMenuClose }} // Close on mouse leave
                    sx={{ mt: 1 }}
                    TransitionComponent={Fade}
                  >
                    <MenuItem
                      component={Link}
                      to="/orders"
                      onClick={handleOrdersMenuClose}
                      sx={{
                        marginBottom: 1,
                        padding: "8px 16px",
                        borderRadius: "25px",
                        transition: "all 0.3s ease",
                        backgroundColor:
                          location.pathname === "/orders"
                            ? "#acceff"
                            : "transparent",
                        "&:hover": {
                          backgroundColor: "#acceff",
                          transform: "scale(1.05)",
                          boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.4)",
                        },
                      }}
                    >
                      <ViewOrderIcon
                        sx={{
                          color: "#3f51b5",
                          marginRight: 1,
                          transition: "color 0.3s ease , transform 0.3s ease",
                          "&:hover": {
                            color: "#303f9f",
                            transform: "scale(1.1)",
                          },
                        }}
                      />
                      View Orders
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/pickup-orders"
                      onClick={handleOrdersMenuClose}
                      sx={{
                        marginBottom: 1,
                        padding: "8px 16px",
                        borderRadius: "25px",
                        transition: "all 0.3s ease",
                        backgroundColor:
                          location.pathname === "/pickup-orders"
                            ? "#acceff"
                            : "transparent",
                        color: "rgb(94, 0, 165)",
                        "&:hover": {
                          color: "black",
                          background:
                            "linear-gradient(to right,rgb(139, 154, 181),rgb(134, 20, 255))",
                          transform: "scale(1.05)",
                          boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.4)",
                        },
                      }}
                    >
                      <BookPickupIcon
                        sx={{
                          color: "#3f51b5",
                          marginRight: 1,
                          transition: "color 0.3s ease , transform 0.3s ease",
                          "&:hover": {
                            color: "#303f9f",
                            transform: "scale(1.1)",
                          },
                        }}
                      />
                      Book For Pickup
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/group-orders"
                      onClick={handleOrdersMenuClose}
                      sx={{
                        padding: "8px 16px",
                        borderRadius: "25px",
                        transition: "all 0.3s ease",
                        backgroundColor:
                          location.pathname === "/group-orders"
                            ? "#acceff"
                            : "transparent",
                        "&:hover": {
                          backgroundColor: "#acceff",
                          transform: "scale(1.05)",
                          boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.4)",
                        },
                      }}
                    >
                      <GroupOrderIcon
                        sx={{
                          color: "#3f51b5",
                          marginRight: 1,
                          transition: "color 0.3s ease , transform 0.3s ease",
                          "&:hover": {
                            color: "#303f9f",
                            transform: "scale(1.1)",
                          },
                        }}
                      />
                      View Group Orders
                    </MenuItem>
                  </Menu>

                  <Button
                    onClick={logout}
                    color="inherit"
                    sx={{ "&:hover": { backgroundColor: "#b23b3b" } }}
                  >
                    <LogoutIcon
                      sx={{
                        color: "#fff",
                        marginRight: 0.5,
                        transition: "color 0.3s ease , transform 0.3s ease",
                        "&:hover": {
                          color: "powderblue",
                          transform: "scale(1.1) rotate(10deg)",
                        },
                      }}
                    />
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
});

export default Header;

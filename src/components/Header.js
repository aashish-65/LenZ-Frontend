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
  Menu,
  MenuItem,
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

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if it's a mobile screen
  const [drawerOpen, setDrawerOpen] = useState(false); // State to control the drawer
  const [ordersMenuAnchor, setOrdersMenuAnchor] = useState(null);

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
                  "&:hover": {
                    backgroundColor: "#acceff", // Darker blue on hover
                    transform: "scale(1.05)", // Slight zoom
                    boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.4)", // Shadow effect
                  },
                }}
              >
                <HomeIcon
                  sx={{
                    color: "#3f51b5",
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
                  "&:hover": {
                    backgroundColor: "#acceff", // Darker blue on hover
                    transform: "scale(1.05)", // Slight zoom
                    boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.4)", // Shadow effect
                  },
                }}
              >
                <LoginIcon
                  sx={{
                    color: "#3f51b5",
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
                  "&:hover": {
                    backgroundColor: "#acceff",
                    transform: "scale(1.05)",
                    boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.4)",
                  },
                }}
              >
                <SignupIcon
                  sx={{
                    color: "#3f51b5",
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
                  "&:hover": {
                    backgroundColor: "#acceff", // Darker blue on hover
                    transform: "scale(1.05)", // Slight zoom
                    boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.4)", // Shadow effect
                  },
                }}
              >
                <HomeIcon
                  sx={{
                    color: "#3f51b5",
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
                to="/dashboard"
                sx={{
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#acceff", // Darker blue on hover
                    transform: "scale(1.05)", // Slight zoom
                    boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.4)", // Shadow effect
                  },
                }}
              >
                <DashboardIcon
                  sx={{
                    color: "#3f51b5",
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
                    "&:hover": {
                      backgroundColor: "#acceff", // Darker blue on hover
                      transform: "scale(1.05)", // Slight zoom
                      boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.4)", // Shadow effect
                    },
                  }}
                >
                  <ViewOrderIcon
                    sx={{
                      color: "#3f51b5",
                      marginRight: 1,
                      transition: "color 0.3s ease , transform 0.3s ease",
                      "&:hover": { color: "#303f9f", transform: "scale(1.1)" },
                    }}
                  />
                  <ListItemText primary="View Orders" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/pickup-orders"
                  sx={{
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background:
                        "linear-gradient(to right,rgb(139, 154, 181),rgb(134, 20, 255))",
                      transform: "scale(1.05)", // Slight zoom
                      boxShadow: "0px 4px 10px rgba(106, 63, 181, 0.4)", // Shadow effect
                    },
                  }}
                >
                  <BookPickupIcon
                    sx={{
                      color: "#3f51b5",
                      marginRight: 1,
                      transition: "color 0.3s ease , transform 0.3s ease",
                      "&:hover": { color: "#fff", transform: "scale(1.1)" },
                    }}
                  />
                  <ListItemText
                    primary="Book For Pickup"
                    sx={{
                      fontWeight: "bold",
                      transition: "color 0.3s ease",
                      color: "rgb(94, 0, 165)",
                      "&:hover": { color: "#fff" }, // Text turns darker red on hover
                    }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/group-orders"
                  sx={{
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#acceff", // Darker blue on hover
                      transform: "scale(1.05)", // Slight zoom
                      boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.4)", // Shadow effect
                    },
                  }}
                >
                  <GroupOrderIcon
                    sx={{
                      color: "#3f51b5",
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
                    "&:hover": {
                      backgroundColor: "#acceff",
                      transform: "scale(1.05)",
                      boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.4)",
                    },
                  }}
                >
                  <AccountCircleIcon
                    sx={{
                      color: "#3f51b5",
                      marginRight: 1,
                      transition: "color 0.3s ease , transform 0.3s ease",
                      "&:hover": { color: "#303f9f", transform: "scale(1.1)" },
                    }}
                  />
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={logout}
                  sx={{
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#ffebee",
                      transform: "scale(1.05)",
                      boxShadow: "0px 4px 10px rgba(211, 47, 47, 0.3)",
                    },
                  }}
                >
                  <LogoutIcon
                    sx={{
                      color: "#3f51b5",
                      marginRight: 1,
                      transition: "color 0.3s ease , transform 0.3s ease", // Smooth color transition
                      "&:hover": {
                        color: "#d32f2f",
                        transform: "scale(1.1) rotate(10deg)",
                      }, // Red color on hover
                    }}
                  />
                  <ListItemText
                    primary="Logout"
                    sx={{
                      fontWeight: "bold",
                      transition: "color 0.3s ease",
                      "&:hover": { color: "#b71c1c" }, // Text turns darker red on hover
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
                    sx={{ "&:hover": { backgroundColor: "#1e40af" } }}
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
                    sx={{ "&:hover": { backgroundColor: "#1e40af" } }}
                  >
                    <LoginIcon
                      sx={{
                        color: "ffffff",
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
                    sx={{ "&:hover": { backgroundColor: "#1e40af" } }}
                  >
                    <AccountCircleIcon
                      sx={{ color: "white", marginRight: 1 }}
                    />
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
                    color="inherit"
                    onClick={handleOrdersMenuOpen}
                    endIcon={<ArrowDropDownIcon />} // Add dropdown indicator
                    sx={{
                      "&:hover": { backgroundColor: "#1e40af" },
                      position: "relative",
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
                  >
                    <MenuItem
                      component={Link}
                      to="/orders"
                      onClick={handleOrdersMenuClose}
                      sx={{
                        borderRadius: "25px",
                        transition: "all 0.3s ease",
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
                        borderRadius: "25px",
                        transition: "all 0.3s ease",
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
                        borderRadius: "25px",
                        transition: "all 0.3s ease",
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

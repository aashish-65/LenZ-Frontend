// import React, { useState, useContext, memo } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Container,
//   Box,
//   IconButton,
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   Divider,
//   useMediaQuery,
//   Menu,
//   MenuItem,
//   Fade,
// } from "@mui/material";
// import { AuthContext } from "../AuthContext";
// import MenuIcon from "@mui/icons-material/Menu";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import CloseIcon from "@mui/icons-material/Close"; // For close button in the hamburger
// import { useTheme } from "@mui/material/styles";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import HomeIcon from "@mui/icons-material/Home";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import LogoutIcon from "@mui/icons-material/Logout";
// import ViewOrderIcon from "@mui/icons-material/ViewList";
// import GroupOrderIcon from "@mui/icons-material/ListAlt";
// import BookPickupIcon from "@mui/icons-material/ShoppingCartCheckout";
// import LoginIcon from "@mui/icons-material/Login";
// import SignupIcon from "@mui/icons-material/AppRegistration";

// const Header = memo(() => {
//   const { user, logout } = useContext(AuthContext);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if it's a mobile screen
//   const [drawerOpen, setDrawerOpen] = useState(false); // State to control the drawer
//   const [ordersMenuAnchor, setOrdersMenuAnchor] = useState(null);
//   const location = useLocation();

//   const handleOrdersMenuOpen = (event) =>
//     setOrdersMenuAnchor(event.currentTarget);
//   const handleOrdersMenuClose = () => setOrdersMenuAnchor(null);

//   // Handle Drawer Toggle
//   const toggleDrawer = (open) => (event) => {
//     if (
//       event.type === "keydown" &&
//       (event.key === "Tab" || event.key === "Shift")
//     ) {
//       return;
//     }
//     setDrawerOpen(open);
//   };

//   // Drawer Content
//   const drawerContent = (
//     <Box
//       sx={{ width: 250, padding: 2 }}
//       role="presentation"
//       onClick={toggleDrawer(false)}
//       onKeyDown={toggleDrawer(false)}
//     >
//       <List>
//         {!user ? (
//           <>
//             <ListItem disablePadding>
//               <ListItemButton
//                 component={Link}
//                 to="/"
//                 sx={{
//                   borderRadius: "8px",
//                   transition: "all 0.3s ease",
//                   backgroundColor:
//                     location.pathname === "/dashboard"
//                       ? "#303f9f"
//                       : "transparent",
//                   color:
//                     location.pathname === "/dashboard" ? "white" : "inherit",
//                   "&:hover": {
//                     backgroundColor: "#acceff",
//                     transform: "scale(1.05)",
//                     boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.4)",
//                   },
//                 }}
//               >
//                 <HomeIcon
//                   sx={{
//                     color:
//                       location.pathname === "/dashboard" ? "white" : "#3f51b5",
//                     marginRight: 1,
//                     transition: "color 0.3s ease , transform 0.3s ease",
//                     "&:hover": { color: "#303f9f", transform: "scale(1.1)" },
//                   }}
//                 />
//                 <ListItemText primary="Home" />
//               </ListItemButton>
//             </ListItem>
//             <ListItem disablePadding>
//               <ListItemButton
//                 component={Link}
//                 to="/login"
//                 sx={{
//                   borderRadius: "8px",
//                   transition: "all 0.3s ease",
//                   backgroundColor:
//                     location.pathname === "/login" ? "#303f9f" : "transparent",
//                   color: location.pathname === "/login" ? "white" : "inherit",
//                   "&:hover": {
//                     color: location.pathname === "/login" ? "#3f51b5" : "black",
//                     backgroundColor: "#acceff", // Darker blue on hover
//                     transform: "scale(1.05)", // Slight zoom
//                     boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.4)", // Shadow effect
//                   },
//                 }}
//               >
//                 <LoginIcon
//                   sx={{
//                     color: location.pathname === "/login" ? "white" : "#3f51b5",
//                     marginRight: 1,
//                     transition: "color 0.3s ease , transform 0.3s ease",
//                     "&:hover": { color: "#303f9f", transform: "scale(1.1)" },
//                   }}
//                 />
//                 <ListItemText primary="Login" />
//               </ListItemButton>
//             </ListItem>
//             <ListItem disablePadding>
//               <ListItemButton
//                 component={Link}
//                 to="/signup"
//                 sx={{
//                   borderRadius: "8px",
//                   transition: "all 0.3s ease",
//                   backgroundColor:
//                     location.pathname === "/signup" ? "#303f9f" : "transparent",
//                   color: location.pathname === "/signup" ? "white" : "inherit",
//                   "&:hover": {
//                     color:
//                       location.pathname === "/signup" ? "#3f51b5" : "black",
//                     backgroundColor: "#acceff",
//                     transform: "scale(1.05)",
//                     boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.4)",
//                   },
//                 }}
//               >
//                 <SignupIcon
//                   sx={{
//                     color:
//                       location.pathname === "/signup" ? "white" : "#3f51b5",
//                     marginRight: 1,
//                     transition: "color 0.3s ease , transform 0.3s ease",
//                     "&:hover": { color: "#303f9f", transform: "scale(1.1)" },
//                   }}
//                 />
//                 <ListItemText primary="Signup" />
//               </ListItemButton>
//             </ListItem>
//           </>
//         ) : (
//           <>
//             <ListItem disablePadding>
//               <ListItemButton
//                 component={Link}
//                 to="/"
//                 sx={{
//                   borderRadius: "8px",
//                   transition: "all 0.3s ease",
//                   backgroundColor:
//                     location.pathname === "/" ? "#303f9f" : "transparent",
//                   color: location.pathname === "/" ? "white" : "inherit",
//                   "&:hover": {
//                     color: location.pathname === "/" ? "#3f51b5" : "black",
//                     backgroundColor: "#acceff", // Darker blue on hover
//                     transform: "scale(1.05)", // Slight zoom
//                     boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.4)", // Shadow effect
//                   },
//                 }}
//               >
//                 <HomeIcon
//                   sx={{
//                     color: location.pathname === "/" ? "white" : "#3f51b5",
//                     marginRight: 1,
//                     transition: "color 0.3s ease , transform 0.3s ease",
//                     "&:hover": { color: "#303f9f", transform: "scale(1.1)" },
//                   }}
//                 />
//                 <ListItemText primary="Home" />
//               </ListItemButton>
//             </ListItem>
//             <ListItem disablePadding sx={{ marginTop: 1 }}>
//               <ListItemButton
//                 component={Link}
//                 to="/dashboard"
//                 sx={{
//                   borderRadius: "8px",
//                   transition: "all 0.3s ease",
//                   backgroundColor:
//                     location.pathname === "/dashboard"
//                       ? "#303f9f"
//                       : "transparent",
//                   color:
//                     location.pathname === "/dashboard" ? "white" : "inherit",
//                   "&:hover": {
//                     color:
//                       location.pathname === "/dashboard" ? "#3f51b5" : "black",
//                     backgroundColor: "#acceff", // Darker blue on hover
//                     transform: "scale(1.05)", // Slight zoom
//                     boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.4)", // Shadow effect
//                   },
//                 }}
//               >
//                 <DashboardIcon
//                   sx={{
//                     color:
//                       location.pathname === "/dashboard" ? "white" : "#3f51b5",
//                     marginRight: 1,
//                     transition: "color 0.3s ease , transform 0.3s ease",
//                     "&:hover": { color: "#303f9f", transform: "scale(1.1)" },
//                   }}
//                 />
//                 <ListItemText primary="Dashboard" />
//               </ListItemButton>
//             </ListItem>

//             <Divider sx={{ my: 1 }} />
//             <Typography
//               sx={{
//                 pl: 2,
//                 pt: 1,
//                 pb: 1,
//                 fontWeight: "bold",
//                 fontSize: 14,
//                 color: "gray",
//               }}
//             >
//               Orders
//             </Typography>
//             <List>
//               <ListItem disablePadding>
//                 <ListItemButton
//                   component={Link}
//                   to="/orders"
//                   sx={{
//                     borderRadius: "8px",
//                     transition: "all 0.3s ease",
//                     backgroundColor:
//                       location.pathname === "/orders"
//                         ? "#303f9f"
//                         : "transparent",
//                     color:
//                       location.pathname === "/orders" ? "white" : "inherit",
//                     "&:hover": {
//                       color:
//                         location.pathname === "/orders" ? "#3f51b5" : "black",
//                       backgroundColor: "#acceff", // Darker blue on hover
//                       transform: "scale(1.05)", // Slight zoom
//                       boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.4)", // Shadow effect
//                     },
//                   }}
//                 >
//                   <ViewOrderIcon
//                     sx={{
//                       color:
//                         location.pathname === "/orders" ? "white" : "#3f51b5",
//                       marginRight: 1,
//                       transition: "color 0.3s ease , transform 0.3s ease",
//                       "&:hover": { color: "#303f9f", transform: "scale(1.1)" },
//                     }}
//                   />
//                   <ListItemText primary="View Orders" />
//                 </ListItemButton>
//               </ListItem>
//               <ListItem disablePadding sx={{ marginTop: 1 }}>
//                 <ListItemButton
//                   component={Link}
//                   to="/pickup-orders"
//                   sx={{
//                     borderRadius: "8px",
//                     transition: "all 0.3s ease",
//                     background:
//                       location.pathname === "/pickup-orders"
//                         ? "linear-gradient(to right,rgb(139, 154, 181),rgb(134, 20, 255))"
//                         : "transparent",
//                     color:
//                       location.pathname === "/pickup-orders"
//                         ? "white"
//                         : "rgb(94, 0, 165)",
//                     "&:hover": {
//                       color:
//                         location.pathname === "/pickup-orders"
//                           ? "white"
//                           : "white",
//                       background:
//                         "linear-gradient(to right,rgb(139, 154, 181),rgb(134, 20, 255))",
//                       transform: "scale(1.05)", // Slight zoom
//                       boxShadow: "0px 4px 10px rgba(106, 63, 181, 0.4)", // Shadow effect
//                     },
//                   }}
//                 >
//                   <BookPickupIcon
//                     sx={{
//                       color:
//                         location.pathname === "/pickup-orders"
//                           ? "white"
//                           : "#3f51b5",
//                       marginRight: 1,
//                       transition: "color 0.3s ease , transform 0.3s ease",
//                       "&:hover": { color: "#fff", transform: "scale(1.1)" },
//                     }}
//                   />
//                   <ListItemText
//                     primary="Book For Pickup"
//                     sx={{
//                       fontWeight: "bold",
//                     }}
//                   />
//                 </ListItemButton>
//               </ListItem>
//               <ListItem disablePadding sx={{ marginTop: 1 }}>
//                 <ListItemButton
//                   component={Link}
//                   to="/group-orders"
//                   sx={{
//                     borderRadius: "8px",
//                     transition: "all 0.3s ease",
//                     backgroundColor:
//                       location.pathname === "/group-orders"
//                         ? "#303f9f"
//                         : "transparent",
//                     color:
//                       location.pathname === "/group-orders"
//                         ? "white"
//                         : "inherit",
//                     "&:hover": {
//                       color:
//                         location.pathname === "/group-orders"
//                           ? "#3f51b5"
//                           : "black",
//                       backgroundColor: "#acceff",
//                       transform: "scale(1.05)",
//                       boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.4)",
//                     },
//                   }}
//                 >
//                   <GroupOrderIcon
//                     sx={{
//                       color:
//                         location.pathname === "/group-orders"
//                           ? "white"
//                           : "#3f51b5",
//                       marginRight: 1,
//                       transition: "color 0.3s ease , transform 0.3s ease",
//                       "&:hover": { color: "#303f9f", transform: "scale(1.1)" },
//                     }}
//                   />
//                   <ListItemText primary="View Group Orders" />
//                 </ListItemButton>
//               </ListItem>
//             </List>
//             <Divider sx={{ my: 1 }} />
//             <Typography
//               sx={{
//                 pl: 2,
//                 pt: 1,
//                 pb: 1,
//                 fontWeight: "bold",
//                 fontSize: 14,
//                 color: "gray",
//               }}
//             >
//               Account
//             </Typography>
//             <List>
//               <ListItem disablePadding>
//                 <ListItemButton
//                   component={Link}
//                   to="/profile"
//                   sx={{
//                     borderRadius: "8px",
//                     transition: "all 0.3s ease",
//                     backgroundColor:
//                       location.pathname === "/profile"
//                         ? "#303f9f"
//                         : "transparent",
//                     color:
//                       location.pathname === "/profile" ? "white" : "inherit",
//                     "&:hover": {
//                       color:
//                         location.pathname === "/profile" ? "#3f51b5" : "black",
//                       backgroundColor: "#acceff",
//                       transform: "scale(1.05)",
//                       boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.4)",
//                     },
//                   }}
//                 >
//                   <AccountCircleIcon
//                     sx={{
//                       color:
//                         location.pathname === "/profile" ? "white" : "#3f51b5",
//                       marginRight: 1,
//                       transition: "color 0.3s ease , transform 0.3s ease",
//                       "&:hover": { color: "#303f9f", transform: "scale(1.1)" },
//                     }}
//                   />
//                   <ListItemText primary="Profile" />
//                 </ListItemButton>
//               </ListItem>
//               <ListItem disablePadding sx={{ marginTop: 1 }}>
//                 <ListItemButton
//                   onClick={logout}
//                   sx={{
//                     borderRadius: "8px",
//                     transition: "all 0.3s ease",
//                     backgroundColor: "#d32f2f",
//                     color: "white",
//                     "&:hover": {
//                       backgroundColor: "#f24b4b",
//                       transform: "scale(1.05)",
//                       boxShadow: "0px 4px 10px rgba(211, 47, 47, 0.3)",
//                     },
//                   }}
//                 >
//                   <LogoutIcon
//                     sx={{
//                       color: "white",
//                       marginRight: 1,
//                       transition: "color 0.3s ease , transform 0.3s ease",
//                       "&:hover": {
//                         color: "#fc9999",
//                         transform: "scale(1.1) rotate(10deg)",
//                       },
//                     }}
//                   />
//                   <ListItemText
//                     primary="Logout"
//                     sx={{
//                       fontWeight: "bold",
//                     }}
//                   />
//                 </ListItemButton>
//               </ListItem>
//             </List>
//           </>
//         )}
//       </List>
//     </Box>
//   );

//   return (
//     <AppBar position="sticky" sx={{ backgroundColor: "#3f51b5", boxShadow: 3 }}>
//       <Toolbar>
//         <Container
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           {/* Title */}
//           <Typography
//             variant="h6"
//             component="div"
//             sx={{ flexGrow: 1, fontWeight: "bold" }}
//           >
//             LenZ
//           </Typography>

//           {/* Hamburger Menu for Mobile */}
//           {isMobile ? (
//             <>
//               <IconButton
//                 color="inherit"
//                 onClick={toggleDrawer(true)}
//                 sx={{
//                   transition: "transform 0.3s ease",
//                   transform: drawerOpen ? "rotate(90deg)" : "rotate(0deg)",
//                 }}
//               >
//                 {drawerOpen ? <CloseIcon /> : <MenuIcon />}
//               </IconButton>
//               <Drawer
//                 anchor="left"
//                 open={drawerOpen}
//                 onClose={toggleDrawer(false)}
//               >
//                 {drawerContent}
//               </Drawer>
//             </>
//           ) : (
//             /* Navigation Links for Desktop */
//             <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
//               {!user ? (
//                 <>
//                   <Button
//                     component={Link}
//                     to="/signup"
//                     color="inherit"
//                     sx={{
//                       position: "relative",
//                       "&:hover": { backgroundColor: "#1e40af" },
//                       backgroundColor:
//                         location.pathname === "/signup"
//                           ? "#1e40af"
//                           : "transparent",
//                       transition: "background-color 0.3s ease",
//                       "&::after": {
//                         content: '""',
//                         display: "block",
//                         height: "2px",
//                         width: location.pathname === "/signup" ? "100%" : "0",
//                         background: "#ffffff",
//                         transition: "width 0.3s ease",
//                         position: "absolute",
//                         bottom: 0,
//                         left: 0,
//                       },
//                     }}
//                   >
//                     <SignupIcon
//                       sx={{
//                         color: "#fff",
//                         marginRight: 1,
//                         transition: "color 0.3s ease , transform 0.3s ease",
//                         "&:hover": {
//                           color: "powderblue",
//                           transform: "scale(1.1)",
//                         },
//                       }}
//                     />
//                     Signup
//                   </Button>
//                   <Button
//                     component={Link}
//                     to="/login"
//                     color="inherit"
//                     sx={{
//                       position: "relative",
//                       "&:hover": { backgroundColor: "#1e40af" },
//                       backgroundColor:
//                         location.pathname === "/login"
//                           ? "#1e40af"
//                           : "transparent",
//                       transition: "background-color 0.3s ease",
//                       "&::after": {
//                         content: '""',
//                         display: "block",
//                         height: "2px",
//                         width: location.pathname === "/login" ? "100%" : "0",
//                         background: "#ffffff",
//                         transition: "width 0.3s ease",
//                         position: "absolute",
//                         bottom: 0,
//                         left: 0,
//                       },
//                     }}
//                   >
//                     <LoginIcon
//                       sx={{
//                         color: "#ffffff",
//                         marginRight: 1,
//                         transition: "color 0.3s ease , transform 0.3s ease",
//                         "&:hover": {
//                           color: "powderblue",
//                           transform: "scale(1.1)",
//                         },
//                       }}
//                     />
//                     Login
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   <Button
//                     component={Link}
//                     to="/profile"
//                     color="inherit"
//                     sx={{
//                       textTransform: "none",
//                       position: "relative",
//                       "&:hover": { backgroundColor: "#1e40af" },
//                       backgroundColor:
//                         location.pathname === "/profile"
//                           ? "#1e40af"
//                           : "transparent",
//                       transition: "background-color 0.3s ease",
//                       "&::after": {
//                         content: '""',
//                         display: "block",
//                         height: "2px",
//                         width: location.pathname === "/profile" ? "100%" : "0",
//                         background: "#ffffff",
//                         transition: "width 0.3s ease",
//                         position: "absolute",
//                         bottom: 0,
//                         left: 0,
//                       },
//                     }}
//                   >
//                     <AccountCircleIcon
//                       sx={{ color: "white", marginRight: 1 }}
//                     />
//                     {/* {user.name.split(" ")[0]} */}
//                     {user.name}
//                   </Button>
//                   <Button
//                     component={Link}
//                     to="/dashboard"
//                     color="inherit"
//                     sx={{
//                       textTransform: "none",
//                       position: "relative",
//                       "&:hover": { backgroundColor: "#1e40af" },
//                       backgroundColor:
//                         location.pathname === "/dashboard"
//                           ? "#1e40af"
//                           : "transparent",
//                       transition: "background-color 0.3s ease",
//                       "&::after": {
//                         content: '""',
//                         display: "block",
//                         height: "2px",
//                         width:
//                           location.pathname === "/dashboard" ? "100%" : "0",
//                         background: "#ffffff",
//                         transition: "width 0.3s ease",
//                         position: "absolute",
//                         bottom: 0,
//                         left: 0,
//                       },
//                     }}
//                   >
//                     Dashboard
//                   </Button>

//                   <Button
//                     color="inherit"
//                     onClick={handleOrdersMenuOpen}
//                     endIcon={<ArrowDropDownIcon />} // Add dropdown indicator
//                     sx={{
//                       textTransform: "none",
//                       position: "relative",
//                       "&:hover": { backgroundColor: "#1e40af" },
//                       transition: "background-color 0.3s ease",
//                       "&::after": {
//                         content: '""',
//                         display: "block",
//                         height: "2px",
//                         width:
//                           location.pathname === "/orders" ||
//                           location.pathname === "/pickup-orders" ||
//                           location.pathname === "/group-orders"
//                             ? "100%"
//                             : "0",
//                         background: "#ffffff",
//                         transition: "width 0.3s ease-in-out",
//                         position: "absolute",
//                         bottom: 0,
//                         left: 0,
//                       },
//                     }}
//                   >
//                     Orders
//                   </Button>

//                   <Menu
//                     anchorEl={ordersMenuAnchor}
//                     open={Boolean(ordersMenuAnchor)}
//                     onClose={handleOrdersMenuClose}
//                     MenuListProps={{ onMouseLeave: handleOrdersMenuClose }} // Close on mouse leave
//                     sx={{ mt: 1 }}
//                     TransitionComponent={Fade}
//                   >
//                     <MenuItem
//                       component={Link}
//                       to="/orders"
//                       onClick={handleOrdersMenuClose}
//                       sx={{
//                         marginBottom: 1,
//                         padding: "8px 16px",
//                         borderRadius: "25px",
//                         transition: "all 0.3s ease",
//                         backgroundColor:
//                           location.pathname === "/orders"
//                             ? "#acceff"
//                             : "transparent",
//                         "&:hover": {
//                           backgroundColor: "#acceff",
//                           transform: "scale(1.05)",
//                           boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.4)",
//                         },
//                       }}
//                     >
//                       <ViewOrderIcon
//                         sx={{
//                           color: "#3f51b5",
//                           marginRight: 1,
//                           transition: "color 0.3s ease , transform 0.3s ease",
//                           "&:hover": {
//                             color: "#303f9f",
//                             transform: "scale(1.1)",
//                           },
//                         }}
//                       />
//                       View Orders
//                     </MenuItem>
//                     <MenuItem
//                       component={Link}
//                       to="/pickup-orders"
//                       onClick={handleOrdersMenuClose}
//                       sx={{
//                         marginBottom: 1,
//                         padding: "8px 16px",
//                         borderRadius: "25px",
//                         transition: "all 0.3s ease",
//                         backgroundColor:
//                           location.pathname === "/pickup-orders"
//                             ? "#acceff"
//                             : "transparent",
//                         color: "rgb(94, 0, 165)",
//                         "&:hover": {
//                           color: "black",
//                           background:
//                             "linear-gradient(to right,rgb(139, 154, 181),rgb(134, 20, 255))",
//                           transform: "scale(1.05)",
//                           boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.4)",
//                         },
//                       }}
//                     >
//                       <BookPickupIcon
//                         sx={{
//                           color: "#3f51b5",
//                           marginRight: 1,
//                           transition: "color 0.3s ease , transform 0.3s ease",
//                           "&:hover": {
//                             color: "#303f9f",
//                             transform: "scale(1.1)",
//                           },
//                         }}
//                       />
//                       Book For Pickup
//                     </MenuItem>
//                     <MenuItem
//                       component={Link}
//                       to="/group-orders"
//                       onClick={handleOrdersMenuClose}
//                       sx={{
//                         padding: "8px 16px",
//                         borderRadius: "25px",
//                         transition: "all 0.3s ease",
//                         backgroundColor:
//                           location.pathname === "/group-orders"
//                             ? "#acceff"
//                             : "transparent",
//                         "&:hover": {
//                           backgroundColor: "#acceff",
//                           transform: "scale(1.05)",
//                           boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.4)",
//                         },
//                       }}
//                     >
//                       <GroupOrderIcon
//                         sx={{
//                           color: "#3f51b5",
//                           marginRight: 1,
//                           transition: "color 0.3s ease , transform 0.3s ease",
//                           "&:hover": {
//                             color: "#303f9f",
//                             transform: "scale(1.1)",
//                           },
//                         }}
//                       />
//                       View Group Orders
//                     </MenuItem>
//                   </Menu>

//                   <Button
//                     onClick={logout}
//                     color="inherit"
//                     sx={{ "&:hover": { backgroundColor: "#b23b3b" } }}
//                   >
//                     <LogoutIcon
//                       sx={{
//                         color: "#fff",
//                         marginRight: 0.5,
//                         transition: "color 0.3s ease , transform 0.3s ease",
//                         "&:hover": {
//                           color: "powderblue",
//                           transform: "scale(1.1) rotate(10deg)",
//                         },
//                       }}
//                     />
//                     Logout
//                   </Button>
//                 </>
//               )}
//             </Box>
//           )}
//         </Container>
//       </Toolbar>
//     </AppBar>
//   );
// });

// export default Header;

import React, { useState, useContext, memo, useEffect } from "react";
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
  Avatar,
  // Badge,
  Tooltip,
} from "@mui/material";
import { AuthContext } from "../AuthContext";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme, alpha } from "@mui/material/styles";
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
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [ordersMenuAnchor, setOrdersMenuAnchor] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

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

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.name) return "U";
    const nameParts = user.name.split(" ");
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    return (
      nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)
    ).toUpperCase();
  };

  // Check if route is active
  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  // Gradient for special buttons
  const specialGradient = "linear-gradient(to right, #6a11cb, #2575fc)";
  const specialGradientHover = "linear-gradient(to right, #8a11cb, #3575fc)";

  // Drawer Content
  const drawerContent = (
    <Box
      sx={{
        width: 280,
        height: "100%",
        padding: 3,
        background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(to right, #3f51b5, #6a11cb)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          LenZ
        </Typography>
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </Box>

      {user && (
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Avatar
            component={Link}
            to="/profile"
            sx={{
              bgcolor: "#3f51b5",
              color: "white",
              width: 40,
              height: 40,
              marginRight: 2,
              boxShadow: "0 4px 12px rgba(63, 81, 181, 0.2)",
              textDecoration: "none",
            }}
          >
            {getUserInitials()}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {user.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Welcome back!
            </Typography>
          </Box>
        </Box>
      )}

      <List>
        {!user ? (
          <>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/"
                sx={{
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  backgroundColor: isActive("/")
                    ? alpha("#3f51b5", 0.1)
                    : "transparent",
                  color: isActive("/") ? "#3f51b5" : "text.primary",
                  mb: 1,
                  "&:hover": {
                    backgroundColor: alpha("#3f51b5", 0.15),
                    transform: "translateY(-2px)",
                    boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.15)",
                  },
                }}
              >
                <HomeIcon
                  sx={{
                    color: isActive("/") ? "#3f51b5" : "#757575",
                    marginRight: 2,
                    transition: "color 0.3s ease, transform 0.3s ease",
                  }}
                />
                <ListItemText
                  primary="Home"
                  primaryTypographyProps={{
                    fontWeight: isActive("/") ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/login"
                sx={{
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  backgroundColor: isActive("/login")
                    ? alpha("#3f51b5", 0.1)
                    : "transparent",
                  color: isActive("/login") ? "#3f51b5" : "text.primary",
                  mb: 1,
                  "&:hover": {
                    backgroundColor: alpha("#3f51b5", 0.15),
                    transform: "translateY(-2px)",
                    boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.15)",
                  },
                }}
              >
                <LoginIcon
                  sx={{
                    color: isActive("/login") ? "#3f51b5" : "#757575",
                    marginRight: 2,
                    transition: "color 0.3s ease, transform 0.3s ease",
                  }}
                />
                <ListItemText
                  primary="Login"
                  primaryTypographyProps={{
                    fontWeight: isActive("/login") ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/signup"
                sx={{
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  background: isActive("/signup")
                    ? specialGradient
                    : "transparent",
                  color: isActive("/signup") ? "white" : "text.primary",
                  mb: 1,
                  "&:hover": {
                    background: specialGradient,
                    color: "white",
                    transform: "translateY(-2px)",
                    boxShadow: "0px 4px 15px rgba(106, 17, 203, 0.25)",
                  },
                }}
              >
                <SignupIcon
                  sx={{
                    color: isActive("/signup") ? "white" : "#757575",
                    marginRight: 2,
                    transition: "color 0.3s ease, transform 0.3s ease",
                  }}
                />
                <ListItemText
                  primary="Signup"
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
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
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  backgroundColor:
                    isActive("/") && location.pathname === "/"
                      ? alpha("#3f51b5", 0.1)
                      : "transparent",
                  color:
                    isActive("/") && location.pathname === "/"
                      ? "#3f51b5"
                      : "text.primary",
                  mb: 1,
                  "&:hover": {
                    backgroundColor: alpha("#3f51b5", 0.15),
                    transform: "translateY(-2px)",
                    boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.15)",
                  },
                }}
              >
                <HomeIcon
                  sx={{
                    color:
                      isActive("/") && location.pathname === "/"
                        ? "#3f51b5"
                        : "#757575",
                    marginRight: 2,
                    transition: "color 0.3s ease, transform 0.3s ease",
                  }}
                />
                <ListItemText
                  primary="Home"
                  primaryTypographyProps={{
                    fontWeight:
                      isActive("/") && location.pathname === "/" ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/dashboard"
                sx={{
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  backgroundColor: isActive("/dashboard")
                    ? alpha("#3f51b5", 0.1)
                    : "transparent",
                  color: isActive("/dashboard") ? "#3f51b5" : "text.primary",
                  mb: 1,
                  "&:hover": {
                    backgroundColor: alpha("#3f51b5", 0.15),
                    transform: "translateY(-2px)",
                    boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.15)",
                  },
                }}
              >
                <DashboardIcon
                  sx={{
                    color: isActive("/dashboard") ? "#3f51b5" : "#757575",
                    marginRight: 2,
                    transition: "color 0.3s ease, transform 0.3s ease",
                  }}
                />
                <ListItemText
                  primary="Dashboard"
                  primaryTypographyProps={{
                    fontWeight: isActive("/dashboard") ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>

            <Divider sx={{ my: 2 }} />
            <Typography
              sx={{
                pl: 2,
                pb: 1,
                fontWeight: 600,
                fontSize: 14,
                color: "text.secondary",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Orders
            </Typography>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/orders"
                sx={{
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  backgroundColor: isActive("/orders")
                    ? alpha("#3f51b5", 0.1)
                    : "transparent",
                  color: isActive("/orders") ? "#3f51b5" : "text.primary",
                  mb: 1,
                  "&:hover": {
                    backgroundColor: alpha("#3f51b5", 0.15),
                    transform: "translateY(-2px)",
                    boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.15)",
                  },
                }}
              >
                <ViewOrderIcon
                  sx={{
                    color: isActive("/orders") ? "#3f51b5" : "#757575",
                    marginRight: 2,
                    transition: "color 0.3s ease, transform 0.3s ease",
                  }}
                />
                <ListItemText
                  primary="View Orders"
                  primaryTypographyProps={{
                    fontWeight: isActive("/orders") ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/pickup-orders"
                sx={{
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  background: isActive("/pickup-orders")
                    ? specialGradient
                    : "transparent",
                  color: isActive("/pickup-orders") ? "white" : "text.primary",
                  mb: 1,
                  "&:hover": {
                    background: specialGradient,
                    color: "white",
                    transform: "translateY(-2px)",
                    boxShadow: "0px 4px 15px rgba(106, 17, 203, 0.25)",
                  },
                }}
              >
                <BookPickupIcon
                  sx={{
                    color: isActive("/pickup-orders") ? "white" : "#757575",
                    marginRight: 2,
                    transition: "color 0.3s ease, transform 0.3s ease",
                  }}
                />
                <ListItemText
                  primary="Book For Pickup"
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
                {/* <Badge
                  color="error"
                  variant="dot"
                  invisible={true}
                  sx={{ ml: 1 }}
                /> */}
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/group-orders"
                sx={{
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  backgroundColor: isActive("/group-orders")
                    ? alpha("#3f51b5", 0.1)
                    : "transparent",
                  color: isActive("/group-orders") ? "#3f51b5" : "text.primary",
                  mb: 1,
                  "&:hover": {
                    backgroundColor: alpha("#3f51b5", 0.15),
                    transform: "translateY(-2px)",
                    boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.15)",
                  },
                }}
              >
                <GroupOrderIcon
                  sx={{
                    color: isActive("/group-orders") ? "#3f51b5" : "#757575",
                    marginRight: 2,
                    transition: "color 0.3s ease, transform 0.3s ease",
                  }}
                />
                <ListItemText
                  primary="View Group Orders"
                  primaryTypographyProps={{
                    fontWeight: isActive("/group-orders") ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
            <Divider sx={{ my: 2 }} />
            <Typography
              sx={{
                pl: 2,
                pb: 1,
                fontWeight: 600,
                fontSize: 14,
                color: "text.secondary",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Account
            </Typography>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/profile"
                sx={{
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  backgroundColor: isActive("/profile")
                    ? alpha("#3f51b5", 0.1)
                    : "transparent",
                  color: isActive("/profile") ? "#3f51b5" : "text.primary",
                  mb: 1,
                  "&:hover": {
                    backgroundColor: alpha("#3f51b5", 0.15),
                    transform: "translateY(-2px)",
                    boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.15)",
                  },
                }}
              >
                <AccountCircleIcon
                  sx={{
                    color: isActive("/profile") ? "#3f51b5" : "#757575",
                    marginRight: 2,
                    transition: "color 0.3s ease, transform 0.3s ease",
                  }}
                />
                <ListItemText
                  primary="Profile"
                  primaryTypographyProps={{
                    fontWeight: isActive("/profile") ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={logout}
                sx={{
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  background: "linear-gradient(to right, #ff4b2b, #ff416c)",
                  color: "white",
                  mt: 1,
                  "&:hover": {
                    background: "linear-gradient(to right, #ff5e3a, #ff527b)",
                    transform: "translateY(-2px)",
                    boxShadow: "0px 4px 15px rgba(255, 75, 43, 0.3)",
                  },
                }}
              >
                <LogoutIcon
                  sx={{
                    color: "white",
                    marginRight: 2,
                    transition: "transform 0.3s ease",
                  }}
                />
                <ListItemText
                  primary="Logout"
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        background: scrolled
          ? "rgba(255, 255, 255, 0.9)"
          : "linear-gradient(135deg, #3f51b5 0%, #5360c9 100%)",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        boxShadow: scrolled
          ? "0 4px 20px rgba(0, 0, 0, 0.08)"
          : "0 4px 20px rgba(63, 81, 181, 0.3)",
        transition: "all 0.3s ease",
      }}
    >
      <Toolbar>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 1,
          }}
        >
          {/* Brand Logo */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: scrolled ? "#3f51b5" : "#fff",
              transition: "color 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                transition: "transform 0.3s ease",
              },
            }}
          >
            {/* Logo Image */}
            <img
              src="/favicon.svg"
              alt="LenZ Logo"
              height="40"
              style={{ marginRight: "8px" }}
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                letterSpacing: "0.05em",
              }}
            >
              LenZ
            </Typography>
          </Box>

          {/* Hamburger Menu for Mobile */}
          {isMobile || isTablet ? (
            <>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {user && (
                  <Tooltip title={user.name}>
                    <Avatar
                      component={Link}
                      to="/profile"
                      sx={{
                        width: 36,
                        height: 36,
                        bgcolor: alpha("#fff", 0.2),
                        color: scrolled ? "#3f51b5" : "#fff",
                        marginRight: 2,
                        border: scrolled
                          ? "2px solid #3f51b5"
                          : "2px solid rgba(255,255,255,0.2)",
                        transition: "all 0.3s ease",
                        textDecoration: "none",
                      }}
                    >
                      {getUserInitials()}
                    </Avatar>
                  </Tooltip>
                )}
                <IconButton
                  aria-label="menu"
                  onClick={toggleDrawer(true)}
                  sx={{
                    color: scrolled ? "#3f51b5" : "#fff",
                    transition: "transform 0.3s ease, color 0.3s ease",
                    "&:hover": {
                      transform: "rotate(90deg)",
                      color: scrolled ? "#6a11cb" : "#acceff",
                    },
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
              <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                PaperProps={{
                  sx: {
                    borderTopRightRadius: "24px",
                    borderBottomRightRadius: "24px",
                  },
                }}
              >
                {drawerContent}
              </Drawer>
            </>
          ) : (
            /* Navigation Links for Desktop */
            <Box
              sx={{
                display: "flex",
                gap: 0.5,
                alignItems: "center",
                "& > *": {
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                },
              }}
            >
              {!user ? (
                <>
                  <Button
                    component={Link}
                    to="/"
                    sx={{
                      color: scrolled ? "#3f51b5" : "#fff",
                      px: 2,
                      py: 1,
                      position: "relative",
                      fontWeight: isActive("/") ? 600 : 400,
                      "&:after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: "50%",
                        width: isActive("/") ? "80%" : "0%",
                        height: "3px",
                        backgroundColor: scrolled ? "#3f51b5" : "#fff",
                        transition: "all 0.3s ease",
                        transform: "translateX(-50%)",
                        borderRadius: "3px",
                      },
                      "&:hover": {
                        backgroundColor: scrolled
                          ? alpha("#3f51b5", 0.1)
                          : alpha("#fff", 0.1),
                        "&:after": {
                          width: "80%",
                        },
                      },
                    }}
                  >
                    Home
                  </Button>
                  <Button
                    component={Link}
                    to="/login"
                    sx={{
                      color: scrolled ? "#3f51b5" : "#fff",
                      px: 2,
                      py: 1,
                      position: "relative",
                      fontWeight: isActive("/login") ? 600 : 400,
                      "&:after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: "50%",
                        width: isActive("/login") ? "80%" : "0%",
                        height: "3px",
                        backgroundColor: scrolled ? "#3f51b5" : "#fff",
                        transition: "all 0.3s ease",
                        transform: "translateX(-50%)",
                        borderRadius: "3px",
                      },
                      "&:hover": {
                        backgroundColor: scrolled
                          ? alpha("#3f51b5", 0.1)
                          : alpha("#fff", 0.1),
                        "&:after": {
                          width: "80%",
                        },
                      },
                    }}
                  >
                    <LoginIcon sx={{ mr: 0.5, fontSize: 20 }} />
                    Login
                  </Button>
                  <Button
                    component={Link}
                    to="/signup"
                    variant="contained"
                    disableElevation
                    sx={{
                      ml: 1,
                      px: 3,
                      py: 1,
                      background: scrolled
                        ? specialGradient
                        : "rgba(255, 255, 255, 0.2)",
                      color: scrolled ? "white" : "#fff",
                      fontWeight: 600,
                      "&:hover": {
                        background: scrolled
                          ? specialGradientHover
                          : "rgba(255, 255, 255, 0.3)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <SignupIcon sx={{ mr: 0.5, fontSize: 20 }} />
                    Sign Up
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    component={Link}
                    to="/"
                    sx={{
                      color: scrolled ? "#3f51b5" : "#fff",
                      px: 2,
                      position: "relative",
                      fontWeight:
                        isActive("/") && location.pathname === "/" ? 600 : 400,
                      "&:after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: "50%",
                        width:
                          isActive("/") && location.pathname === "/"
                            ? "80%"
                            : "0%",
                        height: "3px",
                        backgroundColor: scrolled ? "#3f51b5" : "#fff",
                        transition: "all 0.3s ease",
                        transform: "translateX(-50%)",
                        borderRadius: "3px",
                      },
                      "&:hover": {
                        backgroundColor: scrolled
                          ? alpha("#3f51b5", 0.1)
                          : alpha("#fff", 0.1),
                        "&:after": {
                          width: "80%",
                        },
                      },
                    }}
                  >
                    Home
                  </Button>
                  <Button
                    component={Link}
                    to="/dashboard"
                    sx={{
                      color: scrolled ? "#3f51b5" : "#fff",
                      px: 2,
                      position: "relative",
                      fontWeight: isActive("/dashboard") ? 600 : 400,
                      "&:after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: "50%",
                        width: isActive("/dashboard") ? "80%" : "0%",
                        height: "3px",
                        backgroundColor: scrolled ? "#3f51b5" : "#fff",
                        transition: "all 0.3s ease",
                        transform: "translateX(-50%)",
                        borderRadius: "3px",
                      },
                      "&:hover": {
                        backgroundColor: scrolled
                          ? alpha("#3f51b5", 0.1)
                          : alpha("#fff", 0.1),
                        "&:after": {
                          width: "80%",
                        },
                      },
                    }}
                  >
                    <DashboardIcon sx={{ mr: 0.5, fontSize: 20 }} />
                    Dashboard
                  </Button>

                  <Button
                    onClick={handleOrdersMenuOpen}
                    endIcon={<ArrowDropDownIcon />}
                    sx={{
                      color: scrolled ? "#3f51b5" : "#fff",
                      px: 2,
                      position: "relative",
                      fontWeight:
                        isActive("/orders") ||
                        isActive("/pickup-orders") ||
                        isActive("/group-orders")
                          ? 600
                          : 400,
                      "&:after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: "50%",
                        width:
                          isActive("/orders") ||
                          isActive("/pickup-orders") ||
                          isActive("/group-orders")
                            ? "80%"
                            : "0%",
                        height: "3px",
                        backgroundColor: scrolled ? "#3f51b5" : "#fff",
                        transition: "all 0.3s ease",
                        transform: "translateX(-50%)",
                        borderRadius: "3px",
                      },
                      "&:hover": {
                        backgroundColor: scrolled
                          ? alpha("#3f51b5", 0.1)
                          : alpha("#fff", 0.1),
                        "&:after": {
                          width: "80%",
                        },
                      },
                    }}
                  >
                    Orders
                  </Button>

                  <Menu
                    anchorEl={ordersMenuAnchor}
                    open={Boolean(ordersMenuAnchor)}
                    onClose={handleOrdersMenuClose}
                    MenuListProps={{
                      onMouseLeave: handleOrdersMenuClose,
                      sx: { py: 1 },
                    }}
                    PaperProps={{
                      elevation: 3,
                      sx: {
                        mt: 1.5,
                        borderRadius: "16px",
                        minWidth: "200px",
                        overflow: "visible",
                        filter: "drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.15))",
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 20,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    TransitionComponent={Fade}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem
                      component={Link}
                      to="/orders"
                      onClick={handleOrdersMenuClose}
                      sx={{
                        borderRadius: "8px",
                        margin: "4px 8px",
                        padding: "10px 16px",
                        transition: "all 0.3s ease",
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: isActive("/orders")
                          ? alpha("#3f51b5", 0.1)
                          : "transparent",
                        color: isActive("/orders") ? "#3f51b5" : "text.primary",
                        "&:hover": {
                          backgroundColor: alpha("#3f51b5", 0.1),
                          transform: "translateX(5px)",
                        },
                      }}
                    >
                      <ViewOrderIcon
                        sx={{
                          mr: 1.5,
                          color: isActive("/orders") ? "#3f51b5" : "#757575",
                        }}
                      />
                      View Orders
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/pickup-orders"
                      onClick={handleOrdersMenuClose}
                      sx={{
                        borderRadius: "8px",
                        margin: "4px 8px",
                        padding: "10px 16px",
                        transition: "all 0.3s ease",
                        display: "flex",
                        alignItems: "center",
                        background: isActive("/pickup-orders")
                          ? specialGradient
                          : "transparent",
                        color: isActive("/pickup-orders")
                          ? "white"
                          : "text.primary",
                        "&:hover": {
                          background: specialGradient,
                          color: "white",
                          transform: "translateX(5px)",
                        },
                      }}
                    >
                      <BookPickupIcon
                        sx={{
                          mr: 1.5,
                          color: isActive("/pickup-orders")
                            ? "white"
                            : "#757575",
                        }}
                      />
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        Book For Pickup
                        {/* <Badge
                          color="error"
                          variant="dot"
                          invisible={false}
                          sx={{ ml: 1 }}
                        /> */}
                      </Box>
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/group-orders"
                      onClick={handleOrdersMenuClose}
                      sx={{
                        borderRadius: "8px",
                        margin: "4px 8px",
                        padding: "10px 16px",
                        transition: "all 0.3s ease",
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: isActive("/group-orders")
                          ? alpha("#3f51b5", 0.1)
                          : "transparent",
                        color: isActive("/group-orders")
                          ? "#3f51b5"
                          : "text.primary",
                        "&:hover": {
                          backgroundColor: alpha("#3f51b5", 0.1),
                          transform: "translateX(5px)",
                        },
                      }}
                    >
                      <GroupOrderIcon
                        sx={{
                          mr: 1.5,
                          color: isActive("/group-orders")
                            ? "#3f51b5"
                            : "#757575",
                        }}
                      />
                      View Group Orders
                    </MenuItem>
                  </Menu>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      ml: 1,
                    }}
                  >
                    <Button
                      component={Link}
                      to="/profile"
                      startIcon={
                        <Avatar
                          sx={{
                            width: 36,
                            height: 36,
                            bgcolor: scrolled
                              ? "#3f51b5"
                              : "rgba(255, 255, 255, 0.2)",
                            color: scrolled ? "white" : "#fff",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "0.875rem",
                              fontWeight: "bold",
                            }}
                          >
                          {getUserInitials()}
                          </Typography>
                        </Avatar>
                      }
                      sx={{
                        color: scrolled ? "#3f51b5" : "#fff",
                        px: 2,
                        py: 0.5,
                        borderRadius: "20px",
                        border: `1px solid ${
                          scrolled
                            ? alpha("#3f51b5", 0.3)
                            : "rgba(255, 255, 255, 0.2)"
                        }`,
                        "&:hover": {
                          backgroundColor: scrolled
                            ? alpha("#3f51b5", 0.1)
                            : alpha("#fff", 0.1),
                          borderColor: scrolled
                            ? "#3f51b5"
                            : "rgba(255, 255, 255, 0.5)",
                        },
                      }}
                    >
                      {user.name.split(" ")[0]}
                    </Button>
                    <Tooltip title="Logout">
                      <IconButton
                        onClick={logout}
                        aria-label="logout"
                        sx={{
                          color: scrolled ? "#f44336" : "#fff",
                          backgroundColor: scrolled
                            ? alpha("#f44336", 0.1)
                            : "rgba(255, 255, 255, 0.1)",
                          "&:hover": {
                            backgroundColor: scrolled
                              ? alpha("#f44336", 0.2)
                              : "rgba(255, 255, 255, 0.2)",
                            transform: "rotate(15deg)",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        <LogoutIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
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

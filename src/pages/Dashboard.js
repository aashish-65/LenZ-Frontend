import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Divider,
  // IconButton,
  // Tooltip,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// import SettingsIcon from "@mui/icons-material/Settings";
// import EmailIcon from "@mui/icons-material/Email";
// import PhoneIcon from "@mui/icons-material/Phone";
import { motion } from "framer-motion";
// import apiCall from "../utils/api";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  // const [orders, setOrders] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     if (user?._id) {
  //       setLoading(true);
  //       try {
  //         const data = await apiCall(`/orders/get-order/${user._id}`);
  //         setOrders(data.data);
  //       } catch (error) {
  //         console.error(error.message);
  //         setError("Failed to load your orders.");
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //   };

  //   fetchOrders();
  // }, [user?._id]);

  const handleCreateOrder = () => {
    navigate("/create-order");
  };

  const handleGoToOrders = () => {
    navigate("/orders");
  };

  const handleBookForPickup = () => {
    navigate("/pickup-orders");
  };

  // Animation variants for Framer Motion
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 4,
        minHeight: "100vh",
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
        color: "#fff",
      }}
    >
      {/* Welcome message */}
      <Typography
        variant="h3"
        component={motion.div}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        sx={{
          fontWeight: "bold",
          marginBottom: 4,
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
        }}
      >
        Welcome, {user?.name || "User"}!
      </Typography>

      {/* Dashboard content */}
      <Grid container spacing={4} maxWidth="lg">
        {/* Profile Section */}
        <Grid item xs={12} md={6}>
          <Card
            component={motion.div}
            variants={cardVariants}
            sx={{
              background: "#fff",
              borderRadius: 3,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 6px 15px rgba(173, 216, 230, 0.8)",
              },
            }}
            onClick={() => navigate("/profile")}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Your Profile
              </Typography>
              <Divider sx={{ marginY: 2 }} />
              <Typography variant="body1" gutterBottom>
                <strong>Name:</strong> {user?.name || "John Doe"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> {user?.email || "johndoe@example.com"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Subscription Plan:</strong> {user?.plan || "Base Plan"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Orders Button Section */}
        <Grid item xs={12} md={6}>
          <Card
            component={motion.div}
            variants={cardVariants}
            sx={{
              background: "#fff",
              borderRadius: 3,
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
              height: "100%",
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Your Orders
              </Typography>
              <Divider sx={{ marginY: 2 }} />
              <Box
                textAlign="center"
                display="flex"
                justifyContent="center"
                gap={1}
              >
                <Button
                  variant="outlined"
                  onClick={handleGoToOrders}
                  sx={{
                    padding: 2,
                    fontSize: "16px",
                    borderRadius: "8px",
                    borderColor: "#6a11cb",
                    color: "#6a11cb",
                  }}
                >
                  View Orders
                </Button>

                <Button
                  variant="outlined"
                  onClick={handleBookForPickup}
                  sx={{
                    padding: 2,
                    fontSize: "16px",
                    borderRadius: "8px",
                    borderColor: "#6a11cb",
                    color: "#fff",
                    background:
                      "linear-gradient(to right,rgb(44, 57, 79),rgb(134, 20, 255))",
                  }}
                >
                  Book For Pickup
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card
            component={motion.div}
            variants={cardVariants}
            sx={{
              background: "linear-gradient(to right, #2575fc, #6a11cb)",
              color: "#fff",
              borderRadius: 3,
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Create New Order
              </Typography>
              <Divider sx={{ marginY: 2 }} />
              <Box textAlign="center">
                <Button
                  variant="contained"
                  startIcon={<AddShoppingCartIcon />}
                  onClick={handleCreateOrder}
                  sx={{
                    padding: 2,
                    fontSize: "16px",
                    borderRadius: "8px",
                    backgroundColor: "#00c853",
                    "&:hover": {
                      backgroundColor: "#00a844",
                    },
                  }}
                >
                  Create Order
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* <Grid item xs={12} md={6}>
          <Card
            component={motion.div}
            variants={cardVariants}
            sx={{
              background: "#fff",
              borderRadius: 3,
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Account Settings
              </Typography>
              <Divider sx={{ marginY: 2 }} />
              <Box textAlign="center">
                <Button
                  variant="outlined"
                  startIcon={<SettingsIcon />}
                  sx={{
                    margin: 1,
                    padding: 1,
                    color: "#6a11cb",
                    borderColor: "#6a11cb",
                  }}
                >
                  Change Password
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<SettingsIcon />}
                  sx={{
                    margin: 1,
                    padding: 1,
                    color: "#6a11cb",
                    borderColor: "#6a11cb",
                  }}
                >
                  Update Profile
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              background: "#fff",
              borderRadius: 3,
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
              height: "100%",
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Support
              </Typography>
              <Divider sx={{ marginY: 2 }} />
              <Typography>
                <Tooltip title="Email us">
                  <IconButton
                    href="mailto:support@lenz.com"
                    color="primary"
                    size="large"
                  >
                    <EmailIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Call us">
                  <IconButton
                    href="tel:+918967310388"
                    color="primary"
                    size="large"
                  >
                    <PhoneIcon />
                  </IconButton>
                </Tooltip>
              </Typography>
            </CardContent>
          </Card>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default Dashboard;

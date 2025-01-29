import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import {
  Box,
  Typography,
  Card,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Pagination,
  Button,
  Container,
  Grid,
  useMediaQuery,
  Skeleton,
  IconButton,
  Tooltip,
} from "@mui/material";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FileDownload as FileDownloadIcon, PictureAsPdf as PdfIcon } from "@mui/icons-material";

const GroupOrderList = () => {
  const [groupOrders, setGroupOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState(""); // Filtering state
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "asc" }); // Sorting state
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5; // Pagination limit

  const navigate = useNavigate();
  const { authToken } = useAuth();
  const isMobile = useMediaQuery("(max-width:600px)"); // Check for mobile view

  useEffect(() => {
    const fetchGroupOrders = async () => {
      try {
        const response = await axios.get(
          "https://lenz-backend.onrender.com/api/orders/get-group-orders",
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        setGroupOrders(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGroupOrders();
  }, [authToken]);

  // 🏷️ **Filtering Logic**
  const filteredOrders = statusFilter
    ? groupOrders.filter((order) => order.tracking_status === statusFilter)
    : groupOrders;

  // 📌 **Sorting Logic**
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortConfig.key === "date") {
      return sortConfig.direction === "asc"
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortConfig.key === "amount") {
      return sortConfig.direction === "asc"
        ? a.finalAmount - b.finalAmount
        : b.finalAmount - a.finalAmount;
    }
    return 0;
  });

  // 📄 **Pagination Logic**
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // 📊 **Export as CSV**
  const exportToCSV = () => {
    const csv = Papa.unparse(
      groupOrders.map(({ _id, tracking_status, finalAmount, createdAt }) => ({
        ID: _id,
        Status: tracking_status,
        "Total Amount (₹)": finalAmount,
        Date: new Date(createdAt).toLocaleDateString(),
      }))
    );
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "group_orders.csv");
  };

  // 📜 **Export as PDF**
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Group Orders", 14, 15);
    doc.autoTable({
      head: [["ID", "Status", "Total Amount (₹)", "Date"]],
      body: groupOrders.map(({ _id, tracking_status, finalAmount, createdAt }) => [
        _id,
        tracking_status,
        `₹${finalAmount}`,
        new Date(createdAt).toLocaleDateString(),
      ]),
    });
    doc.save("group_orders.pdf");
  };

  // 🎨 **Color for Tracking Status**
  const getStatusColor = (status) => {
    switch (status) {
      case "Order Placed For Pickup":
        return "warning.main"; // Yellow
      case "Pickup Accepted":
        return "info.main"; // Blue
      case "Order Picked Up":
        return "success.main"; // Green
      case "Order Received By Admin":
        return "secondary.main"; // Purple
      case "Work Completed":
        return "primary.main"; // Primary color
      case "Out For Delivery":
        return "info.light"; // Light blue
      case "Order Completed":
        return "success.dark"; // Dark green
      default:
        return "text.primary"; // Default color
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Skeleton variant="rectangular" width="100%" height={400} />
      </Container>
    );
  }

  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "powderblue" }}>
        Your Group Orders
      </Typography>

      {/* 🔎 **Filtering and Export Section** */}
      <Card sx={{ mb: 3, p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel shrink={true} sx={{ fontWeight: "bold" }}>Status Filter</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                displayEmpty
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Order Placed For Pickup">Order Placed For Pickup</MenuItem>
                <MenuItem value="Pickup Accepted">Pickup Accepted</MenuItem>
                <MenuItem value="Order Picked Up">Order Picked Up</MenuItem>
                <MenuItem value="Order Received By Admin">Order Received By Admin</MenuItem>
                <MenuItem value="Work Completed">Work Completed</MenuItem>
                <MenuItem value="Out For Delivery">Out For Delivery</MenuItem>
                <MenuItem value="Order Completed">Order Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={8} sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
            <Tooltip title="Export CSV">
              <IconButton color="primary" onClick={exportToCSV}>
                <FileDownloadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Export PDF">
              <IconButton color="secondary" onClick={exportToPDF}>
                <PdfIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Card>

      {/* 📜 **Group Orders Table** */}
      {isMobile ? (
        // Mobile View: Card Layout
        <Box>
          {currentOrders.map((order) => (
            <Card key={order._id} onClick={() => navigate(`/group-orders/${order._id}`)}  sx={{ mb: 2, p: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Order ID: {order._id}
              </Typography>
              <Typography sx={{ color: getStatusColor(order.tracking_status) }}>
                Status: {order.tracking_status}
              </Typography>
              <Typography>Total Amount: ₹{order.finalAmount}</Typography>
              <Typography>Date: {new Date(order.createdAt).toLocaleDateString()}</Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => navigate(`/group-orders/${order._id}`)}
                sx={{ mt: 1 }}
              >
                View Details
              </Button>
            </Card>
          ))}
        </Box>
      ) : (
        // Desktop View: Table Layout
        <Card>
          <TableContainer component={Paper} sx={{ maxHeight: "60vh", overflow: "auto" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", backgroundColor: "primary.main", color: "white" }}>
                    ID
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", backgroundColor: "primary.main", color: "white" }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", backgroundColor: "primary.main", color: "white" }}>
                  <TableSortLabel
                    active={sortConfig.key === "amount"}
                    direction={sortConfig.direction}
                    onClick={() =>
                      setSortConfig({
                        key: "amount",
                        direction: sortConfig.direction === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Total Amount (₹)
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", backgroundColor: "primary.main", color: "white" }}>
                  <TableSortLabel
                    active={sortConfig.key === "date"}
                    direction={sortConfig.direction}
                    onClick={() =>
                      setSortConfig({
                        key: "date",
                        direction: sortConfig.direction === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Date
                  </TableSortLabel>
                </TableCell>
                  <TableCell sx={{ fontWeight: "bold", backgroundColor: "primary.main", color: "white" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentOrders.map((order) => (
                  <TableRow
                    key={order._id}
                    hover
                    sx={{ cursor: "pointer", "&:hover": { backgroundColor: "action.hover" } }}
                    onClick={() => navigate(`/group-orders/${order._id}`)}
                  >
                    <TableCell>{order._id}</TableCell>
                    <TableCell sx={{ color: getStatusColor(order.tracking_status) }}>
                      {order.tracking_status}
                    </TableCell>
                    <TableCell>₹{order.finalAmount}</TableCell>
                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => navigate(`/group-orders/${order._id}`)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {/* 📄 **Pagination** */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={Math.ceil(sortedOrders.length / ordersPerPage)}
          page={currentPage}
          onChange={(e, value) => setCurrentPage(value)}
          color="primary"
        />
      </Box>

      {/* 🚨 **No Orders Found** */}
      {currentOrders.length === 0 && (
        <Typography variant="h6" sx={{ textAlign: "center", mt: 4, color: "text.secondary" }}>
          No orders found.
        </Typography>
      )}
    </Container>
  );
};

export default GroupOrderList;
// import React, { useState, useEffect, useCallback, useRef } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   Box,
//   Typography,
//   Button,
//   Grid,
//   InputAdornment,
//   Card,
//   CardContent,
//   Divider,
//   Avatar,
//   Tabs,
//   Tab,
//   TextField,
//   CircularProgress,
//   Alert,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   IconButton,
//   Paper,
//   Skeleton,
//   Container,
//   useTheme,
//   useMediaQuery,
//   Chip,
//   Stack,
// } from "@mui/material";
// import {
//   Edit,
//   Lock,
//   Person,
//   AccountCircle,
//   Email,
//   Phone,
//   Business,
//   Home,
//   LocationCity,
//   LocationOn,
//   Visibility,
//   VisibilityOff,
//   CardMembership,
//   AccountBalanceWallet,
//   PinDrop,
//   VpnKey,
//   Badge,
//   VerifiedUser,
//   ArrowForward,
//   Refresh,
//   Payments,
//   LocalShipping,
//   Map,
//   LocationOn,
// } from "@mui/icons-material";

// const ProfilePage = () => {
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//     const isMedium = useMediaQuery(theme.breakpoints.down("md"));
  
//     const [profileData, setProfileData] = useState({
//       name: "",
//       email: "",
//       phone: "+91",
//       userId: "",
//       alternatePhone: "+91",
//       shopName: "",
//       address: {
//         line1: "",
//         line2: "",
//         landmark: "",
//         city: "",
//         state: "",
//         pinCode: "",
//       },
//       plan: "",
//       distance: 0,
//       creditBalance: 0,
//     });
    
//     // State variables for form handling
//     const [tab, setTab] = useState(0);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");
//     const [errors, setErrors] = useState({});
    
//     // Password change states
//     const [oldPassword, setOldPassword] = useState("");
//     const [newPassword, setNewPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [showOldPassword, setShowOldPassword] = useState(false);
//     const [showNewPassword, setShowNewPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
//     // OTP verification states
//     const [otp, setOtp] = useState("");
//     const [otpVerified, setOtpVerified] = useState(false);
//     const [showOtpModal, setShowOtpModal] = useState(false);
//     const [otpTimer, setOtpTimer] = useState(300);
//     const [canResendOtp, setCanResendOtp] = useState(true);
//     const [resending, setResending] = useState(false);
//     const [pendingUpdate, setPendingUpdate] = useState(false);
    
//     // Refs
//     const timerInterval = useRef(null);

//   const formattedAlternatePhone =
//     profileData.alternatePhone?.replace(/\s+/g, "") === "+91"
//       ? "N/A"
//       : profileData.alternatePhone;

//   // Fetch Profile Data
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("authToken");
//         const { data } = await axios.get(
//           "https://lenz-backend.onrender.com/api/profile/",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setProfileData(data);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch profile data");
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, []);

//   // Validate Input Fields
//   const validate = useCallback(
//     (name, value) => {
//       let sanitizedValue = "";
//       let error = "";
//       switch (name) {
//         case "name":
//           if (!value.trim()) error = "Name is required.";
//           break;
//         case "email":
//           if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
//             error = "Enter a valid email.";
//           break;
//         case "phone":
//           sanitizedValue = value.replace(/\s+/g, "");
//           if (!/^\+91\d{10}$/.test(sanitizedValue))
//             error = "Enter a valid 10-digit phone number after +91.";
//           break;
//         case "alternatePhone":
//           sanitizedValue = value.replace(/\s+/g, "");
//           const phoneWithoutPrefix = sanitizedValue.replace(/^\+91/, "");
//           if (phoneWithoutPrefix && phoneWithoutPrefix.length !== 10)
//             error = "Enter a valid 10-digit phone number with +91.";
//           if (name === "alternatePhone" && value === profileData.phone)
//             error =
//               "Alternate phone number cannot be the same as phone number.";
//           break;
//         case "password":
//           if (value.length < 8 || value.length > 13)
//             error += "Password must be 8-13 characters long. ";
//           if (!/[A-Z]/.test(value))
//             error += " Password must contain at least one uppercase letter.";
//           if (!/[0-9]/.test(value))
//             error += "Password must contain at least one number. ";
//           if (!/[!@#$%^&*]/.test(value))
//             error += "Password must contain at least one special character.";
//           break;
//         case "address.pinCode":
//           if (!/^\d{6}$/.test(value)) error = "Pin code must be 6 digits.";
//           break;
//         default:
//           break;
//       }
//       return error;
//     },
//     [profileData.phone]
//   );

//   // Handle Tab Change
//   const handleTabChange = (event, newValue) => {
//     setTab(newValue);
//     setError("");
//     setSuccess("");
//   };

//   // Handle Input Change
//   const handleChange = useCallback(
//     (e) => {
//       const { name, value } = e.target;

//       // Validate field
//       const fieldError = validate(name, value);
//       setErrors((prevErrors) => ({ ...prevErrors, [name]: fieldError }));

//       if (name.startsWith("address.")) {
//         const addressKey = name.split(".")[1];
//         setProfileData((prevState) => ({
//           ...prevState,
//           address: { ...prevState.address, [addressKey]: value },
//         }));
//       } else {
//         setProfileData((prevState) => ({
//           ...prevState,
//           [name]: value,
//         }));
//       }
//     },
//     [validate]
//   );

//   // Request OTP
//   const requestOTP = useCallback(async () => {
//     try {
//       const emailError = validate("email", profileData.email);
//       if (emailError) {
//         setError(emailError);
//         return;
//       }

//       await axios.post(
//         "https://lenz-backend.onrender.com/api/otp/request-otp",
//         { email: profileData.email },
//         {
//           headers: {
//             "lenz-api-key": process.env.REACT_APP_AUTHORIZED_API_KEY,
//           },
//         }
//       );
//       setShowOtpModal(true);
//       setError("");
//       setOtpTimer(300); // Reset timer to 5 minutes
//       setCanResendOtp(false); // Disable resend button temporarily
//       setTimeout(() => setCanResendOtp(true), 30000); // Enable resend after 30 seconds
//     } catch (err) {
//       setError("Failed to send OTP. Please try again.");
//     }
//   }, [profileData.email, validate]);

//   // Verify OTP
//   const verifyOTP = async () => {
//     try {
//       // Validate OTP before verification
//       if (!otp || otp.length !== 6) {
//         setError("Please enter a valid 6-digit OTP.");
//         return;
//       }
//       await axios.post(
//         "https://lenz-backend.onrender.com/api/otp/verify-otp",
//         { email: profileData.email, otp },
//         {
//           headers: {
//             "lenz-api-key": process.env.REACT_APP_AUTHORIZED_API_KEY,
//           },
//         }
//       );
//       setOtpVerified(true);
//       setShowOtpModal(false);
//       setError("");
//       clearInterval(timerInterval.current);
//     } catch (err) {
//       setError("Invalid OTP. Please try again.");
//     }
//   };

//   // Handle Update Profile
//   const handleUpdate = useCallback(
//     async (e) => {
//       if (e && e.preventDefault) e.preventDefault();

//       // Validate fields
//       const newErrors = {};
//       for (const [key, value] of Object.entries(profileData)) {
//         if (key === "address") {
//           for (const [subKey, subValue] of Object.entries(
//             profileData.address
//           )) {
//             const fieldName = `address.${subKey}`;
//             newErrors[fieldName] = validate(fieldName, subValue);
//           }
//         } else {
//           newErrors[key] = validate(key, value);
//         }
//       }
//       setErrors(newErrors);

//       // Check if any errors exist
//       if (Object.values(newErrors).some((error) => error)) {
//         setError("Please fix the errors before submitting.");
//         return;
//       }

//       // Request OTP if not verified
//       if (!otpVerified) {
//         setPendingUpdate(true);
//         await requestOTP();
//         return;
//       }

//       // Proceed with profile update
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("authToken");
//         const { data } = await axios.put(
//           "https://lenz-backend.onrender.com/api/profile/",
//           profileData,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setProfileData(data);
//         toast.success("Profile updated successfully!");
//         setError("");
//         setLoading(false);
//         setTab(0);
//         setOtpVerified(false); // Reset OTP verification
//         setPendingUpdate(false);
//       } catch (err) {
//         setError("Failed to update profile");
//         setSuccess("");
//         setLoading(false);
//       }
//     },
//     [profileData, otpVerified, requestOTP, validate]
//   );

//   // Timer for OTP Expiry
//   useEffect(() => {
//     if (showOtpModal && otpTimer > 0) {
//       timerInterval.current = setInterval(() => {
//         setOtpTimer((prev) => prev - 1);
//       }, 1000);
//     }
//     return () => clearInterval(timerInterval.current);
//   }, [showOtpModal, otpTimer]);

//   // Handle Change Password
//   const handleChangePassword = useCallback(
//     async (e) => {
//       if (e && e.preventDefault) e.preventDefault();

//       // Validate inputs
//       if (!oldPassword || !newPassword || !confirmPassword) {
//         setError("All fields are required.");
//         return;
//       }

//       // Validate new password
//       const passwordError = validate("password", newPassword);
//       if (passwordError) {
//         setError(passwordError);
//         return;
//       }

//       if (newPassword !== confirmPassword) {
//         setError("New password and confirm password do not match.");
//         return;
//       }

//       // If OTP is not verified, request OTP and set pending update
//       if (!otpVerified) {
//         setPendingUpdate(true); // Mark update as pending
//         await requestOTP();
//         return;
//       }

//       // Proceed with password change
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("authToken");
//         const { data } = await axios.post(
//           "https://lenz-backend.onrender.com/api/profile/change-password",
//           { oldPassword, newPassword },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setSuccess(data.message || "Password updated successfully!");
//         setError("");
//         setLoading(false);
//         setOtpVerified(false); // Reset OTP verification
//         setPendingUpdate(false); // Reset pending update
//       } catch (err) {
//         setError(err.response?.data?.error || "Failed to update password.");
//         setSuccess("");
//         setLoading(false);
//       }
//     },
//     [
//       oldPassword,
//       newPassword,
//       confirmPassword,
//       otpVerified,
//       requestOTP,
//       validate,
//     ]
//   );

//   // Handle Resend OTP with Loading Effect
//   const handleResendOTP = async () => {
//     setResending(true);
//     await requestOTP();
//     setResending(false);
//   };

//   // Format OTP Timer (MM:SS)
//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const sec = seconds % 60;
//     return `${minutes}:${sec < 10 ? "0" : ""}${sec}`;
//   };

//   // Re-trigger update after OTP verification
//   useEffect(() => {
//     if (otpVerified && pendingUpdate) {
//       if (tab === 1) handleUpdate(); // Re-trigger profile update
//       if (tab === 2) handleChangePassword(); // Re-trigger password change
//     }
//   }, [otpVerified, pendingUpdate, handleUpdate, handleChangePassword, tab]);

//   // Toggle password visibility
//   const handleClickShowPassword = (field) => {
//     switch (field) {
//       case "oldPassword":
//         setShowOldPassword((prev) => !prev);
//         break;
//       case "newPassword":
//         setShowNewPassword((prev) => !prev);
//         break;
//       case "confirmPassword":
//         setShowConfirmPassword((prev) => !prev);
//         break;
//       default:
//         break;
//     }
//   };

//   // Skeleton Loader for Profile Details
//   const renderSkeleton = () => {
//     return (
//       <Container maxWidth="xl" sx={{ py: 4 }}>
//         <Paper 
//           elevation={8} 
//           sx={{ 
//             p: { xs: 2, md: 5 }, 
//             borderRadius: 4, 
//             bgcolor: "#fff",
//             height: "100%",
//             minHeight: "85vh"
//           }}
//         >
//           <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
//             <Skeleton variant="circular" width={150} height={150} />
//           </Box>
          
//           <Grid container spacing={4}>
//             <Grid item xs={12}>
//               <Skeleton variant="rectangular" width="100%" height={60} />
//             </Grid>
            
//             <Grid item xs={12} sm={6}>
//               <Skeleton variant="rectangular" width="100%" height={80} />
//             </Grid>
            
//             <Grid item xs={12} sm={6}>
//               <Skeleton variant="rectangular" width="100%" height={80} />
//             </Grid>
            
//             <Grid item xs={12}>
//               <Skeleton variant="rectangular" width="100%" height={100} />
//             </Grid>
            
//             <Grid item xs={12} md={4}>
//               <Skeleton variant="rectangular" width="100%" height={120} sx={{ borderRadius: 4 }} />
//             </Grid>
            
//             <Grid item xs={12} md={4}>
//               <Skeleton variant="rectangular" width="100%" height={120} sx={{ borderRadius: 4 }} />
//             </Grid>
            
//             <Grid item xs={12} md={4}>
//               <Skeleton variant="rectangular" width="100%" height={120} sx={{ borderRadius: 4 }} />
//             </Grid>
//           </Grid>
//         </Paper>
//       </Container>
//     );
//   };

//   // Reusable Detail Item Component with enhanced styling
//   const DetailItem = ({ icon, label, value, color = "primary.main" }) => (
//     <Box
//       display="flex"
//       alignItems="center"
//       gap={2}
//       sx={{
//         bgcolor: "#f9f9f9",
//         p: 3,
//         borderRadius: 3,
//         boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//         border: "1px solid rgba(0,0,0,0.03)",
//         height: "100%",
//         transition: "transform 0.2s, box-shadow 0.2s",
//         "&:hover": {
//           transform: "translateY(-5px)",
//           boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
//         },
//       }}
//     >
//       <Box
//         sx={{
//           p: 1.5,
//           borderRadius: "50%",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           bgcolor: `${color}15`,
//           color: color,
//         }}
//       >
//         {icon}
//       </Box>
//       <Box width="100%">
//         <Typography variant="body2" fontWeight="medium" color="text.secondary" gutterBottom>
//           {label}
//         </Typography>
//         <Typography variant="body1" fontWeight="bold" color="text.primary" sx={{ wordBreak: "break-word" }}>
//           {value}
//         </Typography>
//       </Box>
//     </Box>
//   );

//   // Reusable Box for Statistics Cards (Distance, Plan, Credit Balance)
//   const StatCard = ({ icon, label, value, primaryColor = "#1976D2", secondaryColor = "#64B5F6" }) => (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         p: 3,
//         borderRadius: 4,
//         height: "100%",
//         textAlign: "center",
//         background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
//         color: "white",
//         boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
//         transition: "transform 0.3s ease",
//         "&:hover": {
//           transform: "translateY(-8px)",
//         },
//       }}
//     >
//       <Box
//         sx={{
//           p: 2,
//           borderRadius: "50%",
//           bgcolor: "rgba(255, 255, 255, 0.2)",
//           mb: 2,
//         }}
//       >
//         {icon}
//       </Box>
//       <Typography variant="h6" fontWeight="bold" mb={1}>
//         {value}
//       </Typography>
//       <Typography variant="body2" sx={{ opacity: 0.9 }}>
//         {label}
//       </Typography>
//     </Box>
//   );

//   if (loading) {
//     return renderSkeleton();
//   }

//   return (
//     <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
//       {/* Alerts for feedback */}
//       {error && (
//         <Alert 
//           severity="error" 
//           sx={{ 
//             mb: 3, 
//             borderRadius: 2,
//             boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//             '& .MuiAlert-icon': { fontSize: 28 }
//           }}
//         >
//           {error}
//         </Alert>
//       )}
      
//       {success && (
//         <Alert 
//           severity="success" 
//           sx={{ 
//             mb: 3, 
//             borderRadius: 2,
//             boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//             '& .MuiAlert-icon': { fontSize: 28 }
//           }}
//         >
//           {success}
//         </Alert>
//       )}

//       {/* OTP Verification Modal */}
//       <Dialog
//         open={showOtpModal}
//         onClose={() => setShowOtpModal(false)}
//         sx={{ 
//           '& .MuiPaper-root': { 
//             borderRadius: 4, 
//             p: 2, 
//             minWidth: 350,
//             maxWidth: 450,
//             boxShadow: "0 24px 48px rgba(0,0,0,0.2)"
//           } 
//         }}
//       >
//         <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", pb: 0 }}>
//           <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
//             <Avatar sx={{ 
//               bgcolor: "primary.main", 
//               width: 60, 
//               height: 60,
//               boxShadow: "0 8px 16px rgba(25, 118, 210, 0.3)"
//             }}>
//               <VpnKey sx={{ fontSize: 32 }} />
//             </Avatar>
//           </Box>
//           Verify OTP
//         </DialogTitle>

//         <DialogContent>
//           <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
//             We've sent a verification code to your email {profileData.email}
//           </Typography>

//           {/* OTP Input Field */}
//           <TextField
//             fullWidth
//             label="Enter OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             sx={{ 
//               '& .MuiOutlinedInput-root': {
//                 borderRadius: 2,
//                 fontSize: 18,
//                 letterSpacing: 4,
//                 textAlign: 'center'
//               }
//             }}
//             error={!!error}
//             helperText={error}
//             inputProps={{ maxLength: 6 }}
//             placeholder="• • • • • •"
//           />

//           {/* OTP Expiry Timer */}
//           <Box textAlign="center" mt={3} mb={1}>
//             <Chip 
//               icon={<Refresh fontSize="small" />}
//               label={`Expires in: ${formatTime(otpTimer)}`}
//               color={otpTimer > 30 ? "primary" : "error"}
//               variant="outlined"
//               sx={{ py: 2 }}
//             />
//           </Box>
//         </DialogContent>

//         <DialogActions sx={{ justifyContent: "center", p: 3 }}>
//           <Button 
//             onClick={() => setShowOtpModal(false)} 
//             color="error"
//             variant="outlined"
//             sx={{ borderRadius: 2, px: 3 }}
//           >
//             Cancel
//           </Button>
//           <Button 
//             onClick={verifyOTP} 
//             variant="contained" 
//             color="primary"
//             sx={{ 
//               borderRadius: 2, 
//               px: 3,
//               boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)"
//             }}
//           >
//             Verify OTP
//           </Button>
//         </DialogActions>
        
//         <Box textAlign="center" pb={2}>
//           <Button
//             onClick={handleResendOTP}
//             disabled={!canResendOtp || resending}
//             sx={{ 
//               textTransform: "none",
//               fontSize: "0.9rem"
//             }}
//             startIcon={resending ? <CircularProgress size={16} /> : null}
//           >
//             {resending ? "Resending..." : "Didn't receive code? Resend OTP"}
//           </Button>
//         </Box>
//       </Dialog>

//       <Grid container spacing={4}>
//         {/* Profile Header Card */}
//         <Grid item xs={12}>
//           <Card
//             sx={{
//               borderRadius: 4,
//               background: "linear-gradient(135deg, #1976D2, #64B5F6)",
//               boxShadow: "0px 10px 30px rgba(25, 118, 210, 0.3)",
//               overflow: "visible",
//               position: "relative",
//               p: { xs: 3, md: 5 },
//               mb: 2
//             }}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: { xs: "column", md: "row" },
//                 alignItems: "center",
//                 gap: { xs: 3, md: 5 },
//                 color: "white",
//               }}
//             >
//               {/* Large Avatar with border */}
//               <Avatar
//                 sx={{
//                   width: { xs: 100, md: 140 },
//                   height: { xs: 100, md: 140 },
//                   bgcolor: "white",
//                   color: "primary.main",
//                   fontSize: { xs: 40, md: 60 },
//                   boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.25)",
//                   border: "5px solid rgba(255, 255, 255, 0.3)",
//                   position: { md: "relative" },
//                   top: { md: 0 },
//                   transform: { md: "translateY(0)" },
//                 }}
//               >
//                 {profileData.name?.charAt(0).toUpperCase() || <Person fontSize="large" />}
//               </Avatar>

//               <Box sx={{ textAlign: { xs: "center", md: "left" }, width: "100%" }}>
//                 {/* User Name */}
//                 <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { xs: "center", md: "flex-end" }, gap: 1, mb: 1 }}>
//                   <Typography variant="h4" fontWeight="bold" sx={{ color: "white" }}>
//                     {profileData.name}
//                   </Typography>
//                   <Chip 
//                     label={profileData.plan} 
//                     color="warning" 
//                     sx={{ 
//                       height: 26, 
//                       bgcolor: "rgba(255, 255, 255, 0.85)", 
//                       color: "#1976D2", 
//                       fontWeight: "bold",
//                       mb: { xs: 1, md: 0.5 }
//                     }} 
//                     icon={<VerifiedUser style={{ color: "#1976D2" }} />}
//                   />
//                 </Box>
                
//                 {/* Email */}
//                 <Box sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", md: "flex-start" }, gap: 1, mb: 1 }}>
//                   <Email fontSize="small" />
//                   <Typography variant="body1">{profileData.email}</Typography>
//                 </Box>
                
//                 {/* Phone */}
//                 <Box sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", md: "flex-start" }, gap: 1 }}>
//                   <Phone fontSize="small" />
//                   <Typography variant="body1">{profileData.phone}</Typography>
//                 </Box>

//                 {/* User ID */}
//                 <Box 
//                   sx={{ 
//                     mt: 2, 
//                     display: "inline-block", 
//                     mx: { xs: "auto", md: 0 }, 
//                     px: 2, 
//                     py: 0.5, 
//                     bgcolor: "rgba(255, 255, 255, 0.2)", 
//                     borderRadius: 2
//                   }}
//                 >
//                   <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                     <Badge fontSize="small" />
//                     User ID: <strong>{profileData.userId}</strong>
//                   </Typography>
//                 </Box>
//               </Box>
//             </Box>
//           </Card>
//         </Grid>
        
//         {/* Main Content Area */}
//         <Grid item xs={12}>
//           <Card
//             sx={{
//               borderRadius: 4,
//               boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.12)",
//               mb: 4,
//               overflow: "hidden",
//               height: "100%",
//             }}
//           >
//             {/* Tabs Navigation */}
//             <Paper 
//               elevation={0} 
//               sx={{ 
//                 px: { xs: 1, md: 3 }, 
//                 borderBottom: "1px solid #eaeaea", 
//                 bgcolor: "background.paper" 
//               }}
//             >
//               <Tabs
//                 value={tab}
//                 onChange={handleTabChange}
//                 variant={isMobile ? "fullWidth" : "standard"}
//                 sx={{
//                   "& .MuiTab-root": {
//                     textTransform: "none",
//                     fontWeight: "bold",
//                     fontSize: { xs: "14px", md: "16px" },
//                     minHeight: 60,
//                     transition: "0.3s",
//                     borderRadius: 2,
//                     "&:hover": {
//                       bgcolor: "action.hover",
//                     },
//                   },
//                   "& .MuiTabs-indicator": {
//                     height: 4,
//                     borderRadius: 2,
//                     bgcolor: "primary.main",
//                   },
//                 }}
//               >
//                 <Tab 
//                   label={isMobile ? "View" : "View Profile"} 
//                   icon={<Person />} 
//                   iconPosition="start" 
//                 />
//                 <Tab 
//                   label={isMobile ? "Update" : "Update Profile"} 
//                   icon={<Edit />} 
//                   iconPosition="start" 
//                 />
//                 <Tab 
//                   label={isMobile ? "Password" : "Change Password"} 
//                   icon={<Lock />} 
//                   iconPosition="start" 
//                 />
//               </Tabs>
//             </Paper>

//             <CardContent sx={{ p: { xs: 2, md: 4 }, bgcolor: "background.paper" }}>
//               <Box
//                 sx={{
//                   opacity: 0,
//                   transform: "translateY(10px)",
//                   animation: "fadeIn 0.3s ease-in-out forwards",
//                   "@keyframes fadeIn": {
//                     "100%": { opacity: 1, transform: "translateY(0)" },
//                   },
//                   minHeight: "60vh"
//                 }}
//               >
//                 {/* Profile View Tab */}
//                 {tab === 0 && (
//                   <Box>
//                     <Box 
//                       sx={{ 
//                         display: "flex", 
//                         justifyContent: "space-between", 
//                         alignItems: "center", 
//                         mb: 4, 
//                         borderBottom: "1px solid #f0f0f0",
//                         pb: 2
//                       }}
//                     >
//                       <Typography variant="h5" color="primary" fontWeight="bold">
//                         Profile Details
//                       </Typography>
//                       <Button 
//                         variant="outlined" 
//                         color="primary"
//                         startIcon={<Edit />}
//                         onClick={() => setTab(1)}
//                         sx={{ borderRadius: 2 }}
//                       >
//                         Edit Profile
//                       </Button>
//                     </Box>
//                     I'll continue implementing the UpgradedProfilePage.js from where it left off. The current code shows the beginning of the Profile View Tab, and we need to complete the rest of the tabs and functionality.

// Here's how I'll continue the implementation:

// ```javascript:c:\Users\aashi\OneDrive\Documents\LenZ\frontend\src\pages\UpgradedProfilePage.js
//                     <Box 
//                       sx={{ 
//                         display: "flex", 
//                         justifyContent: "space-between", 
//                         alignItems: "center", 
//                         mb: 4, 
//                         borderBottom: "1px solid #f0f0f0",
//                         pb: 2
//                       }}
//                     >
//                       <Typography variant="h5" color="primary" fontWeight="bold">
//                         Profile Details
//                       </Typography>
//                       <Button 
//                         variant="outlined" 
//                         color="primary"
//                         startIcon={<Edit />}
//                         onClick={() => setTab(1)}
//                         sx={{ borderRadius: 2 }}
//                       >
//                         Edit Profile
//                       </Button>
//                     </Box>

//                     {/* Personal Information Section */}
//                     <Typography variant="h6" fontWeight="bold" mb={3} color="text.secondary">
//                       Personal Information
//                     </Typography>
//                     <Grid container spacing={3} mb={5}>
//                       <Grid item xs={12} sm={6} md={4}>
//                         <DetailItem 
//                           icon={<Person />} 
//                           label="Full Name" 
//                           value={profileData.name || "Not provided"} 
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={6} md={4}>
//                         <DetailItem 
//                           icon={<Email />} 
//                           label="Email Address" 
//                           value={profileData.email || "Not provided"} 
//                           color="#2E7D32" // green
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={6} md={4}>
//                         <DetailItem 
//                           icon={<Phone />} 
//                           label="Phone Number" 
//                           value={profileData.phone || "Not provided"} 
//                           color="#D32F2F" // red
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={6} md={4}>
//                         <DetailItem 
//                           icon={<Phone />} 
//                           label="Alternate Phone" 
//                           value={formattedAlternatePhone} 
//                           color="#ED6C02" // orange
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={6} md={4}>
//                         <DetailItem 
//                           icon={<Business />} 
//                           label="Shop Name" 
//                           value={profileData.shopName || "Not provided"} 
//                           color="#9C27B0" // purple
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={6} md={4}>
//                         <DetailItem 
//                           icon={<Badge />} 
//                           label="User ID" 
//                           value={profileData.userId || "Not provided"} 
//                           color="#0288D1" // blue
//                         />
//                       </Grid>
//                     </Grid>

//                     {/* Address Information Section */}
//                     <Typography variant="h6" fontWeight="bold" mb={3} color="text.secondary">
//                       Address Information
//                     </Typography>
//                     <Grid container spacing={3} mb={5}>
//                       <Grid item xs={12} sm={6}>
//                         <DetailItem 
//                           icon={<Home />} 
//                           label="Address Line 1" 
//                           value={profileData.address?.line1 || "Not provided"} 
//                           color="#0288D1" // blue
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={6}>
//                         <DetailItem 
//                           icon={<Home />} 
//                           label="Address Line 2" 
//                           value={profileData.address?.line2 || "Not provided"} 
//                           color="#0288D1" // blue
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={6} md={4}>
//                         <DetailItem 
//                           icon={<LocationOn />} 
//                           label="Landmark" 
//                           value={profileData.address?.landmark || "Not provided"} 
//                           color="#2E7D32" // green
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={6} md={4}>
//                         <DetailItem 
//                           icon={<LocationCity />} 
//                           label="City" 
//                           value={profileData.address?.city || "Not provided"} 
//                           color="#D32F2F" // red
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={6} md={4}>
//                         <DetailItem 
//                           icon={<LocationCity />} 
//                           label="State" 
//                           value={profileData.address?.state || "Not provided"} 
//                           color="#ED6C02" // orange
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={6} md={4}>
//                         <DetailItem 
//                           icon={<PinDrop />} 
//                           label="Pin Code" 
//                           value={profileData.address?.pinCode || "Not provided"} 
//                           color="#9C27B0" // purple
//                         />
//                       </Grid>
//                     </Grid>

//                     {/* Account Statistics Section */}
//                     <Typography variant="h6" fontWeight="bold" mb={3} color="text.secondary">
//                       Account Statistics
//                     </Typography>
//                     <Grid container spacing={3}>
//                       <Grid item xs={12} md={4}>
//                         <StatCard 
//                           icon={<Map sx={{ fontSize: 36, color: "white" }} />} 
//                           label="Maximum Delivery Distance" 
//                           value={`${profileData.distance || 0} km`}
//                           primaryColor="#2E7D32"
//                           secondaryColor="#4CAF50"
//                         />
//                       </Grid>
//                       <Grid item xs={12} md={4}>
//                         <StatCard 
//                           icon={<CardMembership sx={{ fontSize: 36, color: "white" }} />} 
//                           label="Current Plan" 
//                           value={profileData.plan || "Free"}
//                           primaryColor="#9C27B0"
//                           secondaryColor="#BA68C8"
//                         />
//                       </Grid>
//                       <Grid item xs={12} md={4}>
//                         <StatCard 
//                           icon={<AccountBalanceWallet sx={{ fontSize: 36, color: "white" }} />} 
//                           label="Credit Balance" 
//                           value={`₹ ${profileData.creditBalance || 0}`}
//                           primaryColor="#D32F2F"
//                           secondaryColor="#EF5350"
//                         />
//                       </Grid>
//                     </Grid>
//                   </Box>
//                 )}

//                 {/* Profile Update Tab */}
//                 {tab === 1 && (
//                   <Box component="form" onSubmit={handleUpdate}>
//                     <Box 
//                       sx={{ 
//                         display: "flex", 
//                         justifyContent: "space-between", 
//                         alignItems: "center", 
//                         mb: 4, 
//                         borderBottom: "1px solid #f0f0f0",
//                         pb: 2
//                       }}
//                     >
//                       <Typography variant="h5" color="primary" fontWeight="bold">
//                         Update Profile
//                       </Typography>
//                       <Button 
//                         variant="outlined" 
//                         color="primary"
//                         startIcon={<Person />}
//                         onClick={() => setTab(0)}
//                         sx={{ borderRadius: 2 }}
//                       >
//                         View Profile
//                       </Button>
//                     </Box>

//                     {/* Personal Information Update Section */}
//                     <Typography variant="h6" fontWeight="bold" mb={3} color="text.secondary">
//                       Personal Information
//                     </Typography>
//                     <Grid container spacing={3} mb={5}>
//                       <Grid item xs={12} sm={6}>
//                         <TextField
//                           fullWidth
//                           label="Full Name"
//                           name="name"
//                           value={profileData.name}
//                           onChange={handleChange}
//                           error={!!errors.name}
//                           helperText={errors.name}
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <Person color="primary" />
//                               </InputAdornment>
//                             ),
//                           }}
//                           sx={{ 
//                             '& .MuiOutlinedInput-root': { 
//                               borderRadius: 2,
//                             }
//                           }}
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={6}>
//                         <TextField
//                           fullWidth
//                           label="Email Address"
//                           name="email"
//                           value={profileData.email}
//                           onChange={handleChange}
//                           error={!!errors.email}
//                           helperText={errors.email}
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <Email color="primary" />
//                               </InputAdornment>
//                             ),
//                           }}
//                           sx={{ 
//                             '& .MuiOutlinedInput-root': { 
//                               borderRadius: 2,
//                             }
//                           }}
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={6}>
//                         <TextField
//                           fullWidth
//                           label="Phone Number"
//                           name="phone"
//                           value={profileData.phone}
//                           onChange={handleChange}
//                           error={!!errors.phone}
//                           helperText={errors.phone}
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <Phone color="primary" />
//                               </InputAdornment>
//                             ),
//                           }}
//                           sx={{ 
//                             '& .MuiOutlinedInput-root': { 
//                               borderRadius: 2,
//                             }
//                           }}
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={6}>
//                         <TextField
//                           fullWidth
//                           label="Alternate Phone (Optional)"
//                           name="alternatePhone"
//                           value={profileData.alternatePhone}
//                           onChange={handleChange}
//                           error={!!errors.alternatePhone}
//                           helperText={errors.alternatePhone}
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <Phone color="primary" />
//                               </InputAdornment>
//                             ),
//                           }}
//                           sx={{ 
//                             '& .MuiOutlinedInput-root': { 
//                               borderRadius: 2,
//                             }
//                           }}
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={6}>
//                         <TextField
//                           fullWidth
//                           label="Shop Name (Optional)"
//                           name="shopName"
//                           value={profileData.shopName}
//                           onChange={handleChange}
//                           error={!!errors.shopName}
//                           helperText={errors.shopName}
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <Business color="primary" />
//                               </InputAdornment>
//                             ),
//                           }}
//                           sx={{ 
//                             '& .MuiOutlinedInput-root': { 
//                               borderRadius: 2,
//                             }
//                           }}
//                         />
//                       </Grid>
//                     </Grid>

//                     {/* Address Information Update Section */}
//                     <Typography variant="h6" fontWeight="bold" mb={3} color="text.secondary">
//                       Address Information
//                     </Typography>
//                     <Grid container spacing={3} mb={5}>
//                       <Grid item xs={12} sm={6}>
//                         <TextField
//                           fullWidth
//                           label="Address Line 1"
//                           name="address.line1"
//                           value={profileData.address?.line1 || ""}
//                           onChange={handleChange}
//                           error={!!errors["address.line1"]}
//                           helperText={errors["address.line1"]}
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <Home color="primary" />
//                               </InputAdornment>
//                             ),
//                           }}
//                           sx={{ 
//                             '& .MuiOutlinedInput-root': { 
//                               borderRadius: 2,
//                             }
//                           }}
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={6}>
//                         <TextField
//                           fullWidth
//                           label="Address Line 2 (Optional)"
//                           name="address.line2"
//                           value={profileData.address?.line2 || ""}
//                           onChange={handleChange}
//                           error={!!errors["address.line2"]}
//                           helperText={errors["address.line2"]}
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <Home color="primary" />
//                               </InputAdornment>
//                             ),
//                           }}
//                           sx={{ 
//                             '& .MuiOutlinedInput-root': { 
//                               borderRadius: 2,
//                             }
//                           }}
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={6} md={4}>
//                         <TextField
//                           fullWidth
//                           label="Landmark (Optional)"
//                           name="address.landmark"
//                           value={profileData.address?.landmark || ""}
//                           onChange={handleChange}
//                           error={!!errors["address.landmark"]}
//                           helperText={errors["address.landmark"]}
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <LocationOn color="primary" />
//                               </InputAdornment>
//                             ),
//                           }}
//                           sx={{ 
//                             '& .MuiOutlinedInput-root': { 
//                               borderRadius: 2,
//                             }
//                           }}
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={6} md={4}>
//                         <TextField
//                           fullWidth
//                           label="City"
//                           name="address.city"
//                           value={profileData.address?.city || ""}
//                           onChange={handleChange}
//                           error={!!errors["address.city"]}
//                           helperText={errors["address.city"]}
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <LocationCity color="primary" />
//                               </InputAdornment>
//                             ),
//                           }}
//                           sx={{ 
//                             '& .MuiOutlinedInput-root': { 
//                               borderRadius: 2,
//                             }
//                           }}
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={6} md={4}>
//                         <TextField
//                           fullWidth
//                           label="State"
//                           name="address.state"
//                           value={profileData.address?.state || ""}
//                           onChange={handleChange}
//                           error={!!errors["address.state"]}
//                           helperText={errors["address.state"]}
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <LocationCity color="primary" />
//                               </InputAdornment>
//                             ),
//                           }}
//                           sx={{ 
//                             '& .MuiOutlinedInput-root': { 
//                               borderRadius: 2,
//                             }
//                           }}
//                         />
//                       </Grid>
//                       <Grid item xs={12} sm={6} md={4}>
//                         <TextField
//                           fullWidth
//                           label="Pin Code"
//                           name="address.pinCode"
//                           value={profileData.address?.pinCode || ""}
//                           onChange={handleChange}
//                           error={!!errors["address.pinCode"]}
//                           helperText={errors["address.pinCode"]}
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <PinDrop color="primary" />
//                               </InputAdornment>
//                             ),
//                           }}
//                           sx={{ 
//                             '& .MuiOutlinedInput-root': { 
//                               borderRadius: 2,
//                             }
//                           }}
//                         />
//                       </Grid>
//                     </Grid>

//                     {/* Submit Button */}
//                     <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//                       <Button
//                         type="submit"
//                         variant="contained"
//                         color="primary"
//                         size="large"
//                         disabled={loading}
//                         startIcon={loading ? <CircularProgress size={20} /> : <Edit />}
//                         sx={{
//                           py: 1.5,
//                           px: 4,
//                           borderRadius: 2,
//                           boxShadow: "0 8px 16px rgba(25, 118, 210, 0.3)",
//                           fontSize: "1rem",
//                           fontWeight: "bold",
//                           transition: "transform 0.2s",
//                           "&:hover": {
//                             transform: "translateY(-3px)",
//                             boxShadow: "0 12px 20px rgba(25, 118, 210, 0.4)",
//                           },
//                         }}
//                       >
//                         {loading ? "Updating..." : "Update Profile"}
//                       </Button>
//                     </Box>
//                   </Box>
//                 )}

//                 {/* Change Password Tab */}
//                 {tab === 2 && (
//                   <Box component="form" onSubmit={handleChangePassword}>
//                     <Box 
//                       sx={{ 
//                         display: "flex", 
//                         justifyContent: "space-between", 
//                         alignItems: "center", 
//                         mb: 4, 
//                         borderBottom: "1px solid #f0f0f0",
//                         pb: 2
//                       }}
//                     >
//                       <Typography variant="h5" color="primary" fontWeight="bold">
//                         Change Password
//                       </Typography>
//                       <Button 
//                         variant="outlined" 
//                         color="primary"
//                         startIcon={<Person />}
//                         onClick={() => setTab(0)}
//                         sx={{ borderRadius: 2 }}
//                       >
//                         View Profile
//                       </Button>
//                     </Box>

//                     <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
//                       <Typography variant="body1" color="text.secondary" mb={4} textAlign="center">
//                         For security reasons, you need to verify your identity with OTP before changing your password.
//                       </Typography>

//                       {/* Password Fields */}
//                       <Grid container spacing={3}>
//                         <Grid item xs={12}>
//                           <TextField
//                             fullWidth
//                             label="Current Password"
//                             name="oldPassword"
//                             type={showOldPassword ? "text" : "password"}
//                             value={oldPassword}
//                             onChange={(e) => setOldPassword(e.target.value)}
//                             InputProps={{
//                               startAdornment: (
//                                 <InputAdornment position="start">
//                                   <Lock color="primary" />
//                                 </InputAdornment>
//                               ),
//                               endAdornment: (
//                                 <InputAdornment position="end">
//                                   <IconButton
//                                     onClick={() => handleClickShowPassword("oldPassword")}
//                                     edge="end"
//                                   >
//                                     {showOldPassword ? <VisibilityOff /> : <Visibility />}
//                                   </IconButton>
//                                 </InputAdornment>
//                               ),
//                             }}
//                             sx={{ 
//                               '& .MuiOutlinedInput-root': { 
//                                 borderRadius: 2,
//                               }
//                             }}
//                           />
//                         </Grid>
//                         <Grid item xs={12}>
//                           <TextField
//                             fullWidth
//                             label="New Password"
//                             name="newPassword"
//                             type={showNewPassword ? "text" : "password"}
//                             value={newPassword}
//                             onChange={(e) => setNewPassword(e.target.value)}
//                             InputProps={{
//                               startAdornment: (
//                                 <InputAdornment position="start">
//                                   <VpnKey color="primary" />
//                                 </InputAdornment>
//                               ),
//                               endAdornment: (
//                                 <InputAdornment position="end">
//                                   <IconButton
//                                     onClick={() => handleClickShowPassword("newPassword")}
//                                     edge="end"
//                                   >
//                                     {showNewPassword ? <VisibilityOff /> : <Visibility />}
//                                   </IconButton>
//                                 </InputAdornment>
//                               ),
//                             }}
//                             sx={{ 
//                               '& .MuiOutlinedInput-root': { 
//                                 borderRadius: 2,
//                               }
//                             }}
//                           />
//                         </Grid>
//                         <Grid item xs={12}>
//                           <TextField
//                             fullWidth
//                             label="Confirm New Password"
//                             name="confirmPassword"
//                             type={showConfirmPassword ? "text" : "password"}
//                             value={confirmPassword}
//                             onChange={(e) => setConfirmPassword(e.target.value)}
//                             InputProps={{
//                               startAdornment: (
//                                 <InputAdornment position="start">
//                                   <VpnKey color="primary" />
//                                 </InputAdornment>
//                               ),
//                               endAdornment: (
//                                 <InputAdornment position="end">
//                                   <IconButton
//                                     onClick={() => handleClickShowPassword("confirmPassword")}
//                                     edge="end"
//                                   >
//                                     {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
//                                   </IconButton>
//                                 </InputAdornment>
//                               ),
//                             }}
//                             sx={{ 
//                               '& .MuiOutlinedInput-root': { 
//                                 borderRadius: 2,
//                               }
//                             }}
//                           />
//                         </Grid>
//                       </Grid>

//                       {/* Password Requirements */}
//                       <Box 
//                         sx={{ 
//                           mt: 4, 
//                           p: 3, 
//                           bgcolor: "rgba(25, 118, 210, 0.05)", 
//                           borderRadius: 3,
//                           border: "1px solid rgba(25, 118, 210, 0.1)"
//                         }}
//                       >
//                         <Typography variant="subtitle2" fontWeight="bold" color="primary" mb={2}>
//                           Password Requirements:
//                         </Typography>
//                         <Stack spacing={1}>
//                           <Typography 
//                             variant="body2" 
//                             sx={{ 
//                               display: "flex", 
//                               alignItems: "center", 
//                               gap: 1,
//                               color: newPassword.length >= 8 && newPassword.length <= 13 ? "success.main" : "text.secondary"
//                             }}
//                           >
//                             • Must be 8-13 characters long
//                           </Typography>
//                           <Typography 
//                             variant="body2" 
//                             sx={{ 
//                               display: "flex", 
//                               alignItems: "center", 
//                               gap: 1,
//                               color: /[A-Z]/.test(newPassword) ? "success.main" : "text.secondary"
//                             }}
//                           >
//                             • Must contain at least one uppercase letter
//                           </Typography>
//                           <Typography 
//                             variant="body2" 
//                             sx={{ 
//                               display: "flex", 
//                               alignItems: "center", 
//                               gap: 1,
//                               color: /[0-9]/.test(newPassword) ? "success.main" : "text.secondary"
//                             }}
//                           >
//                             • Must contain at least one number
//                           </Typography>
//                           <Typography 
//                             variant="body2" 
//                             sx={{ 
//                               display: "flex", 
//                               alignItems: "center", 
//                               gap: 1,
//                               color: /[!@#$%^&*]/.test(newPassword) ? "success.main" : "text.secondary"
//                             }}
//                           >
//                             • Must contain at least one special character (!@#$%^&*)
//                           </Typography>
//                           <Typography 
//                             variant="body2" 
//                             sx={{ 
//                               display: "flex", 
//                               alignItems: "center", 
//                               gap: 1,
//                               color: newPassword === confirmPassword && newPassword ? "success.main" : "text.secondary"
//                             }}
//                           >
//                             • Passwords must match
//                           </Typography>
//                         </Stack>
//                       </Box>

//                       {/* Submit Button */}
//                       <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//                         <Button
//                           type="submit"
//                           variant="contained"
//                           color="primary"
//                           size="large"
//                           disabled={loading}
//                           startIcon={loading ? <CircularProgress size={20} /> : <Lock />}
//                           sx={{
//                             py: 1.5,
//                             px: 4,
//                             borderRadius: 2,
//                             boxShadow: "0 8px 16px rgba(25, 118, 210, 0.3)",
//                             fontSize: "1rem",
//                             fontWeight: "bold",
//                             transition: "transform 0.2s",
//                             "&:hover": {
//                               transform: "translateY(-3px)",
//                               boxShadow: "0 12px 20px rgba(25, 118, 210, 0.4)",
//                             },
//                           }}
//                         >
//                           {loading ? "Updating..." : "Change Password"}
//                         </Button>
//                       </Box>
//                     </Box>
//                   </Box>
//                 )}
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// // Format alternate phone number for display
// const formattedAlternatePhone = profileData.alternatePhone && profileData.alternatePhone !== "+91" 
//   ? profileData.alternatePhone 
//   : "Not provided";

// export default ProfilePage;
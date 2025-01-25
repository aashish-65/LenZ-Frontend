import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper,
  CircularProgress,
} from '@mui/material';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    plan: '',
  });

  const [userId, setUserId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://lenz-backend.onrender.com/api/auth/signup', formData);
      setUserId(response.data.userId);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 450,
        margin: '50px auto',
        padding: 4,
        borderRadius: 3,
        backgroundColor: '#fdfdfd',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#333' }}>
        Sign Up for LenZ
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        sx={{ color: '#777', marginBottom: 3 }}
      >
        Join our platform and manage your orders effortlessly!
      </Typography>

      {userId ? (
        <Box sx={{ textAlign: 'center', padding: 2, backgroundColor: '#dff0d8', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ color: '#3c763d', marginBottom: 1 }}>
            Signup Successful!
          </Typography>
          <Typography variant="body1" sx={{ color: '#3c763d' }}>
            Your Unique ID: <strong>{userId}</strong>
          </Typography>
        </Box>
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="name"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email Address"
            name="email"
            type="email"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Phone Number"
            name="phone"
            type="tel"
            variant="outlined"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Plan</InputLabel>
            <Select
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              variant="outlined"
              label="Plan"
            >
              <MenuItem value="400">₹400 - Basic Plan</MenuItem>
              <MenuItem value="3000">₹3000 - Standard Plan</MenuItem>
              <MenuItem value="5000">₹5000 - Premium Plan</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              padding: 1.5,
              fontSize: '16px',
              textTransform: 'none',
              marginTop: 3,
              backgroundColor: '#007bff',
              '&:hover': { backgroundColor: '#0056b3' },
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
          </Button>
        </form>
      )}

      {error && (
        <Typography
          sx={{ color: '#d32f2f', marginTop: 2, textAlign: 'center' }}
          variant="body2"
        >
          {error}
        </Typography>
      )}
    </Paper>
  );
};

export default Signup;

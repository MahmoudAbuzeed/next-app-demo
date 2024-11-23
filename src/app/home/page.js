"use client"
import { useState } from 'react';
import { Box, Button, TextField, Typography, Grid, Avatar, Paper } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your backend login endpoint
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Check if the response is successful
      if (response.ok) {
        const data = await response.json();
        // Assuming the backend returns a JWT token upon successful login
        const token = data.token;

        // Store the token in localStorage or any state management library
        localStorage.setItem('token', token);

        // Redirect to the dashboard or home page
        router.push('/dashboard');
      } else {
        // Handle errors returned from the backend
        const errorData = await response.json();
        setError(errorData.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      // Handle network or unexpected errors
      console.error('An unexpected error occurred:', err);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
      <Grid item xs={11} sm={8} md={4}>
        <Paper elevation={10} sx={{ padding: 4, borderRadius: 3 }}>
          <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mb={3}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" component="h1" sx={{ mt: 1 }}>
              Sign In
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              required
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Login
            </Button>
          </form>
          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Don't have an account? <a href="/register">Register here</a>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

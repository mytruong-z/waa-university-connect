import React from 'react';
import { Box, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Toolbar />
      <Typography variant="h4" gutterBottom>
        User Dashboard
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button variant="contained" color="primary" component={Link} to="/manage/threads">
          Manage Threads
        </Button>
        <Button variant="contained" color="primary" component={Link} to="/manage/events">
          Manage Events
        </Button>
        {/* Add more management options here */}
      </Box>
    </Box>
  );
};

export default UserDashboard;

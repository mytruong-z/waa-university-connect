import React from 'react';
import { Box, Toolbar, Typography } from '@mui/material';

const AdminDashboard = () => {
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
    >
      <Toolbar />
      <Typography variant="h4" gutterBottom>
        Welcome to University Connect Admin Dashboard
      </Typography>
      <Typography variant="body1">
        Here you can manage the platform's content and users.
      </Typography>
    </Box>
  );
};

export default AdminDashboard;

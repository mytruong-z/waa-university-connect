import React from 'react';
import { Box, Typography } from '@mui/material';

const Home = () => {
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to University Connect
      </Typography>
      <Typography variant="body1">
        Connect with your peers, share resources, and stay updated on university events.
      </Typography>
    </Box>
  );
};

export default Home;

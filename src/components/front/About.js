import React from 'react';
import { Box, Typography } from '@mui/material';

const About = () => {
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
    >
      <Typography variant="h4" gutterBottom>
        About University Connect
      </Typography>
      <Typography variant="body1">
        University Connect is a dedicated social media platform designed exclusively for university students.
      </Typography>
    </Box>
  );
};

export default About;

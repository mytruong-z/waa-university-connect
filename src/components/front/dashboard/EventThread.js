import React from 'react';
import { Box, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Toolbar />
            <Typography variant="h4" gutterBottom>
               Event Thread
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button variant="contained" color="primary" component={Link} to="/events/my">
                    My Events
                </Button>
                <Button variant="contained" color="primary" component={Link} to="/upcoming/events">
                    Upcoming Events
                </Button>
                <Button variant="contained" color="primary" component={Link} to="/running/events">
                    Running Events
                </Button>
                {/* Add more management options here */}
            </Box>
        </Box>
    );
};

export default UserDashboard;

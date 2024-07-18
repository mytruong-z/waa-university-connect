import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Drawer, Toolbar, Typography, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ForumIcon from '@mui/icons-material/Forum';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import EventIcon from '@mui/icons-material/Event';
import ThreadIcon from '@mui/icons-material/Article';
import SchoolIcon from '@mui/icons-material/School';
import MoodIcon from '@mui/icons-material/Mood';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../context/authContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/admin/login');
    logout();
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box', backgroundColor: '#1e88e5', color: '#fff' },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Admin Dashboard
        </Typography>
      </Toolbar>
      <div style={{position: 'relative', height: '100%'}}>
        <List>
          {[
            { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
            { text: 'Profiles', icon: <PeopleIcon />, path: '/admin/profiles' },
            { text: 'Discussions', icon: <ForumIcon />, path: '/admin/discussions' },
            { text: 'Resources', icon: <LibraryBooksIcon />, path: '/admin/resources' },
            { text: 'Events', icon: <EventIcon />, path: '/admin/events' },
            { text: 'Threads', icon: <ThreadIcon />, path: '/admin/threads' },
            { text: 'Students', icon: <SchoolIcon />, path: '/admin/students' },
            { text: 'Surveys', icon: <MoodIcon />, path: '/admin/surveys' },
          ].map((item) => (
            <ListItem button key={item.text} component={Link} to={item.path}>
              <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}

        </List>
        <Divider />
        <List sx={{position: 'absolute', bottom: 0, width: '100%'}}>
          <ListItem button key="Logout" onClick={handleLogout}>
            <ListItemIcon sx={{ color: '#fff' }}><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;

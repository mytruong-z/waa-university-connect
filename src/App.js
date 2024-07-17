import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import AdminDashboard from './components/admin/AdminDashboard';
import Sidebar from './components/admin/Sidebar';
import Home from './components/front/Home';
import About from './components/front/About';
import Threads from './components/admin/Threads';
import Posts from './components/admin/Posts';
import Surveys from './components/admin/Surveys';
import Header from './components/front/Header';
import ThreadList from './components/front/thread/ThreadList';
import ThreadDetail from './components/front/thread/ThreadDetail';
import UserDashboard from './components/front/dashboard/UserDashboard';
import ManageThreads from './components/front/dashboard/ManageThreads';

import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useAuth, AuthProvider } from './context/authContext';
import UserLoginPage from './pages/UserLoginPage';
import AdminLoginPage from './pages/AdminLoginPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Routes>

            <Route path="/login" element={<UserLoginPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />

            <Route element={<PrivateRoute />}>
              <Route path="/*" element={<FrontLayout />} />
            </Route>
            <Route element={<PrivateRoute adminOnly={true} />}>
              <Route path="/admin/*" element={<AdminLayout />} />
            </Route>

          </Routes>
        </Box>
      </AuthProvider>
    </Router>
  );
}


const PrivateRoute = ({ adminOnly = false }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated && !localStorage.getItem('token')) {
    console.log('isAuthenticated: ', isAuthenticated);
    if (adminOnly && !isAdmin) {
      return <Navigate to="/" />;
    }
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};


const AdminLayout = () => (
  <Box sx={{ display: 'flex', flexGrow: 1 }}>
    <Sidebar />
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: '#e3f2fd', p: 3 }}
    >
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="threads" element={<Threads />} />
        <Route path="threads/:threadId/posts" element={<Posts />} />
        <Route path="surveys" element={<Surveys />} />
        {/* Add more admin routes here */}
      </Routes>
    </Box>
  </Box>
);

const FrontLayout = () => (
  <Box sx={{ flexGrow: 1 }}>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/threads" element={<ThreadList />} />
      <Route path="/threads/:threadId" element={<ThreadDetail />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/manage/threads" element={<ManageThreads />} />
    </Routes>
  </Box>
);



export default App;

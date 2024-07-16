import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import Register from "./components/front/Register";

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Routes>
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/*" element={<FrontLayout />} />
        </Routes>
      </Box>
    </Router>
  );
}

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
      <Route path="/register" element={<Register />} />
      <Route path="/manage/threads" element={<ManageThreads />} />
    </Routes>
  </Box>
);

export default App;

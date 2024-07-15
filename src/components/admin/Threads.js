import React, { useEffect, useState } from 'react';
import { Box, Toolbar, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllThreads, deleteThread } from '../../services/apiService';

const Threads = () => {
  const [threads, setThreads] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchThreads();
  }, []);

  const fetchThreads = () => {
    getAllThreads()
      .then(response => {
        setThreads(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the threads!', error);
      });
  };

  const handleDetail = (id) => {
    navigate(`/admin/threads/${id}/posts`);
  };

  const handleDelete = (id) => {
    deleteThread(id)
      .then(() => {
        fetchThreads(); // Reload the list after deletion
      })
      .catch(error => {
        console.error('There was an error deleting the thread!', error);
      });
  };

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: '#e3f2fd', p: 3 }}
    >
      <Toolbar />
      <Typography variant="h4" gutterBottom>
        Manage Threads
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Category</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Created By</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Created At</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {threads.map((thread) => (
              <TableRow
                key={thread.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {thread.title}
                </TableCell>
                <TableCell align="right">{thread.discussionCategory.name}</TableCell>
                <TableCell align="right">{thread.createdBy.username}</TableCell>
                <TableCell align="right">{new Date(thread.createdAt).toLocaleString()}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="primary" onClick={() => handleDetail(thread.id)} sx={{ marginRight: 1 }}>Detail</Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(thread.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Threads;

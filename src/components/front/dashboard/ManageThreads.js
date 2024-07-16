import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { getAllThreads, createThread, updateThread, deleteThread, getAllDiscussionCategories } from '../../../services/apiService';
import { useUser } from '../../../context/UserContext'; // Ensure this is correctly imported

const ManageThreads = () => {
  const { user } = useUser();
  const [threads, setThreads] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentThread, setCurrentThread] = useState({ id: null, title: '', discussionCategory: { id: '', name: '' }, createdBy: { username: '' } });

  const fetchThreads = useCallback(() => {
    if (user) {
      getAllThreads(user.id)
        .then(response => {
          setThreads(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the threads!', error);
        });
    }
  }, [user]);

  const fetchCategories = useCallback(() => {
    getAllDiscussionCategories()
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the categories!', error);
      });
  }, []);

  useEffect(() => {
    fetchThreads();
    fetchCategories();
  }, [fetchThreads, fetchCategories]);

  const handleOpen = (thread = { id: null, title: '', discussionCategory: { id: '', name: '' }, createdBy: { username: '' } }) => {
    setCurrentThread(thread);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const updatedThread = { ...currentThread, createdBy: { id: user.id, username: user.username }, discussionCategory: categories.find(cat => cat.id === currentThread.discussionCategory.id) };
    if (currentThread.id) {
      updateThread(currentThread.id, updatedThread)
        .then(() => {
          fetchThreads();
          handleClose();
        })
        .catch(error => {
          console.error('There was an error updating the thread!', error);
        });
    } else {
      updatedThread.id = threads.length + 1;
      createThread(updatedThread)
        .then(() => {
          fetchThreads();
          handleClose();
        })
        .catch(error => {
          console.error('There was an error creating the thread!', error);
        });
    }
  };

  const handleDelete = (thread) => {
    console.log('Deleting thread:', thread);

    deleteThread(thread.id)
      .then(() => {
        fetchThreads();
      })
      .catch(error => {
        console.error('There was an error deleting the thread!', error);
      });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manage Threads
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()} sx={{ marginBottom: 2 }}>
        Create New Thread
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="right">Category</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="right">Created By</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {threads.map((thread) => (
              <TableRow key={thread.id}>
                <TableCell>{thread.title}</TableCell>
                <TableCell align="right">{thread.discussionCategory.name}</TableCell>
                <TableCell align="right">{thread.createdBy.username}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="primary" onClick={() => handleOpen(thread)} sx={{ marginRight: 1 }}>Edit</Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(thread)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentThread.id ? 'Edit Thread' : 'Create New Thread'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            value={currentThread.title}
            onChange={(e) => setCurrentThread({ ...currentThread, title: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select
              value={currentThread.discussionCategory.id}
              onChange={(e) => setCurrentThread({ ...currentThread, discussionCategory: { id: e.target.value, name: categories.find(cat => cat.id === e.target.value).name } })}
              label="Category"
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>{currentThread.id ? 'Update' : 'Create'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageThreads;

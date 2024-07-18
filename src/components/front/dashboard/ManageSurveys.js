import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { getAllSurveysByUser, createSurvey, updateSurvey, deleteSurvey } from '../../../services/apiService';
import { useUser } from '../../../context/UserContext';

const ManageSurveys = () => {
  const { user } = useUser();
  const [surveys, setSurveys] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentSurvey, setCurrentSurvey] = useState({ id: null, title: '', description: '', status: 'ACTIVE', created_at: '', updated_at: '', creator_id: '' });

  const fetchSurveys = useCallback(() => {
    if (user) {
        getAllSurveysByUser(user.id)
        .then(response => {
          setSurveys(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the surveys!', error);
        });
    }
  }, [user]);

  useEffect(() => {
    fetchSurveys();
  }, [fetchSurveys]);

  const handleOpen = (survey = { id: null, title: '', description: '', status: 'ACTIVE', created_at: '', updated_at: '', creator_id: '' }) => {
    setCurrentSurvey(survey);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const updatedSurvey = { ...currentSurvey, creator_id: user.id };
    if (currentSurvey.id) {
      updateSurvey(currentSurvey.id, updatedSurvey)
        .then(() => {
          fetchSurveys();
          handleClose();
        })
        .catch(error => {
          console.error('There was an error updating the survey!', error);
        });
    } else {
      createSurvey(updatedSurvey)
        .then(() => {
          fetchSurveys();
          handleClose();
        })
        .catch(error => {
          console.error('There was an error creating the survey!', error);
        });
    }
  };

  const handleDelete = (id) => {
    deleteSurvey(id)
      .then(() => {
        fetchSurveys();
      })
      .catch(error => {
        console.error('There was an error deleting the survey!', error);
      });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manage Surveys
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()} sx={{ marginBottom: 2 }}>
        Create New Survey
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Created By</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {surveys.map((survey) => (
              <TableRow key={survey.id}>
                <TableCell>{survey.title}</TableCell>
                <TableCell align="right">{survey.description}</TableCell>
                <TableCell align="right">{survey.status}</TableCell>
                <TableCell align="right">{survey.creator_id === user.id ? user.username : 'Other'}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="primary" onClick={() => handleOpen(survey)} sx={{ marginRight: 1 }}>Edit</Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(survey.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentSurvey.id ? 'Edit Survey' : 'Create New Survey'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            value={currentSurvey.title}
            onChange={(e) => setCurrentSurvey({ ...currentSurvey, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={currentSurvey.description}
            onChange={(e) => setCurrentSurvey({ ...currentSurvey, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>{currentSurvey.id ? 'Update' : 'Create'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageSurveys;

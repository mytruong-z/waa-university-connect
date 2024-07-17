import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { getAllSurveys, createSurvey, updateSurvey } from '../../services/apiService';

const Surveys = () => {
  const [surveys, setSurveys] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentSurvey, setCurrentSurvey] = useState({ id: null, title: '', description: '', status: 'ACTIVE', created_at: '', updated_at: '', creator_id: '' });

  const fetchSurveys = useCallback(() => {
    getAllSurveys()
      .then(response => {
        setSurveys(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the surveys!', error);
      });
  }, []);

  useEffect(() => {
    fetchSurveys();
  }, [fetchSurveys]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const updatedSurvey = { ...currentSurvey };
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

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manage Surveys
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }} align="right">Description</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }} align="right">Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }} align="right">Created By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {surveys.map((survey) => (
              <TableRow key={survey.id}>
                <TableCell>{survey.title}</TableCell>
                <TableCell align="right">{survey.description}</TableCell>
                <TableCell align="right">{survey.status}</TableCell>
                <TableCell align="right">{survey.creator_id}</TableCell>
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
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select
              value={currentSurvey.status}
              onChange={(e) => setCurrentSurvey({ ...currentSurvey, status: e.target.value })}
              label="Status"
            >
              <MenuItem value="ACTIVE">Active</MenuItem>
              <MenuItem value="INACTIVE">Inactive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>{currentSurvey.id ? 'Update' : 'Create'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Surveys;

import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { getStudentEvents, deleteEvent, updateEvent, createEvent } from '../../../services/apiService';
import { useUser } from '../../../context/UserContext'; // Ensure this is correctly imported
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const ManageEvents = () => {
  const { user } = useUser();
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({id: null, title: '', description: '', eventDateTime: null, status: null, createdOn: null, publishedOn: null});

  const [open, setOpen] = useState(false);
  const studentId="617502";
  const fetchEvents = useCallback(() => {
    if (user) {
      getStudentEvents(studentId)
        .then(response => {
          setEvents(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the events!', error);
        });
    }
  }, [user]);


  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleOpen = (event = {id: null, title: '', description: '', eventDateTime: null, status: null, createdOn: null, publishedOn: null}) => {
    setCurrentEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (event) => {
    console.log('Deleting event:', event);
    deleteEvent(event.id)
        .then(() => {
          fetchEvents();
        })
        .catch(error => {
          console.error('There was an error deleting the event!', error);
        });
  };

  const handleSave = () => {
    // const updatedEvent = { ...currentEvent, discussionCategory: categories.find(cat => cat.id === currentThread.discussionCategory.id) };
    if (currentEvent.id) {
      updateEvent(currentEvent.id, currentEvent)
          .then(() => {
            fetchEvents();
            handleClose();
          })
          .catch(error => {
            console.error('There was an error updating the event!', error);
          });
    } else {
      createEvent(currentEvent)
          .then(() => {
            fetchEvents();
            handleClose();
          })
          .catch(error => {
            console.error('There was an error creating the event!', error);
          });
    }
  };

    const handleDateChange = (newValue) => {
        setCurrentEvent((prevState) => ({
            ...prevState,
            eventDateTime: newValue,
        }));
    };

  const onValueChange=(e) => setCurrentEvent({ ...currentEvent, [e.target.name]: e.target.value });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manage Events
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()} sx={{ marginBottom: 2 }}>
        Create New Event
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="right">Description</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="right">Event Datetime</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="right">Created On</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="right">Published On</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="right">Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell align="right">{item.description}</TableCell>
                <TableCell align="right">{item.eventDateTime}</TableCell>
                <TableCell align="right">{item.createdOn}</TableCell>
                <TableCell align="right">{item.publishedOn}</TableCell>
                <TableCell align="right">{item.status}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="primary" onClick={() => handleOpen(item)} sx={{ marginRight: 1 }}>Edit</Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(item)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentEvent.id ? 'Edit Event' : 'Create New Event'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            value={currentEvent.title}
            name="title"
            onChange={onValueChange} />

          <TextField
              autoFocus
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              value={currentEvent.description}
              name="title"
              onChange={onValueChange} />

          <TextField
              autoFocus
              margin="dense"
              label="Event Date Time"
              type="text"
              fullWidth
              value={currentEvent.eventDateTime}
              name="eventDateTime"
              onChange={onValueChange} />

            {/*<DateTimePicker*/}
            {/*    label="Event Date Time"*/}
            {/*    value={currentEvent.eventDateTime}*/}
            {/*    onChange={handleDateChange}*/}
            {/*    renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}*/}
            {/*/>*/}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>{currentEvent.id ? 'Update' : 'Create'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageEvents;

import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import {deleteEvent, updateEvent, createEvent, getUserEvents} from '../../../services/apiService';
import { useUser } from '../../../context/UserContext';
import { Link } from 'react-router-dom';


const ManageEvents = () => {
  const { user } = useUser();
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({id: null, title: '', description: '', eventDateTime: null, status: null, createdOn: null, publishedOn: null});

  const [open, setOpen] = useState(false);
  const fetchEvents = useCallback(() => {
    if (user) {
      getUserEvents()
        .then(response => {
            setEvents(response.data.data);
        })
        .catch(error => {
          console.error('There was an error fetching the events!', error);
        });
    }
  }, [user]);


  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleOpen = (event={id:null,title:'',description:'',eventDateTime: null}) => {
    setCurrentEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const handleEventOpen = (event) => {
        setCurrentEvent(event);
        setOpen(true);
    };

  const handleDelete = (event) => {
    deleteEvent(event.id)
        .then(() => {
            alert('event deleted successfully..!!');
          fetchEvents();
        })
        .catch(error => {
            if(error.response.data.message){
                alert(error.response.data.message);
            }
            else{
                alert('something went wrong!!')
            }
        });
  };

  const handleSave = () => {
      console.log(currentEvent);
    if (currentEvent.id) {
      updateEvent(currentEvent.id, currentEvent)
          .then(() => {
              alert('event updated successfully..!!')
            fetchEvents();
            handleClose();
          })
          .catch(error => {
              console.log(error)
              if(error.response.data.message){
                  alert(error.response.data.message);
              }
              else{
                  alert('something went wrong!!')
              }
          });
    } else {
      createEvent(currentEvent)
          .then(() => {
            alert('event created successfully..!!')
            fetchEvents();
            handleClose();
          })
          .catch(error => {
              if(error.response.message){
                  alert(error.response.message);
              }
             // console.error('There was an error creating the event!', error);
          });
    }
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
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>S.N.</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="right">Event Datetime</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="right">Created By</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="right">Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((item,index) => (
              <TableRow key={item.id}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell align="right">{item.eventDateTime}</TableCell>
                <TableCell align="right">{item.createdBy.firstName + " " + item.createdBy.lastName}</TableCell>
                <TableCell align="right">{item.status}</TableCell>
                <TableCell align="right">
                    {item.status === 'DRAFT' && (
                        <>
                            <Button variant="contained" color="primary" onClick={() => handleOpen(item)} sx={{ marginLeft: 1 }}>
                                Edit
                            </Button>
                            <Button variant="contained" color="error" onClick={() => handleDelete(item)} sx={{ marginLeft: 1 }}>
                                Delete
                            </Button>
                        </>
                    )}

                    <Button variant="contained" color="inherit" target="_blank" rel="noopener noreferrer"
                            component={Link} to={`/event-details/${item.id}`}>
                        View
                    </Button>
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
              name="description"
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

import React, {useCallback, useEffect, useState} from "react";
import {approveEvent, getAllEvents} from "../../services/apiService";
import {
    Box, Button,
    Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem,
    Paper, Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField,
    Typography,
    Grid
} from "@mui/material";
import {Label} from "@mui/icons-material";

const Events = () => {
    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState({
        status:'',
        date:''
    });
    const [open, setOpen] = useState(false);
    const [currentEvent, setCurrentEvent] = useState({

    });

    const fetchEvents = useCallback(() => {
        getAllEvents(filter)
            .then(response => {
                setEvents(response.data.data);
            })
            .catch(error => {
                console.error('There was an error fetching the surveys!', error);
            });
    }, [filter]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = (event = {id: null, title: '', description: '', eventDateTime: null}) => {
        setCurrentEvent(event);
        setOpen(true);
    };

    const handleApprove = () => {
        approveEvent(currentEvent.id)
            .then(() => {
                alert('event approved successfully!!');
                fetchEvents();
                handleClose();
            })
            .catch(error => {
                console.error('There was an error fetching the event!', error);
            });
    };

    const handleSearch = (evt) => {
        evt.preventDefault();
        fetchEvents();
    };

    const onValueChange=(e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Manage Events
            </Typography>

            <Typography>
                <Box component="form" >
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Event Date"
                                type="text"
                                fullWidth
                                value={filter.date}
                                name="date"
                                onChange={onValueChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl variant="outlined" fullWidth margin="dense">
                                <InputLabel id="status-label">Status</InputLabel>
                                <Select
                                    labelId="status-label"
                                    id="status"
                                    label="Status"
                                    name="status"
                                    value={filter.status}
                                    onChange={onValueChange}
                                >
                                    <MenuItem value="">All</MenuItem>
                                    <MenuItem value="DRAFT">Draft</MenuItem>
                                    <MenuItem value="PUBLISHED">Published</MenuItem>
                                    <MenuItem value="STARTED">Started</MenuItem>
                                    <MenuItem value="CLOSED">Closed</MenuItem>
                                    <MenuItem value="CANCELLED">Cancelled</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                            <Button type="submit" variant="contained"
                                    onClick={handleSearch}
                                    color="primary" fullWidth>
                                Search
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Typography>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>S.N.</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Title</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }} align="right">Description</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }} align="right">Event Date</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }} align="right">Status</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }} align="right">Created On</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }} align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events.map((item,index) => (
                            <TableRow key={item.id}>
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{item.title}</TableCell>
                                <TableCell align="right">{item.description}</TableCell>
                                <TableCell align="right">{item.eventDateTime}</TableCell>
                                <TableCell align="right">{item.status}</TableCell>
                                <TableCell align="right">{item.createdOn} ({item.createdBy.firstName + " " + item.createdBy.lastName})</TableCell>
                                <TableCell align="right">
                                    {/*<Button variant="contained" color="primary" onClick={() => handleOpen(item)}>Approve</Button>*/}
                                    {item.status === 'DRAFT' && (
                                        <Button variant="contained" color="primary" onClick={() => handleOpen(item)}>
                                            Approve
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Approve Event</DialogTitle>
                <DialogContent>
                    <p>Title : {currentEvent.title}</p>
                    <p>Description : {currentEvent.description}</p>
                    <p>Event Datetime : {currentEvent.eventDateTime}</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleApprove}>Approve</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
export default Events;
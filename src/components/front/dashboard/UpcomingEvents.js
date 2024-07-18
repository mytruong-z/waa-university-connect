import {
    Box,
    Button, Dialog, DialogActions, DialogContent, DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField,
    Typography
} from "@mui/material";
import React, {useCallback, useEffect, useState} from "react";
import {getUpcomingEvents} from "../../../services/apiService";
import {useUser} from "../../../context/UserContext";

export default function UpcomingEvents(){
    const { user } = useUser();
    const [events, setEvents] = useState([]);
    const fetchEvents = useCallback(() => {
        if (user) {
            getUpcomingEvents()
                .then(response => {
                    console.log(response.data);
                    setEvents(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the events!', error);
                });
        }
    }, [user]);

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Upcoming Events
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>S.N.</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Title</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="right">Description</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="right">Event Datetime</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="right">Created By</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events.map((item,index) => (
                            <TableRow key={item.id}>
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{item.title}</TableCell>
                                <TableCell align="right">{item.description}</TableCell>
                                <TableCell align="right">{item.eventDateTime}</TableCell>
                                <TableCell align="right">{item.createdBy.firstName + " " + item.createdBy.lastName}</TableCell>
                                <TableCell align="right">{item.status}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


        </Box>
    );
}
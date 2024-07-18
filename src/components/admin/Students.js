import React, {useCallback, useEffect, useState} from "react";
import {approveEvent, approveStudent, getAllEvents, getAllStudents} from "../../services/apiService";
import {
    Box,
    Button, Dialog, DialogActions, DialogContent, DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    MenuItem, Paper,
    Select, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow,
    TextField,
    Typography
} from "@mui/material";


const Students = () => {
    const [students, setStudents] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentStudent, setcurrentStudent] = useState({

    });

    const fetchAllStudents = useCallback(() => {
        getAllStudents()
            .then(response => {
                setStudents(response.data.data);
            })
            .catch(error => {
                console.error('There was an error fetching the students!', error);
            });
    }, [students]);

    useEffect(() => {
        fetchAllStudents();
    }, []);

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = (student) => {
        setcurrentStudent(student);
        setOpen(true);
    };

    const handleApprove = () => {
        approveStudent(currentStudent.id)
            .then(() => {
                alert('student approved successfully!!');
                fetchAllStudents();
                handleClose();
            })
            .catch(error => {
                console.error('There was an error fetching the student!', error);
            });
    };


    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Approve Student
            </Typography>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>S.N.</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }} align="right">Email</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }} align="right">Phone</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }} align="right">Created At</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }} align="right">Status</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }} align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((item,index) => (
                            <TableRow key={item.id}>
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{item.firstName + " " + item.lastName}</TableCell>
                                <TableCell align="right">{item.email}</TableCell>
                                <TableCell align="right">{item.phone}</TableCell>
                                <TableCell align="right">{item.createdAt}</TableCell>
                                <TableCell align="right">{item.status}</TableCell>
                                <TableCell align="right">
                                    {item.status === 'PENDING' && (
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
                <DialogTitle>Approve Student</DialogTitle>
                <DialogContent>
                    {/*<p>Title : {currentEvent.title}</p>*/}
                    {/*<p>Description : {currentEvent.description}</p>*/}
                    {/*<p>Event Datetime : {currentEvent.eventDateTime}</p>*/}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleApprove}>Approve</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
export default Students;
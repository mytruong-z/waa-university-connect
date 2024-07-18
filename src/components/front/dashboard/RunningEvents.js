import {useUser} from "../../../context/UserContext";
import React, {useCallback, useEffect, useState} from "react";
import {
    getLiveMessage,
    getRunningEvents,
    getUpcomingEvents,
    joinEvent,
    saveLiveMessage
} from "../../../services/apiService";
import {
    Box,
    Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField,
    Typography
} from "@mui/material";

export default function RunningEvents(){
    const { user } = useUser();
    const [events, setEvents] = useState([]);
    const [currentEvent, setCurrentEvent] = useState({});
    const [open, setOpen] = useState(false);
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [joined,setJoined]=useState({eventId:-1,isJoined:false});

    const fetchEvents = useCallback(() => {
        if (user) {
            getRunningEvents()
                .then(response => {
                    setEvents(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the events!', error);
                });
        }
    }, [user]);

    const handleJoinEvent=(currEvent)=>{
        handleOpen(currEvent);
        console.log(currEvent);
        setCurrentEvent({...currEvent});
        console.log(currentEvent);
        joinEvent(currEvent.id)
            .then(response => {
                alert(response.data.data);
            })
            .catch(error => {
                console.error('There was an error fetching the events!', error);
            });
    }

    const handleMessageSend = () => {
        const liveMessage={
            userId:user.id,
            eventId:currentEvent.id,
            message:newMessage
        }
        saveLiveMessage(liveMessage)
            .then(() => {
                fetchLiveMessages();
                setNewMessage('');
            })
            .catch(error => {
                if(error.response.message){
                    alert(error.response.message);
                }
            });
    };

    const fetchLiveMessages = useCallback(() => {
        if (user) {
            getLiveMessage(currentEvent.id)
                .then(response => {
                    setMessages(response.data.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the events!', error);
                });

        }
    }, [currentEvent]);

    const handleOpen = (event) => {
        setCurrentEvent(event);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        fetchEvents();
    }, [user]);

    useEffect(() => {
        fetchLiveMessages();
    }, [currentEvent]);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Running Events
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>S.N.</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Title</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="right">Description</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="right">Host By</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events.map((item,index) => (
                            <TableRow key={item.id}>
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{item.title}</TableCell>
                                <TableCell align="right">{item.description}</TableCell>
                                <TableCell align="right">{item.createdBy.firstName + " " + item.createdBy.lastName}</TableCell>
                                <TableCell align="right">{item.status}</TableCell>
                                <TableCell align="right">
                                    <Button variant="contained" color="error" onClick={() => handleJoinEvent(item)} sx={{ marginLeft: 1 }}>
                                        Join
                                    </Button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog variant="outlined" open={open} maxWidth="lg" fullWidth>
                <DialogTitle> Welcome to {currentEvent.title} </DialogTitle>
                <DialogContent>
                    <Card sx={{ width: '100%', maxWidth: '600px', minHeight: '600px' }}>
                        <CardContent>
                            <Typography variant="h5" component="div" gutterBottom>
                                Live Comments
                            </Typography>
                            <TextField
                                label="Type your message"
                                variant="outlined"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                fullWidth
                                multiline
                                rows={3}
                                sx={{ marginBottom: 2 }}
                            />
                            <Button variant="contained" onClick={handleMessageSend}>
                                Send Message
                            </Button>

                            <List sx={{ maxHeight: '300px', overflowY: 'auto', marginBottom: 2 }}>
                                {messages.map((msg, index) => (
                                    <ListItem key={index} alignItems="flex-start">
                                        <ListItemText
                                            primary={msg.user.firstName + " " + msg.user.lastName}
                                            secondary={<Typography component="span">{msg.message}</Typography>}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disconnect</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
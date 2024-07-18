import React, {useCallback, useEffect, useState} from "react";
import {Box, Button,TextField,Toolbar, Typography, Card, CardContent,  List, ListItem, ListItemText} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import {
    getEventAttendance,
    getEventById,
    getLiveMessage,
    startEvent,
    stopEvent,saveLiveMessage
} from "../../../services/apiService";
import {useUser} from "../../../context/UserContext";

export default function EventDetails(){
    const params=useParams();
    const [currentEvent, setCurrentEvent] = useState({id: null, title: '', description: '', eventDateTime: null, status: null, createdOn: null, publishedOn: null});
    const [participants,setParticipants] = useState([]);
    const { user } = useUser();
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const fetchEvent = useCallback(() => {
        console.log(user);
        if (user) {
            getEventById(params.id)
                .then(response => {
                    setCurrentEvent(response.data.data);
                    // alert(response.data.data.status);
                    if(response.data.data.status=='STARTED'){
                        fetchParticipants();
                        fetchLiveMessages();
                    }
                })
                .catch(error => {
                    console.error('There was an error fetching the events!', error);
                });
        }
    }, [user]);

    const startCurrentEvent=()=>{
        startEvent(currentEvent.id)
            .then(response => {
                alert("event started successfully");
                fetchEvent();
            })
            .catch(error => {
                console.error('There was an error fetching the events!', error);
            });
    }

    const stopCurrentEvent=()=>{
        stopEvent(currentEvent.id)
            .then(response => {
                alert("event stopped successfully");
                fetchEvent();
            })
            .catch(error => {
                console.error('There was an error fetching the events!', error);
            });
    }

    const fetchParticipants = useCallback(() => {
        if (user) {
            getEventAttendance(params.id)
                .then(response => {
                    setParticipants(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the events!', error);
                });

        }
    }, [user]);

    const fetchLiveMessages = useCallback(() => {
        if (user) {
            getLiveMessage(params.id)
                .then(response => {
                    setMessages(response.data.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the events!', error);
                });

        }
    }, [user]);

    const handleMessageSend = () => {
        const liveMessage={
            userId:user.id,
            eventId:params.id,
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

    useEffect(() => {
        fetchEvent();
    }, [params.id]);


    return(
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Event Details
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'left', marginTop: 2 }}>
                {/* Main Event Card */}
                <Card sx={{ maxWidth: 500 }}>
                    <CardContent>
                        <Typography variant="h5" component="div" gutterBottom>
                            {currentEvent.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                            {currentEvent.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {currentEvent.eventDateTime}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {currentEvent.status}
                        </Typography>

                        {/* Start/Stop Event Button */}
                        {currentEvent.status === 'STARTED' && (
                            <Button variant="contained" color="error" onClick={stopCurrentEvent} sx={{ marginTop: 3 }}>
                                Stop
                            </Button>
                        )}
                        {currentEvent.status === 'PUBLISHED' && (
                            <Button variant="contained" color="error" onClick={startCurrentEvent} sx={{ marginTop: 3 }}>
                                Start
                            </Button>
                        )}
                    </CardContent>
                </Card>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'left', marginTop: 3 }}>
                {/* Participants Card */}
                {currentEvent.status === 'STARTED' && (
                    <Card sx={{ maxWidth: 500 }}>
                        <CardContent>
                            <Typography variant="h5" component="div" gutterBottom>
                                Participants
                            </Typography>
                            <List>
                                {participants.map((participant, index) => (
                                    <ListItem key={participant.id}>
                                        <ListItemText primary={`${index + 1}. ${participant.firstName + " " + participant.lastName} `} />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                )}

                {/* Live Comments Card */}
                {currentEvent.status === 'STARTED' && (
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
                )}
            </Box>

        </Box>

    )
}
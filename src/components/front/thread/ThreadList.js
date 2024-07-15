import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllThreads } from '../../../services/apiService';

const ThreadList = () => {
  const [threads, setThreads] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllThreads()
      .then(response => {
        setThreads(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the threads!', error);
      });
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/threads/${id}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Threads
      </Typography>
      {threads.map((thread) => (
        <Card key={thread.id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h5">{thread.title}</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {thread.discussionCategory.name} - {thread.createdBy.username} - {new Date(thread.createdAt).toLocaleString()}
            </Typography>
            <Button variant="contained" color="primary" onClick={() => handleViewDetails(thread.id)} sx={{ marginTop: 2 }}>
              View Details
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ThreadList;

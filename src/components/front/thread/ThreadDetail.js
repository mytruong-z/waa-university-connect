import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getThreadById, getPostsByThreadId, createPost } from '../../../services/apiService';

const ThreadDetail = () => {
  const { threadId } = useParams();
  const [thread, setThread] = useState({
    title: '',
    discussionCategory: { name: '' },
    createdBy: { username: '' },
    createdAt: ''
  });
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getThreadById(threadId)
      .then(response => {
        setThread(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the thread details!', error);
      });

    getPostsByThreadId(threadId)
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the posts!', error);
      });
  }, [threadId]);

  const handlePostComment = () => {
    const newPost = {
      threadId: parseInt(threadId),
      content: comment,
      createdBy: { id: 1, username: 'current_user' }, // Replace with actual user data
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    createPost(newPost)
      .then(() => {
        setComment('');
        getPostsByThreadId(threadId)
          .then(response => {
            setPosts(response.data);
          })
          .catch(error => {
            console.error('There was an error fetching the posts!', error);
          });
      })
      .catch(error => {
        console.error('There was an error posting the comment!', error);
      });
  };

  if (!thread) return null;

  return (
    <Box sx={{ p: 3 }}>
      <Button variant="contained" color="inherit" onClick={() => navigate('/threads')} sx={{ marginBottom: 2 }}>
        Back
      </Button>
      <Typography variant="h4" gutterBottom>
        {thread.title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {thread.discussionCategory.name} - {thread.createdBy.username} - {new Date(thread.createdAt).toLocaleString()}
      </Typography>
      <Card sx={{ marginTop: 2, marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h6">Comments</Typography>
          {posts.map((post) => (
            <Box key={post.id} sx={{ marginBottom: 2 }}>
              <Typography variant="body1">{post.content}</Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {post.createdBy.username} - {new Date(post.createdAt).toLocaleString()}
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>
      <TextField
        label="Add a comment"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handlePostComment}>
        Post Comment
      </Button>
    </Box>
  );
};

export default ThreadDetail;

import React, { useEffect, useState, useCallback } from 'react';
import { Box, Toolbar, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getPostsByThreadId, deletePost, updatePost } from '../../services/apiService';

const Posts = () => {
  const { threadId } = useParams();
  const [posts, setPosts] = useState([]);

  const fetchPosts = useCallback(() => {
    getPostsByThreadId(threadId)
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the posts!', error);
      });
  }, [threadId]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleApprove = (id) => {
    const post = posts.find(p => p.id === id);
    if (post) {
      const updatedPost = { ...post, status: 'APPROVED' };
      updatePost(id, updatedPost)
        .then(() => {
          fetchPosts();
        })
        .catch(error => {
          console.error('There was an error approving the post!', error);
        });
    }
  };

  const handleDelete = (id) => {
    deletePost(id)
      .then(() => {
        fetchPosts();
      })
      .catch(error => {
        console.error('There was an error deleting the post!', error);
      });
  };

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: '#e3f2fd', p: 3 }}
    >
      <Toolbar />
      <Typography variant="h4" gutterBottom>
        Posts for Thread ID: {threadId}
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Post ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Content</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Created By</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Created At</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow
                key={post.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {post.id}
                </TableCell>
                <TableCell align="right">{post.content}</TableCell>
                <TableCell align="right">{post.status}</TableCell>
                <TableCell align="right">{post.createdBy.username}</TableCell>
                <TableCell align="right">{new Date(post.createdAt).toLocaleString()}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="primary" onClick={() => handleApprove(post.id)} sx={{ marginRight: 1 }}>Approve</Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(post.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Posts;

import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api/v1';


// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem('token');
    console.log('Token: ', token);
    if (token) {
      req.headers['Authorization'] = `Bearer ${token}`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Threads
export const getAllThreads = () => api.get('/threads');
export const getAllThreadsByUser = (userId) => api.get(`/threads?createdBy=${userId}`);
export const getThreadById = (id) => api.get(`/threads/${id}`);
export const createThread = (thread) => api.post('/threads', thread);
export const updateThread = (id, thread) => api.put(`/threads/${id}`, thread);
export const deleteThread = (id) => api.delete(`/threads/${id}`);

// Posts
export const getAllPosts = () => api.get('/posts');
export const getPostsByThreadId = (threadId) => api.get(`/posts?threadId=${threadId}`);
export const getPostById = (id) => api.get(`/posts/${id}`);
export const createPost = (post) => api.post('/posts', post);
export const updatePost = (id, post) => api.put(`/posts/${id}`, post);
export const deletePost = (id) => api.delete(`/posts/${id}`);

// Discussion Categories
export const getAllDiscussionCategories = () => api.get('/discussionCategories');

// Users
export const getAllUsers = () => api.get('/users');
export const getUserById = (id) => api.get(`/users/${id}`);
export const createUser = (user) => api.post('/users', user);
export const updateUser = (id, user) => api.put(`/users/${id}`, user);
export const deleteUser = (id) => api.delete(`/users/${id}`);

// Surveys
export const getAllSurveysByUser = (userId) => api.get(`/surveys?creator_id=${userId}`);
export const getAllSurveys = (userId) => api.get(`/surveys?`);
export const getSurveyById = (id) => api.get(`/surveys/${id}`);
export const createSurvey = (survey) => api.post('/surveys', survey);
export const updateSurvey = (id, survey) => api.put(`/surveys/${id}`, survey);
export const deleteSurvey = (id) => api.delete(`/surveys/${id}`);

// Login
export const loginToServer = (user) => api.post('auth/login', user);

// Resources
export const getAllResourcesFromServer = () => api.get('/resources');
export const getResourceByIdFromServer = (id) => api.get(`/resources/${id}`);
export const createResourceToServer = (resource) => api.post('/resources', resource);
export const updateResourceToServer = (id, resource) => api.put(`/resources/${id}`, resource);
export const deleteResourceToServer = (id) => api.delete(`/resources/${id}`);

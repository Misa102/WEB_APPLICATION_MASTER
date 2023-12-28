import axios from 'axios';

//const URL = 'http://localhost:5000';

// creer api fetchPosts
export const fetchPosts = () => axios.get('http://localhost:5000/posts');

// api pour creer une citation
export const createPost = (payload) => axios.post('http://localhost:5000/posts', payload);

export const updatePost = (payload) => axios.post('http://localhost:5000/posts/update', payload);

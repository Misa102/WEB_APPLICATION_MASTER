import axios from 'axios';
import { API_URL } from "../constant";
import authHeader from '../utils/auth.util';

// creer api fetchPosts
export const fetchPosts = () => axios.get(`${API_URL}/posts`);

// api pour creer une citation
export const createPost = (payload) => axios.post(`${API_URL}/posts`, payload, { headers: authHeader() });

export const updatePost = (payload) => axios.post(`${API_URL}/posts/update`, payload);
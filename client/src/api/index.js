import axios from 'axios';
import { API_URL } from "../constant";

// creer api fetchPosts
export const fetchPosts = () => axios.get(`${API_URL}/posts`);

// api pour creer une citation
export const createPost = (payload) => axios.post(`${API_URL}/posts`, payload);

export const updatePost = (payload) => axios.post(`${API_URL}/posts/update`, payload);

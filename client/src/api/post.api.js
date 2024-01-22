import axios from "axios";
import { API_URL } from "../constant";
import authUtils from "../utils/auth.util";

const headers = authUtils.authHeader();

export const fetchPosts = () => axios.get(`${API_URL}/posts?userId=${authUtils.getUser()?.id || ""}`);

export const createPost = (payload) =>
    axios.post(`${API_URL}/posts`, payload, { headers: headers});

export const updatePost = (payload) =>
    axios.post(`${API_URL}/posts/update`, payload, { headers: headers});

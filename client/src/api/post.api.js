import axios from "axios";
import { API_URL } from "../constant";
import authUtils from "../utils/auth.util";

const headers = authUtils.authHeader();

export const fetchPosts = (payload) =>
    axios.get(
        `${API_URL}/posts?userId=${authUtils.getUser()?.id || ""}&searchValue=${
            payload.searchValue
        }`
    );

export const createPost = (payload) =>
    axios.post(`${API_URL}/posts`, payload, { headers: headers });

export const updatePost = (payload) =>
    axios.put(`${API_URL}/posts`, payload, { headers: headers });

export const deletePost = (payload) =>
    axios.delete(`${API_URL}/posts`, { data: payload, headers: headers });

export const getDetailPost = (payload) =>
    axios.get(`${API_URL}/posts/${payload}`);

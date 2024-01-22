import axios from "axios";
import { API_URL } from "../constant";
import authUtils from "../utils/auth.util";

const headers = authUtils.authHeader();

export const savePostLike = (payload) =>
    axios.post(`${API_URL}/post-like`, payload, { headers: headers});

export const deletePostLike = (payload) =>
    axios.delete(`${API_URL}/post-like`, { data: payload, headers: headers });
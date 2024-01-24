import axios from "axios";
import { API_URL } from "../constant";
import authUtils from "../utils/auth.util";

const headers = authUtils.authHeader();

export const getAllUsers = () =>
    axios.get(`${API_URL}/admin/users`, { headers: headers });

export const updateStatusUser = (payload) =>
    axios.put(`${API_URL}/admin/users`, payload, { headers: headers });

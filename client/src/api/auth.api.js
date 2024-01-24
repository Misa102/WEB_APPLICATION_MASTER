import axios from 'axios';
import { API_URL } from "../constant";


export const login = (payload) => axios.post(`${API_URL}/auth/login`, payload);

export const register = (payload) => axios.post(`${API_URL}/auth/signup`, payload);
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getUsersService = (endpoint) => {
    return axios.get(`${API_URL}/${endpoint}`);
};

export const getUserService = (endpoint) => {
    return axios.get(`${API_URL}/${endpoint}`);
};

export const saveUserService = (endpoint, data) => {
    return axios.post(`${API_URL}/${endpoint}`, data);
};

export const updateUserService = (endpoint, data) => {
    return axios.put(`${API_URL}/${endpoint}`, data);
};

export const deleteUserService = (endpoint) => {
    return axios.delete(`${API_URL}/${endpoint}`);
};
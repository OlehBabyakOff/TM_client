import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const postAuth = (endpoint, data) => {
    return axios.post(`${API_URL}/${endpoint}`, data);
};
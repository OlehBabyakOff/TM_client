import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const postAuth = async (endpoint, data) => {
    return await axios.post(`${API_URL}/${endpoint}`, data);
};
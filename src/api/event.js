import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getEventsService = (endpoint) => {
  return axios.get(`${API_URL}/${endpoint}`);
};

export const addEventService = (endpoint, data) => {
  return axios.post(`${API_URL}/${endpoint}`, data);
};
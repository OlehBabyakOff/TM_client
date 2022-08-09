import {api, API_URL} from "@/api/index";

export const getEventsService = (endpoint) => {
  return api.get(`${API_URL}/${endpoint}`);
};

export const addEventService = (endpoint, data) => {
  return api.post(`${API_URL}/${endpoint}`, data);
};

export const deleteEventService = (endpoint) => {
  return api.delete(`${API_URL}/${endpoint}`);
};
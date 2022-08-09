import {api, API_URL} from "@/api/index";

export const getUsersService = (endpoint) => {
    return api.get(`${API_URL}/${endpoint}`);
};

export const getUserService = (endpoint) => {
    return api.get(`${API_URL}/${endpoint}`);
};

export const saveUserService = (endpoint, data) => {
    return api.post(`${API_URL}/${endpoint}`, data);
};

export const updateUserService = (endpoint, data) => {
    return api.put(`${API_URL}/${endpoint}`, data);
};

export const deleteUserService = (endpoint) => {
    return api.delete(`${API_URL}/${endpoint}`);
};
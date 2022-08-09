import {api, API_URL} from "@/api/index";

export const postAuth = async (endpoint, data) => {
    return api.post(`${API_URL}/${endpoint}`, data);
};

export const refreshService = async (endpoint) => {
    return api.get(`${API_URL}/${endpoint}`, {withCredentials: true});
};
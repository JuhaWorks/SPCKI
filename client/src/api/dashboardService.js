import { apiClient } from './axios.js';

export const dashboardService = {
  getSessions: async (filters = {}) => {
    const { data } = await apiClient.get('/dashboard/sessions', { params: filters });
    return data;
  },

  getSolar: async (filters = {}) => {
    const { data } = await apiClient.get('/dashboard/solar', { params: filters });
    return data;
  },

  getUtilisation: async (filters = {}) => {
    const { data } = await apiClient.get('/dashboard/utilisation', { params: filters });
    return data;
  },

  getHouseholds: async (filters = {}) => {
    const { data } = await apiClient.get('/dashboard/households', { params: filters });
    return data;
  },

  getTechnical: async (filters = {}) => {
    const { data } = await apiClient.get('/dashboard/technical', { params: filters });
    return data;
  },

  getFeedback: async (filters = {}) => {
    const { data } = await apiClient.get('/dashboard/feedback', { params: filters });
    return data;
  },
};

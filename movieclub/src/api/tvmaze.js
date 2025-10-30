import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.tvmaze.com'
});

export const searchShows = (query) => {
  return api.get(`/search/shows?q=${query}`);
};

export const getShowDetails = (id) => {
  return api.get(`/shows/${id}`);
};

export const getShowEpisodes = (id) => {
  return api.get(`/shows/${id}/episodes`);
};
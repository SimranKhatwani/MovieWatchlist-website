import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_KEY;



const tmdb = axios.create({
    baseURL : "https://api.themoviedb.org/3"
});

tmdb.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params.api_key = import.meta.env.VITE_TMDB_KEY; 
  return config;
});

export default tmdb;

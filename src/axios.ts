import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://webdeveloperblog.herokuapp.com',
});

instance.interceptors.request.use((config: any) => {
  config.headers.authorization = window.localStorage.getItem('token');
  return config;
});

export default instance;

import axios from 'axios';

const request = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

// request.defaults.headers.common['Access-Control-Allow-Origin'] = "http://localhost:3000";


export default request;
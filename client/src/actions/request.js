import axios from 'axios';
import { SERVER_URL, SERVER_PORT } from '../config'

const request = axios.create({
  baseURL: `${SERVER_URL}:${SERVER_PORT}`,
  withCredentials: true,
});

// request.defaults.headers.common['Access-Control-Allow-Origin'] = "http://localhost:3000";


export default request;
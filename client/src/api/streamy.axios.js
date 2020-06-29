import axios from "axios";

const REACT_APP_API_HOST_URL = process.env.REACT_APP_API_HOST_URL; //`http://localhost:3001`;
console.log(`[info]<streamy.xios.js> - REACT_APP_API_HOST_URL: ${REACT_APP_API_HOST_URL}`);

export default axios.create({
  baseURL: REACT_APP_API_HOST_URL
});
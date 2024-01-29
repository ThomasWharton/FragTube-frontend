import axios from "axios";

axios.defaults.baseURL = "https://frag-tube-0da3a5b7d9cc.herokuapp.com/";
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
import axios from "axios";
import { baseApiURL } from "./servicesURL";
const instance = axios.create({
  // baseURL: "https://ig-clone-backend.herokuapp.com/api"
  // baseURL: "http://localhost:3001/api"
  baseURL: baseApiURL,
});

export default instance;

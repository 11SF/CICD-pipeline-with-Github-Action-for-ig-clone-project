import axios from "axios";

const instance = axios.create({

  // baseURL: "https://ig-clone-backend.herokuapp.com/api"
  // baseURL: "http://localhost:3001/api"
  baseURL: `${window.location.protocol}//${window.location.hostname}:3001/api`
});

export default instance;
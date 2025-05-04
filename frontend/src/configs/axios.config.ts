import axios from "axios";
import { getInfoFromLocalStorage } from "../helpers/localstorage.helper";

export const axiosConfig = axios.create({
  baseURL: process.env.SERVER_URL || "http://localhost:3000/",
  headers: {
    Authorization: `Bearer ` + getInfoFromLocalStorage("token"),
  },
});

axiosConfig.interceptors.request.use((config: any) => {
  const token = getInfoFromLocalStorage("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export const axiosFormDataConfig = axios.create({
  baseURL: process.env.SERVER_URL || "http://localhost:3000/",
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ` + getInfoFromLocalStorage("token"),
  },
});

export const axiosGetPhotoConfig = axios.create({
  baseURL: process.env.SERVER_URL || "http://localhost:3000/",
  method: "GET",
  responseType: "blob", // important
});

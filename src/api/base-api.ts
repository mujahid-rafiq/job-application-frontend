import axios from "axios";
import { config } from "../config";

export const baseApi = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

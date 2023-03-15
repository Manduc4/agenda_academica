import axios from "axios";
import { Environment } from "../../../environment";
import { errorInterceptor, responseInterceptor } from "./interceptors";

const PRODUCTION_BASE_URL = 'https://agenda-academica-api.up.railway.app'
const LOCAL_BASE_URL = 'https://localhost:3000'

const Api = axios.create({
  // baseURL: Environment.URL_BASE,
  baseURL: PRODUCTION_BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error)
);

export { Api };

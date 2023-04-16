import Axios from "axios";
import { baseURL } from "./utils/APIRoute";

export const axios = Axios.create({
  baseURL: baseURL,
});

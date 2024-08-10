import axios from "axios";
import { API_HOST } from "../Constant";

export const getHostedZoneList = async (params) => {
  try {
    const apiUrl = API_HOST + "listHostedZones";
    const response = await axios.get(apiUrl, params);
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

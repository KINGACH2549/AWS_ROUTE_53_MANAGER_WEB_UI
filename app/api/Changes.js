import axios from "axios";
import { API_HOST } from "../Constant";

export const getChanges = async (changeId) => {
  try {
    const apiUrl = API_HOST + "getHostedZoneChange";

    const response = await axios.get(apiUrl, { params: changeId });
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e);
    return e.response?.data || "Something went wrong, Please try again later";
  }
};

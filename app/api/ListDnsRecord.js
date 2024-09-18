"use client";
import axios from "axios";
import { API_HOST } from "../Constant";

export const listResourceRecordSets = async (zoneID, filters) => {
  try {
    const apiUrl = API_HOST + "listResourceRecordSet";
    const params = { HostedZoneId: zoneID };
    const response = await axios.get(apiUrl, {
      params: params,
      headers: { Authorization: "Api-Key " + localStorage.getItem("API_KEYS") },
    });
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

"use client";
import axios from "axios";
import { API_HOST } from "../Constant";

export const listResourceRecordSets = async (zoneID) => {
  try {
    const apiUrl = API_HOST + "listResourceRecordSet";
    const response = await axios.get(apiUrl, {
      params: { HostedZoneId: zoneID },
      headers: { Authorization: "Api-Key " + localStorage.getItem("API_KEYS") },
    });
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

"use client";
import axios from "axios";
import { API_HOST } from "../Constant";

export const getHostedZoneList = async (params) => {
  const apiUrl = API_HOST + "listHostedZones";
  const response = await axios.get(apiUrl, {
    params: params,
    headers: { Authorization: "Api-Key " + localStorage.getItem("API_KEYS") },
  });
  console.log(response);
  return response.data;
};

export const getHostedZoneById = async (zoneId) => {
  try {
    const apiUrl = API_HOST + "getHostedZone";
    const response = await axios.get(apiUrl, {
      params: { Id: zoneId },
      headers: { Authorization: "Api-Key " + localStorage.getItem("API_KEYS") },
    });
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

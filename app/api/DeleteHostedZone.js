"use client";
import axios from "axios";
import { API_HOST } from "../Constant";

export const deleteHostedZoneById = async (zoneID) => {
  try {
    const response = await axios.delete(API_HOST + "deleteHostedZone", {
      params: { Id: zoneID },
      headers: { Authorization: "Api-Key " + localStorage.getItem("API_KEYS") },
    });
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

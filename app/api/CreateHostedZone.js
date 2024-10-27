"use client";
import axios from "axios";
import { API_HOST } from "../Constant";

export const createHostedZone = async (requestBody) => {
  const apiUrl = API_HOST + "createHostedZone";
  const response = await axios.post(apiUrl, requestBody, {
    headers: {
      Authorization: "Api-Key " + localStorage.getItem("API_KEYS"),
    },
  });
  return response.data;
};

"use client";
import axios from "axios";
import { API_HOST } from "../Constant";

export const createHostedZone = async (requestBody) => {
  try {
    const apiUrl = API_HOST + "createHostedZone";
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        Authorization: "Api-Key " + localStorage.getItem("API_KEYS"),
      },
    });
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

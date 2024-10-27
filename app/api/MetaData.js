"use client";
import axios from "axios";
import { API_HOST } from "../Constant";

export const getAllRecordTypes = async () => {
  try {
    const apiUrl = API_HOST + "getAllRecordTypes";
    const response = await axios.get(apiUrl, {
      headers: { Authorization: "Api-Key " + localStorage.getItem("API_KEYS") },
    });
    return response.data;
  } catch (e) {}
};

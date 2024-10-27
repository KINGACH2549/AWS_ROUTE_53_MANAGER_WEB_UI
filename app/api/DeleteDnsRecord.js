"use client";

import { API_HOST } from "../Constant";
import axios from "axios";
export const deleteDnsRecord = async (changeResourceRequest, zoneID) => {
  const requestBody = {
    ChangeBatch: {
      Changes: [
        {
          Action: "DELETE",
          ResourceRecordSet: changeResourceRequest,
        },
      ],
    },
    HostedZoneId: zoneID,
  };
  const apiUrl = API_HOST + "changeResourceRecordSets";
  const response = await axios.post(apiUrl, requestBody, {
    headers: {
      Authorization: "Api-Key " + localStorage.getItem("API_KEYS"),
    },
  });
  return response.data;
};

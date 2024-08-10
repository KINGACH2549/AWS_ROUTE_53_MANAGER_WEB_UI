"use client";
import { getChanges } from "../../api/Changes";

const setTimeOutWithPromise = (callBack, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const data = await callBack();
      resolve(data);
    }, delay);
  });
};

export const notificationHandler = async (notificationsQueue) => {
  if (notificationsQueue.current.length > 0) {
    let element = notificationsQueue.current.shift();
    const HostedZoneName = element.data?.HostedZone?.Name;
    console.log(HostedZoneName);
    while (
      (element?.statusCode === 200 || element?.statusCode === 201) &&
      element?.data?.ChangeInfo?.Status.includes("PENDING")
    ) {
      const response = await setTimeOutWithPromise(async () => {
        const data = await getChanges({
          Id: element.data.ChangeInfo.Id.replace("/change/", ""),
        });
        return data;
      }, 20000);
      console.log(response);
      element = response;
    }
    return {
      Status: element.data.ChangeInfo.Status,
      HostedZoneName: HostedZoneName,
    };
  }
  return null;
};

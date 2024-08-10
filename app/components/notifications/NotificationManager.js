"use client";

import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { IoNotifications } from "react-icons/io5";
import { useToast } from "@/components/ui/use-toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { notificationHandler } from "./NotificationHandler";
import { Button } from "@/components/ui/button";

const tags = Array.from({ length: 5 }).map(() => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardDescription>
            Request Type Related to hosted Zone operation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Status of Zone</p>
        </CardContent>
      </Card>
    </>
  );
});

export function ScrollAreaDemo(notificationData, handleNotifications) {
  console.log(notificationData, "manager");
  const notifications = notificationData.map((data) => {
    return (
      <>
        <Card>
          <CardHeader>
            <CardDescription>Hosted Zone Activity</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{"Zone " + data.HostedZoneName + " Status - " + data.Status}</p>
          </CardContent>
        </Card>
      </>
    );
  });
  return (
    <div
      className=" bg-white absolute top-[50px] right-[80px]"
      // onClick={(e) => e.stopPropagation()}
    >
      <ScrollArea className="h-72 w-90 rounded-md border">
        <div className="p-4">
          {notifications.length > 0 ? (
            notifications.map(
              (
                tag // render notification
              ) => (
                <>
                  <div key={tag} className="text-sm">
                    {tag}
                  </div>
                  <Separator className="my-2" />
                </>
              )
            )
          ) : (
            <div className="text-sm">You are all Good!!</div>
          )}
          {notifications.length > 0 && (
            <div className="flex items-center justify-center">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleNotifications([]);
                }}
              >
                Mark all as Read
              </Button>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

export default function NotifcationManager(props) {
  const { toast } = useToast();
  // const setTimeOutWithPromise = (callBack, delay) => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(async () => {
  //       const data = await callBack();
  //       resolve(data);
  //     }, delay);
  //   });
  // };

  // const notificationHandler = async (notificationsQueue) => {
  //   if (notificationsQueue.current.length > 0) {
  //     let element = notificationsQueue.current.shift();
  //     // const HostedZoneName = element.data.HostedZoneName;
  //     // console.log(HostedZoneName);
  //     while (
  //       (element?.statusCode === 200 || element?.statusCode === 201) &&
  //       element?.data?.ChangeInfo?.Status.includes("PENDING")
  //     ) {
  //       console.log("Waiting for 20 seconds!");
  //       const response = await setTimeOutWithPromise(async () => {
  //         const data = await getChanges({
  //           Id: element.data.ChangeInfo.Id.replace("/change/", ""),
  //         });
  //         return data;
  //       }, 20000);
  //       console.log(response);
  //       element = response;
  //     }

  //     console.log(element, "activity completed");
  //   }
  // };

  const { notificationsQueue } = props;
  const [showScrollAreaNotification, setScrollAreaNotification] =
    React.useState(false);

  const [notificationData, setNotificationData] = React.useState([]);

  const handleNotifications = (data) => {
    console.log("delete notifications");
    setNotificationData(data);
  };
  const handleNotificationData = (data) => {
    // Let's say i have less than 10 things than then include it in array
    // if array size ==10 then remove the oldest notification and push latest and save array
    // Create a new array with the current notifications

    console.log(notificationData, "handle1");
    let newNotificationData = [...notificationData];

    // If the array size is 10, remove the oldest notification
    if (newNotificationData.length === 10) {
      newNotificationData.shift();
    }

    // Add the latest notification
    newNotificationData.push(data);

    console.log(newNotificationData, "handlemanager");

    // Update the state with the new array
    setNotificationData(newNotificationData);
  };
  React.useEffect(() => {
    // Add the event listener
    const handleBodyClick = () => {
      setScrollAreaNotification(false);
    };
    document.body.addEventListener("click", handleBodyClick);

    const intervalId = setInterval(() => {
      console.log(notificationsQueue, "inside notification");
      notificationHandler(notificationsQueue).then((data) => {
        if (data) {
          toast({
            title: "Hosted Zone Activity",
            description:
              "Zone " + data.HostedZoneName + " Status - " + data.Status,
          });
          handleNotificationData(data);
        }
      });
    }, 10000); // Every 10 seconds
    // Clean up the event listener on component unmount
    return () => {
      document.body.removeEventListener("click", handleBodyClick);
      clearInterval(intervalId);
    };
  }, [notificationData]);

  return (
    <>
      <IoNotifications
        className="w-32 h-[1.8rem] cursor-pointer"
        onClick={() => {
          setScrollAreaNotification(true);
        }}
      />
      {showScrollAreaNotification &&
        ScrollAreaDemo(notificationData, handleNotifications)}
    </>
  );
}

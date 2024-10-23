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
import { useNotificationQueue } from "@/app/custom-hooks";

export function ScrollAreaDemo({ notificationData, handleNotifications }) {
  console.log(notificationData, "manager");
  const notifications = notificationData.map((data) => {
    return (
      <>
        <Card>
          <CardHeader>
            <CardDescription>{data.title}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{data.message}</p>
          </CardContent>
        </Card>
      </>
    );
  });
  return (
    <div
      // className=" bg-gray-100 absolute top-[50px] right-[80px]"
      // className=" bg-gray-100"
      className="absolute top-[35px] left-[1px] right-0 bg-white w-80 z-50 shadow-lg rounded-md"
      onClick={(e) => e.stopPropagation()}
    >
      <ScrollArea className="h-72 w-full rounded-md border">
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
            <div className="flex flex-col justify-center">
              <p className="text-md text-center">You are all Catched Up</p>
            </div>
          )}
          {notifications.length > 0 && (
            <div className="flex items-center justify-center">
              <Button
                onClick={(e) => {
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
  const notificationsQueue = useNotificationQueue();
  // const { notificationsQueue } = props;
  const [showScrollAreaNotification, setScrollAreaNotification] =
    React.useState(false);

  const [notificationData, setNotificationData] = React.useState([]);

  const handleNotifications = (data) => {
    console.log("delete notifications");
    setNotificationData(data);
  };
  const handleNotificationData = (data) => {
    // // Let's say i have less than 10 things than then include it in array
    // // if array size ==10 then remove the oldest notification and push latest and save array
    // // Create a new array with the current notifications

    // console.log(notificationData, "handle1");
    // let newNotificationData = [...notificationData];

    // // If the array size is 10, remove the oldest notification
    // if (newNotificationData.length === 10) {
    //   newNotificationData.shift();
    // }

    // // Add the latest notification
    // newNotificationData.push(data);

    // console.log(newNotificationData, "handlemanager");

    // // Update the state with the new array
    // setNotificationData(newNotificationData);

    setNotificationData((prevNotificationData) => {
      let newNotificationData = [...prevNotificationData];

      if (newNotificationData.length === 10) {
        newNotificationData.shift();
      }

      newNotificationData.push(data);

      console.log(newNotificationData, "handlemanager");
      return newNotificationData;
    });
  };

  React.useEffect(() => {
    // Add the event listener
    const handleBodyClick = () => {
      setScrollAreaNotification(false);
    };
    // document.body.addEventListener("click", handleBodyClick);
    window.addEventListener("click", handleBodyClick);

    const intervalId = setInterval(() => {
      console.log(notificationsQueue, "inside notification");
      notificationHandler(notificationsQueue).then((data) => {
        if (data) {
          toast({
            title: data.title,
            description: data.message,
          });
          handleNotificationData(data);
        }
      });
    }, 10000); // Every 10 second
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("click", handleBodyClick);
      clearInterval(intervalId);
    };
  }, [notificationData]);

  return (
    <>
      <div className="relative">
        <IoNotifications
          className="w-32 h-[1.8rem] cursor-pointer"
          style={{
            color: "rgb(17 24 39 / 90%)",
          }}
          onClick={(e) => {
            e.stopPropagation(); // Prevent closing when clicking the icon
            setScrollAreaNotification(true);
          }}
        />
        {showScrollAreaNotification && (
          <ScrollAreaDemo
            notificationData={notificationData}
            handleNotifications={handleNotifications}
          />
        )}
      </div>
    </>
  );
}

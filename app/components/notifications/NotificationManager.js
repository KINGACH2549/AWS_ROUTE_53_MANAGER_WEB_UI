"use client";

import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { IoNotifications } from "react-icons/io5";
import { useToast } from "@/components/ui/use-toast";
import { CheckCheck } from "lucide-react";
import { Ellipsis } from "lucide-react";
import { CircleCheckBig } from "lucide-react";

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
import { PartyPopper } from "lucide-react";

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
      className="absolute top-[35px]  right-0 bg-white h-auto w-80 z-50 shadow-lg rounded-md border"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-1 pt-0 pb-0 flex justify-between items-center">
        <Ellipsis strokeWidth={0.5} height={50} width={60} />
        {notifications.length > 0 && (
          <CircleCheckBig
            className="hover:cursor-pointer"
            strokeWidth={0.5}
            height={30}
            width={50}
            onClick={(e) => {
              handleNotifications([]);
            }}
          />
        )}
      </div>
      <Separator className="my-1" />
      {notifications.length > 0 ? (
        <ScrollArea className="relative h-96 w-full rounded-md">
          <div className="p-4">
            {notifications.map(
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
            )}

            {/* <div className="p-2 w-full bg-white absolute bottom-[0] z-25 flex items-center justify-center text-sm">
              <Button
                onClick={(e) => {
                  handleNotifications([]);
                }}
              >
                Mark all as Read
              </Button>
            </div> */}
          </div>
        </ScrollArea>
      ) : (
        <div className="h-96 flex flex-col justify-center gap-4">
          <p className="text-md text-center text-gray-800">
            You are all Catched Up
          </p>
          <div className="flex justify-center">
            <PartyPopper
              size={48}
              color="rgb(83 181 85/ 84%)"
              strokeWidth={1}
            />
          </div>
        </div>
      )}
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

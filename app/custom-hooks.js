"use client";
import { useContext, createContext } from "react";
export const NotificationContext = createContext(null);
export const ErrorContext = createContext(null);
export const KeyManagementContext = createContext(null);

export const useNotificationQueue = () => {
  return useContext(NotificationContext);
};

export const useErrorNotification = () => {
  return useContext(ErrorContext);
};

export const useKeyManagementContext = () => {
  return useContext(KeyManagementContext);
};

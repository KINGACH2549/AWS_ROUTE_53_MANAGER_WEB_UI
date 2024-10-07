import { NotificationContext } from "./custom-hooks";

export default function CommonQueue({ notificationQueue, children }) {
  return (
    <NotificationContext.Provider value={notificationQueue}>
      {children}
    </NotificationContext.Provider>
  );
}

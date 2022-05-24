import { createContext, useCallback, useEffect, useState } from "react";
interface NotificationItem {
  message: string;
  status: string;
}
interface INotificationContext {
  notification: NotificationItem | null; // { title, message, status }
  showNotification: (notificationData: NotificationItem) => void;
  hideNotification: () => void;
}
const NotificationContext = createContext<INotificationContext>({
  notification: null, // { title, message, status }
  showNotification: function (notificationData: NotificationItem) {},
  hideNotification: function () {},
});

export function NotificationContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeNotification, setActiveNotification] =
    useState<NotificationItem | null>(null);

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  const showNotificationHandler = useCallback(
    (notificationData: NotificationItem) => {
      setActiveNotification(notificationData);
    },
    []
  );

  const hideNotificationHandler = useCallback(() => {
    setActiveNotification(null);
  }, []);

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;

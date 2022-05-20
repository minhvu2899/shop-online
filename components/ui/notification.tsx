import React, { useContext } from "react";

import styles from "./notification.module.css";
import NotificationContext from "../../store/notification-context";
import Image from "next/image";

function Notification(props: { message: string; status: string }) {
  const notificationCtx = useContext(NotificationContext);

  const { message, status } = props;

  let statusClasses = "";
  let icon: React.ReactNode;
  if (status === "success") {
    statusClasses = styles.success;
    icon = (
      <Image src="/icons/success.svg" width="30" height="30" alt="success" />
    );
  }

  if (status === "error") {
    statusClasses = styles.error;
    icon = (
      <Image src="/icons/error.svg" width="30" height="30" alt="success" />
    );
  }

  if (status === "pending") {
    statusClasses = styles.pending;
    icon = <Image src="/icons/info.svg" width="30" height="30" alt="success" />;
  }

  const activeClasses = `${styles.notification} ${styles.active} ${statusClasses}`;

  return (
    <div
      className={styles.notification__container}
      onClick={notificationCtx.hideNotification}
    >
      <div className={activeClasses}>
        <div className={styles.notification__icon}>{icon}</div>
        <p>{message}</p>
        <div
          className={styles.notification__remove}
          onClick={notificationCtx.hideNotification}
        >
          <span>X</span>
        </div>
      </div>
    </div>
  );
}

export default Notification;

import { format } from "@formkit/tempo";
import styles from "./time.module.css";

import { IoTime } from "react-icons/io5";

const FormatDate = ({ dateString }: { dateString: string }) => {
  // Parse the date string into a Date object
  const date = new Date(dateString);

  // Get the current date and time
  const now = new Date();

  // Calculate the difference in milliseconds
  const diffInMilliseconds = now.getTime() - date.getTime();

  // Calculate the difference in seconds, minutes, hours, and days
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  // Determine the most appropriate unit of time to display
  let timeDifference;
  if (diffInDays > 0) {
    timeDifference = `hace ${diffInDays}d`;
  } else if (diffInHours > 0) {
    timeDifference = `hace ${diffInHours}h`;
  } else if (diffInMinutes > 0) {
    timeDifference = `hace ${diffInMinutes}m`;
  } else {
    timeDifference = `hace ${diffInSeconds}s`;
  }

  return (
    <>
      <div className={styles.containerBox}>
        <div className={styles.boxIcon}>
          <IoTime size={15} className={styles.icon} />
        </div>
        <p className={styles.hour}>{timeDifference}</p>
      </div>
    </>
  );
};

export default FormatDate;

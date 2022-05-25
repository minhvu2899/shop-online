import Image from "next/image";
import React from "react";
import styles from "../../styles/post.module.scss";
const PostPopularItem = ({
  item,
}: {
  item: {
    id: number;
    title: string;
    image: string;
    description: string;
    date: string;
  };
}) => {
  return (
    <a href="#" className={styles["post-small-item"]}>
      <div className={styles["post-small-media"]}>
        <Image
          src={item.image}
          width="100"
          height="100"
          alt="post small item"
        />
      </div>
      <div className={styles["post-small-content"]}>
        <p className={styles["post-small-date"]}>{item.date}</p>
        <p className={styles["post-small-title"]}>{item.title}</p>
      </div>
    </a>
  );
};

export default PostPopularItem;

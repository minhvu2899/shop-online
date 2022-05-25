import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import styles from "../../styles/post.module.scss";
import DateString from "../DateString";
interface PostItemProps {
  post: {
    id: number;
    title: string;
    image: string;
    description: string;
    date: string;
  };
}
const PostItem = ({ post }: PostItemProps) => {
  const router = useRouter();
  return (
    <div
      className={styles["post-item"]}
      onClick={() => router.push(`blogs/${post.id}`)}
    >
      <div className={styles["post-item-media"]}>
        <Image
          width={1000}
          height={500}
          src={post.image}
          alt="phôto"
          layout="responsive"
        />
      </div>
      <h3 className={styles["post-item-title"]}>{post.title}</h3>
      <p className={styles["post-item-date"]}>
        <DateString />
      </p>
      <p className={styles["post-item-desc"]}>{post.description}</p>
      <a className={styles["post-item-btn"]}>Read More</a>
    </div>
  );
};

export default PostItem;

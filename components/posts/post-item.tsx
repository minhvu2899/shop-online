import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import styles from "../../styles/post.module.scss";
interface PostItemProps {
  post: { id: number; title: string; userId: number; body: string };
}
const PostItem = ({ post }: PostItemProps) => {
  const router = useRouter();
  return (
    <div
      className={styles["post-item"]}
      onClick={() => router.push(`posts/${post.id}`)}
    >
      <Image
        width={1000}
        height={500}
        src="/images/products/image2.png"
        alt="phôto"
      ></Image>
      <h3 className={styles["post-item__title"]}>{post.title}</h3>
      {/* <p className={styles["post-item__date"]}>
        <DateString />
      </p> */}
      <p className={styles["post-item__desc"]}>{post.body}</p>
    </div>
  );
};

export default PostItem;

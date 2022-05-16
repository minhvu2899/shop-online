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
        src="https://images.unsplash.com/photo-1650440779984-6eb97f9808a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
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

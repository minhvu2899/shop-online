import { GetStaticProps } from "next";
import React from "react";
import Layout from "../../components/laypout/layout";
import PostList from "../../components/posts/post-list";
import PostPopularItem from "../../components/posts/post-popular-item";
import { getAllPost } from "../../lib/posts";
import styles from "../../styles/post.module.scss";
interface PostItem {
  id: number;
  title: string;
  image: string;
  description: string;
  date: string;
}
interface PostProps {
  posts: PostItem[];
}
const PostPage = ({ posts }: PostProps) => {
  return (
    <Layout>
      <div className={styles.post}>
        <div className={styles["post-left"]}>
          <PostList posts={posts} />
        </div>
        <div className={styles["post-right"]}>
          <h4 className="title-secondary">Popular posts</h4>
          <div className={styles["post-small-list"]}>
            {posts.map((post) => (
              <PostPopularItem key={post.id} item={post} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPost();
  return { props: { posts } };
};

export default PostPage;

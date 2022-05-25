import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import LayOutAuth from "../../components/laypout/layout-auth";
import PostItem from "../../components/posts/post-item";
import { getAllPost, getPostById } from "../../lib/posts";
import styles from "../../styles/post.module.scss";
interface PostDetailProps {
  post: {
    id: number;
    title: string;
    image: string;
    description: string;
    date: string;
  };
}
interface IPostItem {
  id: number;
  title: string;
  image: string;
  description: string;
  date: string;
}
const PostDetailPage = ({ post }: PostDetailProps) => {
  return (
    <div className={styles["post-detail"]}>
      <PostItem post={post} />
    </div>
  );
};
export const getStaticPaths: GetStaticPaths = async () => {
  // Call an external API endpoint to get posts
  const posts = await getAllPost();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post: IPostItem) => ({
    params: { blogId: post.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params as { blogId: string };
  try {
    const post = await getPostById(+params.blogId);
    return {
      props: {
        post,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
PostDetailPage.getLayout = function getLayout(page: React.ReactElement) {
  return <LayOutAuth>{page}</LayOutAuth>;
};

export default PostDetailPage;

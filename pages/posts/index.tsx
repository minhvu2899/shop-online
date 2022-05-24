import React from "react";
import { GetStaticProps } from "next";
import { getAllPost } from "../../lib/posts";
import PostList from "../../components/posts/post-list";
interface PostItem {
  id: number;
  title: string;
  userId: number;
  body: string;
}
interface PostProps {
  posts: PostItem[];
}
const PostPage = ({ posts }: PostProps) => {
  return (
    <div className="container">
      <PostList posts={posts} />
    </div>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPost();
  return { props: { posts } };
};

export default PostPage;

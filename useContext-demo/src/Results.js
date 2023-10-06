import { usePostContext } from "./context/PostProvider";

export default function Results() {
  const { posts } = usePostContext();

  return <p>🚀 {posts.length} atomic posts found</p>;
}

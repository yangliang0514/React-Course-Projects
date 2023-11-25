import { usePostContext } from "./context/PostProvider";
import Test from "./Test";

export default function List() {
  const { posts } = usePostContext();

  return (
    <>
      <ul>
        {posts.map((post, i) => (
          <li key={i}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
      {/* <Test /> */}
    </>
  );
}

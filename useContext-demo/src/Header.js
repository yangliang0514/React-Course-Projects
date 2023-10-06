import { useContext } from "react";
import Results from "./Results";
import SearchPosts from "./searchPosts";
import { PostContext } from "./App";

export default function Header() {
  // call the useContext function and pass in the context object
  // it'll return the value we put in the context provider
  const { onClearPosts } = useContext(PostContext);

  return (
    <header>
      <h1>
        <span>⚛️</span>The Atomic Blog
      </h1>
      <div>
        <Results />
        <SearchPosts />
        <button onClick={onClearPosts}>Clear posts</button>
      </div>
    </header>
  );
}

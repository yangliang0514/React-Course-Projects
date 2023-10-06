import { createContext, useContext, useState } from "react";
import { createRandomPost } from "../utils/helpers";

// create a new context by calling createContext function
// that returns a component, which can be used as a component
// using the useContext api can eliminate prop drilling
const PostContext = createContext();

// separate all the states into a single file
// then pass the components that relies on these state in as children
export default function PostProvider({ children }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  return (
    // use a context provider, and pass in values which will then be provided to the child components
    // but in practice it is better to create one context per state domain (one for post and one for search)
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        onAddPost: handleAddPost,
        onClearPosts: handleClearPosts,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

// export a function that encapsulates the PostContext
// which can be called from other components
export function usePostContext() {
  const context = useContext(PostContext);

  // if we call this usePostContext hook outside the provider
  // the returned value will be undefined and may lead to bugs that's hard to find
  // so we implement this check to prevent that error
  if (context === undefined) {
    throw new Error("PostContext was used outside of PostProvider");
  }

  return context;
}

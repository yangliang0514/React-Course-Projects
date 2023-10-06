import { usePostContext } from "./context/PostProvider";

export default function SearchPosts() {
  const { searchQuery, setSearchQuery } = usePostContext();

  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search posts..."
    />
  );
}

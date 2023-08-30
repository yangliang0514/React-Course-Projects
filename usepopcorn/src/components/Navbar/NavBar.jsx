import Logo from "./Logo";
import ResultNum from "./ResultNum";
import Search from "./Search";

export default function NavBar({ movies, query, setQuery }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search query={query} setQuery={setQuery} />
      <ResultNum movies={movies} />
    </nav>
  );
}

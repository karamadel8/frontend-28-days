import { useState } from "react";
import Moviecard from "./MovieCard";

const Moviesearch = () => {
  const [query, setquery] = useState("");
  const [Movies, setMovies] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const Moviefetch = async () => {
    if (query.trim() === "") return;
    setloading(true);
    seterror(null);
    setMovies([]);
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(query.trim())}&apikey=ecfac612`,
      );
      const data = await res.json();
      if (!data.Search || data.Search.length === 0)
        throw new Error("no Movies found !");
      setMovies(data.Search);
    } catch (err) {
      seterror(err.message);
    } finally {
      setloading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-black  ">
      <div className="max-w-sm w-full bg-gray-700 rounded-2xl shadow-lg border border-gray-600 m-2">
        <div className="bg-blue-800  text-center p-6 rounded-t-2xl">
          <h1 className="text-2xl text-white font-bold mb-2">
            🎬 Movie Search
          </h1>
          <p className="text-xs text-gray-100/40">
            Discover movies and TV shows
          </p>
        </div>
        <div className="flex items-center justify-between p-4 bg-black border-b border-gray-600">
          <input
            type="text"
            value={query}
            className="border border-gray-700 bg-gray-700 text-gray-400 rounded-lg flex-1 p-2 mr-2 focus:border-2 focus:border-gray-200 focus:outline-none"
            placeholder="Search movies..."
            onChange={(e) => setquery(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                Moviefetch();
              }
            }}
          />
          <button
            className="bg-blue-800 text-white text-xs px-4 py-3 border border-blue-800 rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-700 hover:shadow-xl"
            onClick={() => {
              Moviefetch();
            }}
            disabled={loading}
          >
            Search
          </button>
        </div>
        {Movies.length === 0 && !loading && !error && (
          <div className="text-center p-22  text-sm bg-black mb-36">
            <p className="text-3xl mb-2">🎬</p>
            <p className="text-lg mb-2">Search for movies</p>
            <p className="text-xs text-gray-400">
              Try "Batman", "Inception", "Avatar"...{" "}
            </p>
          </div>
        )}
        {loading && (
          <div className="flex items-center justify-center p-10">
            <div className="w-8 h-8 rounded-full border-4 border-gray-300 border-t-transparent animate-spin"></div>
          </div>
        )}
        {error && (
          <div className="text-center bg-red-100 rounded-xl p-6 m-3">
            <p className="text-red-600 font-semibold">{error}</p>
            <p className="text-gray-400 text-xs">
              Please Search for different movie...
            </p>
          </div>
        )}
        {Movies.length > 0 && (
          <div className="">
            <div className="bg-black flex items-center justify-between border-b border-gray-600 p-2  text-gray-500 text-sm">
              <p className="">{`Results for "${query}" `}</p>
              <p className="">{Movies.length} Found</p>
            </div>
            <div className="grid grid-cols-2 bg-black gap-2 p-3 rounded-2xl items-start">
              {Movies.map((movie) => (
                <Moviecard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Moviesearch;

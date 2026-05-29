import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Moviedetail = () => {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [Movie, setMovie] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const Moviedetails = async () => {
      setloading(true);
      seterror(null);
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=ecfac612`,
        );
        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");
        setMovie(data);
      } catch (err) {
        seterror(err.message);
      } finally {
        setloading(false);
      }
    };
    Moviedetails();
  }, [id]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-black  ">
      <div className="max-w-sm w-full bg-gray-700 rounded-2xl shadow-lg border border-gray-600 m-2">
        {loading && (
          <div className="flex items-center justify-center p-10">
            <div className="w-8 h-8 rounded-full border-4 border-gray-300 border-t-transparent animate-spin"></div>
          </div>
        )}
        {error && (
          <div className="text-center bg-red-100 rounded-xl p-6 m-3">
            <p className="text-4xl mb-2">🍽️</p>
            <p className="text-red-600 font-semibold">{error}</p>
            <p className="text-gray-400 text-xs">
              please search for another Movie
            </p>
          </div>
        )}
        {Movie && (
          <div className="">
            <div className="relative mb-2 ">
              <img
                src={Movie.Poster !== "N/A" ? Movie.Poster : "/fallback.jpg"}
                alt={Movie.Title}
                className="rounded-t-2xl w-full object-cover h-64"
              />
              <button
                className="absolute top-1 left-1 m-2 text-sm  cursor-pointer bg-black/70 text-white px-4 py-1 border border-black/70 rounded-lg shadow-xl transition-colors duration-200 hover:bg-amber-100 hover:text-blue-900 "
                onClick={() => navigate(-1)}
              >
                Back
              </button>
            </div>
            <div className="p-2 ">
              <p className="text-white font-bold mb-2">{Movie.Title}</p>
              <div className="flex items-center justify-start gap-2 mb-2">
                <p className="text-xs text-gray-500 bg-gray-600 rounded-full px-1 py-0.5">
                  ⭐ {Movie.imdbRating}
                </p>
                <p className="text-xs text-gray-500 bg-gray-600 rounded-full px-1 py-0.5">
                  {Movie.Year}
                </p>
                <p className="text-xs text-gray-500 bg-gray-600 rounded-full px-1 py-0.5">
                  {Movie.Runtime}
                </p>
                <p className="text-xs text-gray-500 bg-gray-600 rounded-full px-1 py-0.5">
                  {Movie.Genre}
                </p>
                <p className="text-xs text-gray-500 bg-gray-600 rounded-full px-1 py-0.5">
                  {Movie.Rated}
                </p>
              </div>
              <div className="mb-2">
                <h2 className="text-gray-500 text-sm font-semibold mb-1">
                  PLOT
                </h2>
                <p className="text-sm text-gray-300 ">{Movie.Plot}</p>
              </div>
              <div className="grid grid-cols-2  gap-2">
                <div className="rounded-xl text-white text-xs p-2 bg-black  ">
                  <p className="text-gray-400 font-light">Director</p>
                  <p>{Movie.Director}</p>
                </div>
                <div className="rounded-xl text-white text-xs p-2 bg-black  ">
                  <p className="text-gray-400 font-light">Actors</p>
                  <p>{Movie.Actors}</p>
                </div>
                <div className="rounded-xl text-white text-xs p-2 bg-black  ">
                  <p className="text-gray-400 font-light">Language</p>
                  <p>{Movie.Language}</p>
                </div>
                {Movie.BoxOffice !== "N/A" && (
                  <div className="rounded-xl text-white text-xs p-2 bg-black">
                    <p className="text-gray-400 font-light">Box Office</p>
                    <p>{Movie.BoxOffice}</p>
                  </div>
                )}
              </div>
              <div className="text-center w-full p-2 bg-amber-400 rounded-lg text-sm font-semibold mt-2 mb-2 cursor-pointer ">
                <a
                  href={`https://www.imdb.com/title/${Movie.imdbID}`}
                  target="_blank"
                  rel="noreferrer"
                  className=""
                >
                  View on IMDb ↗
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Moviedetail;

import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/day-15/${movie.imdbID}`} className="h-full">
      <div className="h-full flex flex-col border border-gray-600 rounded-xl bg-gray-900 mb-2 transition-all duration-200  hover:border-blue-800 hover:-translate-y-0.5">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/fallback.jpg"}
          alt={movie.Title}
          className="w-full object-cover rounded-t-xl h-48"
        />

        <div className="p-2 flex flex-col flex-1">
          <p className="text-white  text-xs font-bold flex-1">{movie.Title}</p>
          <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
            <p>{movie.Year}</p>
            <p className="bg-blue-800 text-gray-100/40 rounded-full px-1.5 py-0.5 text-xs">
              {movie.Type}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;

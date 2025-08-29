import { useWatchlist } from "../context/WatchlistContext";

const MovieCard = ({ movie }) => {
  const { addToWatchlist } = useWatchlist();

  return (
    <div className="w-40 flex-shrink-0 hover:scale-105 transition-transform">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="rounded-lg shadow-lg"
      />
      <p className="mt-2 text-sm text-center text-white font-medium truncate">
        {movie.title}
      </p>
      <button
        onClick={() => addToWatchlist(movie)}
        className="mt-2 w-full bg-red-600 text-white text-sm py-1 rounded hover:bg-red-700 transition"
      >
        + Add to Watchlist
      </button>
    </div>
  );
};

export default MovieCard;

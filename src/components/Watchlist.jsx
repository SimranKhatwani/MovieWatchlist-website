import React from 'react'
import { useWatchlist } from "../context/WatchlistContext";

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  return (
    <div>
      <div className="bg-black min-h-screen text-white p-6">
      <h1 className="text-2xl font-bold mb-6">My Watchlist</h1>

      {watchlist.length === 0 ? (
        <p>No movies in your watchlist yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {watchlist.map((movie) => (
            <div key={movie.id} className="w-48">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg shadow-lg"
              />
              <p className="mt-2 text-sm text-center text-white font-medium truncate">
                {movie.title}
              </p>
              <button
                onClick={() => removeFromWatchlist(movie.id)}
                className="mt-2 w-full bg-gray-600 text-white text-sm py-1 rounded hover:bg-gray-700 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>

    </div>
  )
}

export default Watchlist

import React  , {useEffect ,useState ,useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import tmdb from '../api/tmdb'
import { getSuggestedMovies } from "../api/movies";
import MovieCard from '../components/Moviecard';
import { useWatchlist } from "../context/WatchlistContext";



const IMAGE_BASE = "https://image.tmdb.org/t/p/";
const POSTER_SIZE = "w342";

const Homepage = () => {
  const { addToWatchlist } = useWatchlist();
    const navigate = useNavigate();
    const [query, setQuery] = useState("");   
  const [results, setResults] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const scrollRef = useRef(null)
 const [suggested, setSuggested] = useState([]); 


const searchMovies = async (e) => {
    e.preventDefault();
    if (!query) return;

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=29c5b78fcf4a7af5be07bbb5ff30b39e&query=${query}`
    );
    const data = await response.json();
    setResults(data.results);
  };




  useEffect(() => {
    const fetchTrendingNetflixMovies = async () => {
      try {
        setLoading(true);
        setErr("");
        const { data } = await tmdb.get("/discover/movie", {
          params: {
            with_watch_providers: "8",      
            watch_region: "IN",             
            with_watch_monetization_types: "flatrate",
            sort_by: "popularity.desc",
            include_adult: false,
            page: 1,
          },
        });
        setTrending(data?.results || []);

         const suggestedRes = await getSuggestedMovies();
        setSuggested(suggestedRes);

      } catch (e) {
        console.error(e);
        setErr("Couldn't load trending movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingNetflixMovies();
  }, []);

  const scroll = (dir) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = dir === "left" ? -clientWidth : clientWidth;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  

  return (
    <div className=' w- full min-h-screen bg-gray-900'>
     <nav className="flex items-center justify-between shadow-2xl shadow-black/80 px-6 py-2">
  <h1 className="text-white text-3xl font-bold tracking-wide whitespace-nowrap">
    Movie WatchList
  </h1>

  <div className="flex items-center space-x-6 text-white text-2xl font-semibold">
    <button 
      onClick={() => navigate('/Watchlist')}
      className="hover:text-white">
      Watchlist
    </button>

    <button
      onClick={() => navigate('/')}
      className="hover:text-white whitespace-nowrap">
      Log Out
    </button>
  </div>
</nav>

<div className="p-6">
  {/* Search bar */}
  <form onSubmit={searchMovies} className="flex justify-center mb-6 mt-10 px-4">
    <input
      type="text"
      placeholder="🔍 Search for a movie, TV shows..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="
        w-full
        max-w-xl
        rounded-lg
        text-white
        text-xl
        placeholder-gray-400
        bg-gray-900
        border
        border-gray-700
        shadow-lg
        px-4
        py-3
      "
    />
  </form>

  {/* Search results */}
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
    {results.map((movie) => (
      <div key={movie.id} className="bg-gray-900 p-2 rounded">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded mb-2 w-full h-auto object-cover"
        />
        <p className="text-white text-sm truncate">{movie.title}</p>
        <button
          onClick={() => {
            addToWatchlist(movie);
            alert("✅ Added to Watchlist!");
          }}
          className="mt-2 w-full bg-red-600 text-white text-sm py-1 rounded hover:bg-red-700 transition"
        >
          + Add to Watchlist
        </button>
      </div>
    ))}
  </div>
</div>

{/* Trending section */}
<section className=" w- full px-4 md:px-8 mt-10">
  <div className="flex flex-wrap items-baseline justify-between gap-2">
    <h2 className="text-white font-semibold text-2xl mt-4">Trending Now on Netflix</h2>
    <span className="text-xs text-gray-400">Region: IN</span>
  </div>

  {err && !loading && (
    <p className="mt-4 text-sm text-red-400">{err}</p>
  )}

  {/* Scroll buttons */}
  <button
    onClick={() => scroll("left")}
    className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/60 text-white text-3xl p-4 rounded-full hover:bg-black z-10 hover:scale-110 shadow-lg"
  >
    ◀
  </button>
  <button
    onClick={() => scroll("right")}
    className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/60 text-white text-3xl p-4 rounded-full hover:bg-black z-10 hover:scale-110 shadow-lg"
  >
    ▶
  </button>

  {/* Posters */}
  {!loading && !err && (
    <div
      ref={scrollRef}
      className="mt-4 flex space-x-4 overflow-x-auto pb-4 scroll-smooth"
    >
      {trending.map((m) => {
        const poster = m.poster_path
          ? `${IMAGE_BASE}${POSTER_SIZE}${m.poster_path}`
          : "https://via.placeholder.com/342x513?text=No+Poster";
        return (
          <div key={m.id} className="flex-shrink-0 w-40">
            <img
              src={poster}
              alt={m.title}
              className="w-40 h-60 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform"
              loading="lazy"
            />
            <p className="text-white mt-2 text-sm text-center truncate">{m.title}</p>
            <button
              onClick={() => {
                addToWatchlist(m);
                alert("✅ Added to Watchlist!");
              }}
              className="mt-2 w-full bg-red-600 text-white text-sm py-1 rounded hover:bg-red-700 transition"
            >
              + Add to Watchlist
            </button>
          </div>
        );
      })}
    </div>
  )}
</section>

{/* Suggested for You */}
<section className=" w- full px-4 md:px-8">
  <h2 className="text-white font-semibold text-3xl mt-10">Suggested for You</h2>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-5">
    {suggested.map((movie) => (
      <div
        key={movie.id}
        className="rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
      >
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-60 object-cover rounded-xl shadow-lg"
        />
        <p className="text-white mt-2 text-md text-center truncate">
          {movie.title}
        </p>
        <button
          onClick={() => {
            addToWatchlist(movie);
            alert("✅ Added to Watchlist!");
          }}
          className="mt-2 w-full bg-red-600 text-white text-sm py-1 rounded hover:bg-red-700 transition"
        >
          + Add to Watchlist
        </button>
      </div>
    ))}
  </div>
</section>

{/* Credit */}
<footer className=" w- full px-4 md:px-8 py-10 text-xs text-gray-400 text-center">
  This product uses the TMDB API but is not endorsed or certified by TMDB.
</footer>
    </div>

  )
}
export default Homepage


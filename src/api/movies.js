
import tmdb from "./tmdb";

export const getSuggestedMovies = async () => {
  const res = await tmdb.get("/movie/top_rated"); 
  return res.data.results;
};

import { useParams } from "react-router-dom";
import { getMovies } from "../Reducer/moviesSlice";
import { useAppSelector } from "../app/hooks";
import { Movie } from "../types/movie.types";
import { memo } from "react";

const MovieDetails = memo(() => {
  const { id } = useParams();
  const movies = useAppSelector(getMovies);
  const selectedMovie = movies.find(
    (movie: Movie) => movie.episode_id === parseInt(id || "0")
  );

  const { title, opening_crawl, director } = selectedMovie || {};

  return (
    <section className="w50 p1">
      <h1>{title}</h1>
      <div>{opening_crawl}</div>
      <br />
      <div>Directed by: {director}</div>
    </section>
  );
});

export default MovieDetails;

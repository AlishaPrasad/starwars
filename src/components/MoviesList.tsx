import { useEffect, useState } from "react";
import { getMoviesList } from "../services/movieService";
import { NavLink } from "react-router-dom";
import { storeMoviesList } from "../Reducer/moviesSlice";
import { Movie } from "../types/movie.types";
import { useAppDispatch } from "../app/hooks";
import { convertToRomanNumber } from "../utils/movieUtils";

interface MoviesListProps {
  searchText: string;
  sortField: string;
}

const MoviesList = ({ searchText, sortField }: MoviesListProps) => {
  const [movies, setMovies] = useState([]);
  const [refinedMovies, setRefinedMovies] = useState([]);

  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      const moviesList = await getMoviesList();
      moviesList.map(
        (movie: Movie) =>
          (movie.title = `Episode ${convertToRomanNumber(movie.episode_id)} - ${
            movie.title
          }`)
      );
      setMovies(moviesList);
      setRefinedMovies(moviesList);
      dispatch(storeMoviesList(moviesList));
    })();
  }, [dispatch]);

  useEffect(() => {
    let updatedMovies = [];
    searchText
      ? (updatedMovies = [...movies].filter((movie: Movie) =>
          movie.title.toLowerCase().includes(searchText.toLowerCase())
        ))
      : (updatedMovies = movies);

    switch (sortField) {
      case "episode":
        const sortedByEpisode = [...updatedMovies].sort(
          (a: Movie, b: Movie) => a.episode_id - b.episode_id
        );
        updatedMovies = sortedByEpisode;
        break;
      case "year":
        const sortedByYear = [...updatedMovies].sort(
          (a: Movie, b: Movie) =>
            new Date(a.release_date).getFullYear() -
            new Date(b.release_date).getFullYear()
        );
        updatedMovies = sortedByYear;
        break;
    }

    setRefinedMovies(updatedMovies);
  }, [sortField, searchText, movies]);

  if (!movies) return <>Loading...</>;

  return (
    <section className="w50 border-right p1">
      {refinedMovies.map(({ episode_id, title, release_date }: Movie) => (
        <NavLink
          to={`/${episode_id}`}
          className={({ isActive }) =>
            isActive
              ? "flex border-bottom p1 selected"
              : "flex border-bottom p1"
          }
          key={episode_id}
        >
          <div className="w20">EPISODE {episode_id}</div>
          <div className="w60">{title}</div>
          <div className="w20">{release_date}</div>
        </NavLink>
      ))}
    </section>
  );
};

export default MoviesList;

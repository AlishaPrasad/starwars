import { useEffect, useState } from "react";
import { getOmdbData, getMoviesList } from "../services/movieService";
import { NavLink } from "react-router-dom";
import { storeMoviesList } from "../Reducer/moviesSlice";
import { Movie } from "../types/movie.types";
import { useAppDispatch } from "../app/hooks";
import {
  calculateAvergaRating,
  convertToRomanNumber,
  getIMDBId,
} from "../utils/movieUtils";
import { Star } from "./Star";

interface MoviesListProps {
  searchText: string;
  sortField: string;
}

const MoviesList = ({ searchText, sortField }: MoviesListProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [refinedMovies, setRefinedMovies] = useState<Movie[]>([]);

  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      const moviesList: Movie[] = await getMoviesList();
      const modifiedMovieList: Movie[] = await Promise.all(
        moviesList.map(async (movie: Movie) => {
          const omdbData = await getOmdbData(getIMDBId(movie.episode_id));
          return {
            ...movie,
            ratings: omdbData?.Ratings,
            averageRating: calculateAvergaRating(omdbData?.Ratings),
            poster: omdbData?.Poster,
            title: `Episode ${convertToRomanNumber(movie.episode_id)} - ${
              movie.title
            }`,
          };
        })
      );
      setMovies(modifiedMovieList);
      setRefinedMovies(modifiedMovieList);
      dispatch(storeMoviesList(modifiedMovieList));
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
      case "rating":
        const sortedByRating = [...updatedMovies].sort(
          (a: Movie, b: Movie) => b.averageRating - a.averageRating
        );
        updatedMovies = sortedByRating;
        break;
    }

    setRefinedMovies(updatedMovies);
  }, [sortField, searchText, movies]);

  if (!movies) return <>Loading...</>;

  return (
    <section className="w50 border-right p1">
      {refinedMovies.map(
        ({ episode_id, title, release_date, averageRating }: Movie) => (
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
            <div className="w40">{title}</div>
            <div className="w30">
              {[...Array(10)].map((_, index) => (
                <Star key={index} filled={index < (averageRating || 0)} />
              ))}
            </div>
            <div className="w20">{release_date}</div>
          </NavLink>
        )
      )}
    </section>
  );
};

export default MoviesList;

import moviesReducer, {
  storeMoviesList,
  getMovies,
} from "../Reducer/moviesSlice";
import { Movie } from "../types/movie.types";

describe("moviesSlice", () => {
  const initialState = {
    moviesList: [],
  };

  const mockMovies: Movie[] = [
    {
      episode_id: 1,
      title: "A New Hope",
      release_date: "1977-05-25",
      averageRating: 8,
      opening_crawl: "",
      director: "",
      ratings: [],
      poster: "",
    },
    {
      episode_id: 2,
      title: "The Empire Strikes Back",
      release_date: "1980-05-21",
      averageRating: 9,
      opening_crawl: "",
      director: "",
      ratings: [],
      poster: "",
    },
  ];

  it("should return the initial state when no action is passed", () => {
    const result = moviesReducer(undefined, { type: "" });
    expect(result).toEqual(initialState);
  });

  it("should handle storeMoviesList action", () => {
    const action = storeMoviesList(mockMovies);
    const result = moviesReducer(initialState, action);
    expect(result.moviesList).toEqual(mockMovies);
  });

  it("should select moviesList using getMovies selector", () => {
    const mockState = {
      movies: {
        moviesList: mockMovies,
      },
    };
    const result = getMovies(mockState as any);
    expect(result).toEqual(mockMovies);
  });
});

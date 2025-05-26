import { store } from "../app/store";
import { storeMoviesList } from "../Reducer/moviesSlice";

describe("Redux Store", () => {
  it("should initialize with the correct default state", () => {
    const state = store.getState();
    expect(state.movies.moviesList).toEqual([]);
  });

  it("should update the state when an action is dispatched", () => {
    const mockMovies = [
      {
        episode_id: 1,
        title: "A New Hope",
        release_date: "1977-05-25",
        opening_crawl: "",
        director: "",
        ratings: [],
        averageRating: 8,
        poster: "",
      },
      {
        episode_id: 2,
        title: "The Empire Strikes Back",
        release_date: "1980-05-21",
        opening_crawl: "",
        director: "",
        ratings: [],
        averageRating: 9,
        poster: "",
      },
    ];

    store.dispatch(storeMoviesList(mockMovies));
    const state = store.getState();
    expect(state.movies.moviesList).toEqual(mockMovies);
  });

  it("should handle unknown actions without modifying the state", () => {
    const initialState = store.getState();
    store.dispatch({ type: "UNKNOWN_ACTION" });
    const state = store.getState();
    expect(state).toEqual(initialState);
  });
});

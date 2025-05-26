import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../types/movie.types";
import { RootState } from "../app/store";

interface MoviesList {
  moviesList: Movie[];
}
const initialState: MoviesList = {
  moviesList: [],
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    storeMoviesList: (state: MoviesList, action: PayloadAction<Movie[]>) => {
      state.moviesList = action.payload;
    },
  },
});

export const { storeMoviesList } = moviesSlice.actions;
export const getMovies = (state: RootState) => {
  return state?.movies?.moviesList;
};

export default moviesSlice.reducer;

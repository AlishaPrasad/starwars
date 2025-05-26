import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import MoviesList from "../components/MoviesList";
import { getMoviesList, getOmdbData } from "../services/movieService";
import { MemoryRouter } from "react-router-dom";
jest.mock("../services/movieService", () => ({
  getMoviesList: jest.fn(),
  getOmdbData: jest.fn(),
}));
jest.mock("../utils/movieUtils", () => ({
  getIMDBId: jest.fn((episode_id) => `mock-imdb-id-${episode_id}`),
  calculateAvergaRating: jest.fn(() => 8),
  convertToRomanNumber: jest.fn((episode_id) => `Roman-${episode_id}`),
}));
const mockStore = configureStore([]);
const mockMovies = [
  {
    episode_id: 1,
    title: "A New Hope",
    release_date: "1977-05-25",
    averageRating: 9,
  },
  {
    episode_id: 2,
    title: "The Empire Strikes Back",
    release_date: "1980-05-21",
    averageRating: 8,
  },
];
describe("MoviesList Component", () => {
  let store: any;
  beforeEach(() => {
    store = mockStore({ movies: { moviesList: mockMovies } });
    (getMoviesList as jest.Mock).mockResolvedValue(mockMovies);
    (getOmdbData as jest.Mock).mockResolvedValue({
      Poster: "mock-poster-url",
      Ratings: [{ Source: "Internet Movie Database", Value: "8.6/10" }],
    });
  });
  it("renders movies after fetching data", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MoviesList searchText="" sortField="" />
        </MemoryRouter>
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getByText(/A New Hope/i)).toBeInTheDocument();
      expect(screen.getByText(/The Empire Strikes Back/i)).toBeInTheDocument();
    });
  });
  it("filters movies based on search text", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MoviesList searchText="Empire" sortField="" />
        </MemoryRouter>
      </Provider>
    );
    await waitFor(() => {
      expect(screen.queryByText(/A New Hope/i)).not.toBeInTheDocument();
      expect(screen.getByText(/The Empire Strikes Back/i)).toBeInTheDocument();
    });
  });
  it("sorts movies by episode", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MoviesList searchText="" sortField="episode" />
        </MemoryRouter>
      </Provider>
    );
    await waitFor(() => {
      const episodes = screen.getAllByText(/EPISODE/);
      expect(episodes[0]).toHaveTextContent("EPISODE 1");
      expect(episodes[1]).toHaveTextContent("EPISODE 2");
    });
  });
  it("sorts movies by year", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MoviesList searchText="" sortField="year" />
        </MemoryRouter>
      </Provider>
    );
    await waitFor(() => {
      const years = screen.getAllByText(/1977|1980/i);
      expect(years[0]).toHaveTextContent("1977");
      expect(years[1]).toHaveTextContent("1980");
    });
  });
  it("sorts movies by rating", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MoviesList searchText="" sortField="rating" />
        </MemoryRouter>
      </Provider>
    );
    await waitFor(() => {
      const ratings = screen.getAllByText(/EPISODE/);
      expect(ratings[0]).toHaveTextContent("EPISODE 1"); // Higher rating
      expect(ratings[1]).toHaveTextContent("EPISODE 2"); // Lower rating
    });
  });
});

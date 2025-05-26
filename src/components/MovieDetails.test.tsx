import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import configureStore from "redux-mock-store";
import MovieDetails from "./MovieDetails";

const mockStore = configureStore([]);
const mockMovies = [
  {
    episode_id: 1,
    title: "A New Hope",
    opening_crawl: "It is a period of civil war...",
    director: "George Lucas",
    poster: "https://via.placeholder.com/200x250",
    ratings: [
      { Source: "Internet Movie Database", Value: "8.6/10" },
      { Source: "Rotten Tomatoes", Value: "92%" },
    ],
    averageRating: 8,
  },
];

describe("MovieDetails Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      movies: { moviesList: mockMovies },
    });
  });

  it("renders movie details when a valid movie ID is provided", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/movie/1"]}>
          <Routes>
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/A New Hope/i)).toBeInTheDocument();
    expect(
      screen.getByText(/It is a period of civil war.../i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Directed by: George Lucas/i)).toBeInTheDocument();
    expect(screen.getByAltText(/A New Hope/i)).toBeInTheDocument();
  });

  it("renders ratings correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/movie/1"]}>
          <Routes>
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByText(/Internet Movie Database: 86%/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Rotten Tomatoes: 92%/i)).toBeInTheDocument();
  });

  it("renders fallback content when movie ID is invalid", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/movie/999"]}>
          <Routes>
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/A New Hope/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Directed by:/i)).toBeInTheDocument(); // Empty "Directed by" fallback
  });
});

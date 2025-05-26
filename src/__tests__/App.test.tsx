import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import App from "../App";
const mockStore = configureStore([]);
const mockMovies = [
  {
    episode_id: 1,
    title: "A New Hope",
    release_date: "1977-05-25",
    averageRating: 8,
  },
  {
    episode_id: 2,
    title: "The Empire Strikes Back",
    release_date: "1980-05-21",
    averageRating: 9,
  },
];
describe("App Component", () => {
  let store: any;
  beforeEach(() => {
    store = mockStore({ movies: { moviesList: mockMovies } });
  });
  it("renders the DefaultMessage when no movie is selected", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(
      screen.getByText(
        /Select a movie from the Star Wars saga list to see more details.../i
      )
    ).toBeInTheDocument();
  });
  it("does not render DefaultMessage when a movie is selected", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/movie/1"]}>
          <Routes>
            <Route path="/movie/:id" element={<App />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(
      screen.queryByText(
        /Select a movie from the Star Wars saga list to see more details.../i
      )
    ).not.toBeInTheDocument();
  });
});

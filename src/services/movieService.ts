import { API_KEY, BASE_URL, OMDB_URL } from "../constants";

export const getMoviesList = async () => {
  try {
    const response = await fetch(`${BASE_URL}?format=json`);
    const data = await response.json();

    return data.results;
  } catch (e) {
    console.log("Error fetching movies list", e);
  }
};

export const getOmdbData = async (imdbId: string) => {
  try {
    const response = await fetch(`${OMDB_URL}?apikey=${API_KEY}&i=${imdbId}`);
    const data = await response.json();
    const { Poster, Ratings } = data;
    return { Poster, Ratings };
  } catch (e) {
    console.log("Error fetching OMDB data", e);
  }
};

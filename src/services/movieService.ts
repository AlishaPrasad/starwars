const baseUrl = "https://swapi.py4e.com/api/films/";

export const getMoviesList = async () => {
  try {
    const response = await fetch(`${baseUrl}?format=json`);
    const data = await response.json();

    return data.results;
  } catch (e) {
    console.log("Error fetching movies list", e);
  }
};

export const getOmdbData = async (imdbId: string) => {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=b9a5e69d&i=${imdbId}`
    );
    const data = await response.json();
    const { Poster, Ratings } = data;
    return { Poster, Ratings };
  } catch (e) {
    console.log("Error fetching OMDB data", e);
  }
};

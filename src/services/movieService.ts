const baseUrl = "https://swapi.py4e.com/api/films/";

export const getMoviesList = async () => {
  try {
    const response = await fetch(`${baseUrl}?format=json`);
    const data = await response.json();

    return data.results;
  } catch (e) {
    console.log("Error fetching movies list");
  }
};

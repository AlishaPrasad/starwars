import { getMoviesList, getOmdbData } from "./movieService";

global.fetch = jest.fn();

describe("movieService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getMoviesList", () => {
    it("should fetch and return the movies list", async () => {
      const mockMovies = {
        results: [
          { title: "A New Hope", episode_id: 1 },
          { title: "The Empire Strikes Back", episode_id: 2 },
        ],
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockMovies),
      });

      const result = await getMoviesList();
      expect(fetch).toHaveBeenCalledWith(
        "https://swapi.py4e.com/api/films/?format=json"
      );
      expect(result).toEqual(mockMovies.results);
    });

    it("should log an error if the fetch fails", async () => {
      const consoleSpy = jest
        .spyOn(console, "log")
        .mockImplementation(() => {});
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

      const result = await getMoviesList();
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error fetching movies list",
        expect.any(Error)
      );
      expect(result).toBeUndefined();

      consoleSpy.mockRestore();
    });
  });

  describe("getOmdbData", () => {
    it("should fetch and return OMDB data", async () => {
      const mockOmdbData = {
        Poster: "https://example.com/poster.jpg",
        Ratings: [{ Source: "Internet Movie Database", Value: "8.6/10" }],
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockOmdbData),
      });

      const result = await getOmdbData("tt0076759");
      expect(fetch).toHaveBeenCalledWith(
        "http://www.omdbapi.com/?apikey=b9a5e69d&i=tt0076759"
      );
      expect(result).toEqual({
        Poster: mockOmdbData.Poster,
        Ratings: mockOmdbData.Ratings,
      });
    });

    it("should log an error if the fetch fails", async () => {
      const consoleSpy = jest
        .spyOn(console, "log")
        .mockImplementation(() => {});
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

      const result = await getOmdbData("tt0076759");
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error fetching OMDB data",
        expect.any(Error)
      );
      expect(result).toBeUndefined();

      consoleSpy.mockRestore();
    });
  });
});

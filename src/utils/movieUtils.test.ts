import {
  convertToRomanNumber,
  getIMDBId,
  formatRatingValue,
  calculateAvergaRating,
} from "./movieUtils";
import { Rating } from "../types/movie.types";

describe("movieUtils", () => {
  describe("convertToRomanNumber", () => {
    it("should convert episode numbers to Roman numerals", () => {
      expect(convertToRomanNumber(1)).toBe("I");
      expect(convertToRomanNumber(4)).toBe("IV");
      expect(convertToRomanNumber(7)).toBe("VII");
    });

    it("should return undefined for invalid episode numbers", () => {
      expect(convertToRomanNumber(8)).toBeUndefined();
    });
  });

  describe("getIMDBId", () => {
    it("should return the correct IMDb ID for a given episode", () => {
      expect(getIMDBId(1)).toBe("tt0076759");
      expect(getIMDBId(5)).toBe("tt0080684");
      expect(getIMDBId(7)).toBe("tt2488496");
    });

    it("should return an empty string for invalid episode numbers", () => {
      expect(getIMDBId(8)).toBe("");
    });
  });

  describe("formatRatingValue", () => {
    it("should format ratings with '/100' correctly", () => {
      expect(formatRatingValue("85/100", "%")).toBe("85%");
    });

    it("should format ratings with '/10' correctly", () => {
      expect(formatRatingValue("8.5/10", "%")).toBe("85%");
    });

    it("should handle ratings without a sign", () => {
      expect(formatRatingValue("85%", "")).toBe("85");
    });

    it("should return the original value if no formatting is needed", () => {
      expect(formatRatingValue("85%", "%")).toBe("85%");
    });
  });

  describe("calculateAvergaRating", () => {
    it("should calculate the average rating correctly", () => {
      const ratings: Rating[] = [
        { Source: "Internet Movie Database", Value: "8.6/10" },
        { Source: "Rotten Tomatoes", Value: "92/100" },
        { Source: "Metacritic", Value: "85/100" },
      ];
      expect(calculateAvergaRating(ratings)).toBe(8);
    });

    it("should return NaN if ratings array is empty", () => {
      expect(calculateAvergaRating([])).toBeNaN();
    });
  });
});

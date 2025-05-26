import { Rating } from "../types/movie.types";

export const convertToRomanNumber = (episode_id: number) => {
  switch (episode_id) {
    case 1:
      return "I";
    case 2:
      return "II";
    case 3:
      return "III";
    case 4:
      return "IV";
    case 5:
      return "V";
    case 6:
      return "VI";
    case 7:
      return "VII";
  }
};

export const getIMDBId = (episode_id: number) => {
  switch (episode_id) {
    case 1:
      return "tt0076759";
    case 2:
      return "tt0121765";
    case 3:
      return "tt0121766";
    case 4:
      return "tt0076759";
    case 5:
      return "tt0080684";
    case 6:
      return "tt0086190";
    case 7:
      return "tt2488496";
    default:
      return "";
  }
};

export const formatRatingValue = (value: string, sign: string) => {
  if (value.includes("/100")) {
    return `${value.split("/")[0]}${sign}`;
  }
  if (value.includes("/10")) {
    return `${parseInt(value.split("/")[0]) * 10}${sign}`;
  }
  return sign ? value : value.split("%")[0];
};

export const calculateAvergaRating = (ratings: Rating[]) => {
  const sum = ratings.reduce(
    (acc, rating) => parseInt(formatRatingValue(rating.Value, "")) + acc,
    0
  );
  return Math.floor(sum / ratings.length / 10);
};

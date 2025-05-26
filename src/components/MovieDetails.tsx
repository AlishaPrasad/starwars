import { useParams } from "react-router-dom";
import { getMovies } from "../Reducer/moviesSlice";
import { useAppSelector } from "../app/hooks";
import { Movie, Rating } from "../types/movie.types";
import { memo } from "react";
import { formatRatingValue } from "../utils/movieUtils";
import { Star } from "./Star";

interface RatingProps {
  source: string;
  value: string;
}
const RatingTag = ({ source, value }: RatingProps) => {
  return (
    <div className="mr1 p0_5 tag">
      {source}: {formatRatingValue(value, "%")}
    </div>
  );
};

const MovieDetails = memo(() => {
  const { id } = useParams();
  const movies = useAppSelector(getMovies);
  const selectedMovie = movies.find(
    (movie: Movie) => movie.episode_id === parseInt(id || "0")
  );

  const { title, opening_crawl, director, poster, ratings, averageRating } =
    selectedMovie || {};

  return (
    <section className="w50 p1">
      <h1>{title}</h1>
      <div className="flex ">
        <img src={poster} alt={title} width={200} height={250} />
        <div className="lh2 p1">{opening_crawl}</div>
      </div>
      <br />
      <div>
        Average rating:{" "}
        {[...Array(10)].map((_, index) => (
          <Star key={index} filled={index < (averageRating || 0)} />
        ))}
      </div>
      <br />
      <div className="flex">
        {ratings?.map((rating: Rating) => (
          <RatingTag
            source={rating.Source}
            value={rating.Value}
            key={rating.Source}
          />
        ))}
      </div>
      <br />
      <div>Directed by: {director}</div>
    </section>
  );
});

export default MovieDetails;

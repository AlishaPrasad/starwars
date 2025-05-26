export interface Rating {
  Source: string;
  Value: string;
}

export interface Movie {
  episode_id: number;
  title: string;
  release_date: string;
  opening_crawl: string;
  director: string;
  ratings: Rating[];
  poster: string;
  averageRating: number;
}

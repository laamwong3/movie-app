// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export interface Movie {
  page?: number;
  results?: MovieResult[];
  total_pages?: number;
  total_results?: number;
}

export interface MovieResult {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  id?: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: Date;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Movie>
) {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => res.status(200).json(data))
    .catch((e) => console.log(e));
}

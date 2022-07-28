// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export interface Tv {
  page?: number;
  results?: TvResult[];
  total_pages?: number;
  total_results?: number;
}

export interface TvResult {
  backdrop_path?: null | string;
  first_air_date?: Date;
  genre_ids?: number[];
  id?: number;
  name?: string;
  origin_country?: string[];
  original_language?: string;
  original_name?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  vote_average?: number;
  vote_count?: number;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Tv>) {
  const url = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=${req.query.genre_id}&page=${req.query.page}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => res.status(200).json(data))
    .catch((e) => console.log(e));
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export interface Trending {
  page?: number;
  results?: TrendingResult[];
  total_pages?: number;
  total_results?: number;
}

export interface TrendingResult {
  adult?: boolean;
  backdrop_path?: string;
  id?: number;
  title?: string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  poster_path?: string;
  media_type?: string;
  genre_ids?: number[];
  popularity?: number;
  release_date?: Date;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  name?: string;
  original_name?: string;
  first_air_date?: Date;
  origin_country?: string[];
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Trending>
) {
  const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => res.status(200).json(data))
    .catch((e) => console.log(e));

  // res.status(200).json({ name: "John Doe" });
}

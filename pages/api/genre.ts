// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export interface Genre {
  genres?: GenreResult[];
}

export interface GenreResult {
  id?: number;
  name?: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Genre>
) {
  const url = `https://api.themoviedb.org/3/genre/${req.query.media_type}/list?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=en-US`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => res.status(200).json(data))
    .catch((e) => console.log(e));
}

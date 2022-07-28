// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Movie } from "./movie";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Movie>
) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=en-US&page=${req.query.page}&query=${req.query.query}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => res.status(200).json(data))
    .catch((e) => console.log(e));
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export interface MovieDetails {
  adult?: boolean;
  backdrop_path?: string;
  belongs_to_collection?: null;
  budget?: number;
  genres?: Genre[];
  homepage?: string;
  id?: number;
  imdb_id?: string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  production_companies?: ProductionCompany[];
  production_countries?: ProductionCountry[];
  release_date?: Date;
  revenue?: number;
  runtime?: number;
  spoken_languages?: SpokenLanguage[];
  status?: string;
  tagline?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}

export interface Genre {
  id?: number;
  name?: string;
}

export interface ProductionCompany {
  id?: number;
  logo_path?: string;
  name?: string;
  origin_country?: string;
}

export interface ProductionCountry {
  iso_3166_1?: string;
  name?: string;
}

export interface SpokenLanguage {
  english_name?: string;
  iso_639_1?: string;
  name?: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<MovieDetails>
) {
  const url = `https://api.themoviedb.org/3/movie/${req.query.id}?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=en-US`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => res.status(200).json(data))
    .catch((e) => console.log(e));
}

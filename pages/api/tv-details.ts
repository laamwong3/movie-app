// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
export interface TvDetails {
  adult?: boolean;
  backdrop_path?: string;
  created_by?: any[];
  episode_run_time?: any[];
  first_air_date?: Date;
  genres?: Genre[];
  homepage?: string;
  id?: number;
  in_production?: boolean;
  languages?: string[];
  last_air_date?: Date;
  last_episode_to_air?: LastEpisodeToAir;
  name?: string;
  next_episode_to_air?: null;
  networks?: any[];
  number_of_episodes?: number;
  number_of_seasons?: number;
  origin_country?: string[];
  original_language?: string;
  original_name?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  production_companies?: ProductionCompany[];
  production_countries?: ProductionCountry[];
  seasons?: Season[];
  spoken_languages?: SpokenLanguage[];
  status?: string;
  tagline?: string;
  type?: string;
  vote_average?: number;
  vote_count?: number;
}

export interface Genre {
  id?: number;
  name?: string;
}

export interface LastEpisodeToAir {
  air_date?: Date;
  episode_number?: number;
  id?: number;
  name?: string;
  overview?: string;
  production_code?: string;
  runtime?: number;
  season_number?: number;
  show_id?: number;
  still_path?: null;
  vote_average?: number;
  vote_count?: number;
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

export interface Season {
  air_date?: Date;
  episode_count?: number;
  id?: number;
  name?: string;
  overview?: string;
  poster_path?: string;
  season_number?: number;
}

export interface SpokenLanguage {
  english_name?: string;
  iso_639_1?: string;
  name?: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TvDetails>
) {
  const url = `https://api.themoviedb.org/3/tv/${req.query.id}?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=en-US`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => res.status(200).json(data))
    .catch((e) => console.log(e));
}

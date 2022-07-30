// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export interface Credits {
  id?: number;
  cast?: Cast[];
  crew?: Cast[];
}

export interface Cast {
  adult?: boolean;
  gender?: number;
  id?: number;
  known_for_department?: Department;
  name?: string;
  original_name?: string;
  popularity?: number;
  profile_path?: null | string;
  cast_id?: number;
  character?: string;
  credit_id?: string;
  order?: number;
  department?: Department;
  job?: string;
}

export enum Department {
  Acting = "Acting",
  Art = "Art",
  Camera = "Camera",
  CostumeMakeUp = "Costume & Make-Up",
  Crew = "Crew",
  Directing = "Directing",
  Editing = "Editing",
  Production = "Production",
  Sound = "Sound",
  VisualEffects = "Visual Effects",
  Writing = "Writing",
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Credits>
) {
  const url = `https://api.themoviedb.org/3/${req.query.type}/${req.query.id}/credits?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=en-US`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => res.status(200).json(data))
    .catch((e) => console.log(e));
}

import type { NextPage } from "next";
import useSWR from "swr";
import { Movie } from "./api/movie";

const Movie: NextPage = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: movieData, isValidating } = useSWR<Movie>(
    `/api/movie`,
    fetcher
  );

  console.log(movieData);

  return (
    <>
      <div>movie</div>
    </>
  );
};

export default Movie;

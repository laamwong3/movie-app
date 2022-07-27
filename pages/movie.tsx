import { Chip, Grid, Stack } from "@mui/material";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Genre } from "./api/genre";
import { Movie } from "./api/movie";
import DoneIcon from "@mui/icons-material/Done";
import { Done } from "@mui/icons-material";

interface GenreSet {
  id: number;
  label: string;
  color: "default" | "primary";
  selected: boolean;
}

const Movie: NextPage = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: movieData } = useSWR<Movie>(`/api/movie`, fetcher);
  const { data: genreData } = useSWR<Genre>(
    `/api/genre?media_type=${"movie"}`,
    fetcher
  );

  const [genres, setGenres] = useState<GenreSet[]>([]);

  useEffect(() => {
    if (genreData?.genres) {
      let tempGenres: GenreSet[] = [];
      genreData.genres.map((genre, index) => {
        tempGenres.push({
          id: genre.id ?? -1,
          color: "primary",
          label: genre.name ?? "",
          selected: false,
        });
      });
      setGenres(tempGenres);
    }
  }, [genreData]);

  const handleClick = (genreId: number) => {
    // const genres.ma
  };

  console.log(genres);

  return (
    <>
      <Grid container justifyContent="center" gap={1} marginTop={-3}>
        {genres &&
          genres.map((genre, index) => (
            <Grid item key={index}>
              <Chip
                icon={genre.selected ? <DoneIcon /> : undefined}
                onClick={() => handleClick(genre.id)}
                label={genre.label}
                color={genre.color}
                clickable
              />
            </Grid>
          ))}

        {/* {genreData?.genres &&
          genreData.genres.map((gen, index) => (
            <Grid item key={index}>
              <Chip label={gen.name} clickable />
            </Grid>
          ))} */}
      </Grid>
    </>
  );
};

export default Movie;

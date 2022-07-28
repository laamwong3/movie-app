import { Chip, Grid, Stack } from "@mui/material";
import type { NextPage } from "next";
import { MouseEvent, useEffect, useState } from "react";
import useSWR from "swr";
import { Genre, GenreResult } from "./api/genre";
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
      genreData.genres.map((genre) => {
        tempGenres.push({
          id: genre.id ?? -1,
          color: "default",
          label: genre.name ?? "",
          selected: false,
        });
      });
      setGenres(tempGenres);
    }
  }, [genreData]);

  const handleClick = (genreClicked: GenreSet) => {
    setGenres((prevState) =>
      prevState.map((genre) =>
        genre.id === genreClicked.id
          ? {
              ...genre,
              selected: !genre.selected,
              color: genre.color === "primary" ? "default" : "primary",
            }
          : genre
      )
    );
  };

  return (
    <>
      <Grid container justifyContent="center" gap={1} marginTop={-3}>
        {genres &&
          genres.map((genre, index) => (
            <Grid item key={index}>
              <Chip
                icon={genre.selected ? <DoneIcon /> : undefined}
                label={genre.label}
                color={genre.color}
                clickable
                onClick={() => handleClick(genre)}
              />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default Movie;

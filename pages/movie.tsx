import { Chip, Fade, Grid, Pagination, Stack } from "@mui/material";
import type { NextPage } from "next";
import { MouseEvent, useEffect, useState } from "react";
import useSWR from "swr";
import { Genre, GenreResult } from "./api/media";
import { Movie } from "./api/movie";
import DoneIcon from "@mui/icons-material/Done";
import { Done } from "@mui/icons-material";
import { MovieCard } from "../components";

interface GenreSet {
  id: number;
  label: string;
  color: "default" | "primary";
  selected: boolean;
}

const Movie: NextPage = () => {
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState<GenreSet[]>([]);
  const [genreId, setGenreId] = useState("");

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: movieData, isValidating } = useSWR<Movie>(
    `/api/movie/?genre_id=${genreId}&page=${page}`,
    fetcher
  );
  const { data: genreData } = useSWR<Genre>(
    `/api/media?media_type=${"movie"}`,
    fetcher
  );

  useEffect(() => {
    if (genres) {
      setGenreId(
        genres
          .filter((genre) => genre.selected)
          .map((temp) => temp.id.toString())
          .toString()
      );
    }
  }, [genres]);

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
    setPage(1);
  };

  return (
    <>
      <Grid container justifyContent="center" gap={2} marginTop={-3}>
        {genres &&
          genres.map((genre, index) => (
            <Grid item key={index}>
              <Chip
                sx={{ fontWeight: "bold" }}
                icon={genre.selected ? <DoneIcon /> : undefined}
                label={genre.label}
                color={genre.color}
                clickable
                onClick={() => handleClick(genre)}
              />
            </Grid>
          ))}
      </Grid>
      <Grid container gap={8} justifyContent="center" marginTop={5}>
        {movieData?.results &&
          movieData.results.map((movie, index) => (
            <Fade in timeout={1000} key={index}>
              <Grid item>
                <MovieCard data={movie} />
              </Grid>
            </Fade>
          ))}
      </Grid>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        height={200}
      >
        <Pagination
          sx={{ display: isValidating ? "none" : "block" }}
          count={movieData?.total_pages}
          size="large"
          page={page}
          onChange={(event, newValue) => {
            setPage(newValue);
          }}
        />
      </Stack>
    </>
  );
};

export default Movie;

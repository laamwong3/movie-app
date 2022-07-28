import { Fade, Grid, Pagination, Stack, Typography } from "@mui/material";
import type { NextPage } from "next";
import { useState } from "react";
import useSWR from "swr";
import { MovieCard, SearchBar, TvCard } from "../components";
import { useSearchBarContext } from "../contexts/SearchBarContext";
import { Movie } from "./api/movie";
import { Tv } from "./api/tv";

const Search: NextPage = () => {
  const {
    mediaType,
    setMediaType,
    keywords,
    setKeywords,
    searchPage,
    searchDetails,
    setSearchPage,
  } = useSearchBarContext();

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data: movieSearchData, isValidating: isValidatingMovie } =
    useSWR<Movie>(
      () =>
        mediaType.mediaType === "movie" && keywords.trim() !== ""
          ? `/api/search-movie?page=${searchPage}&query=${keywords}`
          : null,
      fetcher
    );

  const { data: tvSearchData, isValidating: isValidatingTv } = useSWR<Tv>(
    () =>
      mediaType.mediaType === "tv" && keywords.trim() !== ""
        ? `/api/search-tv?page=${searchPage}&query=${keywords}`
        : null,
    fetcher
  );

  // console.log(searchDetails);

  return (
    <>
      <SearchBar />
      {keywords.trim() !== "" ? (
        <>
          {mediaType.mediaType === "movie" ? (
            <>
              <Grid container gap={8} justifyContent="center" marginTop={5}>
                {movieSearchData?.results &&
                  movieSearchData.results.map((movie, index) => (
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
                  sx={{ display: isValidatingMovie ? "none" : "block" }}
                  count={movieSearchData?.total_pages}
                  size="large"
                  page={searchPage}
                  onChange={(event, newValue) => {
                    setSearchPage(newValue);
                  }}
                />
              </Stack>
            </>
          ) : (
            <>
              <Grid container gap={8} justifyContent="center" marginTop={5}>
                {tvSearchData?.results &&
                  tvSearchData.results.map((movie, index) => (
                    <Fade in timeout={1000} key={index}>
                      <Grid item>
                        <TvCard data={movie} />
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
                  sx={{ display: isValidatingTv ? "none" : "block" }}
                  count={tvSearchData?.total_pages}
                  size="large"
                  page={searchPage}
                  onChange={(event, newValue) => {
                    setSearchPage(newValue);
                  }}
                />
              </Stack>
            </>
          )}
        </>
      ) : (
        <>
          <Typography marginTop={5} variant="h3" textAlign="center">
            NO DATA
          </Typography>
        </>
      )}
    </>
  );
};

export default Search;

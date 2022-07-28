import { Fade, Grid, Pagination, Stack } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import useSWR from "swr";
import { Trending } from "./api/trending";
import { img_300 } from "../config/imageConfig";
import { MovieCard, TrendingCard } from "../components";
import { useState } from "react";
import Movie from "./movie";

const Home: NextPage = () => {
  const [page, setPage] = useState(1);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: trendingData, isValidating } = useSWR<Trending>(
    `/api/trending?page=${page}`,
    fetcher
  );

  // console.log(page);
  return (
    <>
      <Head>
        <title>Movie App</title>
      </Head>
      <Grid container gap={8} justifyContent="center">
        {trendingData?.results &&
          trendingData.results.map((trending, index) => (
            <Fade in timeout={1000} key={index}>
              <Grid item>
                <TrendingCard data={trending} />
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
          count={trendingData?.total_pages}
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

export default Home;

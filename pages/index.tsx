import { Grid } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import useSWR from "swr";
import { Trending } from "./api/trending";
import { img_300 } from "../config/imageConfig";
import { MovieCard } from "../components";

const Home: NextPage = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: trendingData } = useSWR<Trending>("/api/trending", fetcher);

  console.log(trendingData);
  return (
    <>
      <Head>
        <title>Movie App</title>
      </Head>
      <Grid container gap={8} justifyContent="center">
        {trendingData?.results &&
          trendingData.results.map((movie, index) => (
            <Grid item key={index}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default Home;

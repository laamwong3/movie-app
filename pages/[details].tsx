import { ToysSharp } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Carousel } from "../components";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../config/imageConfig";
import { MovieDetails } from "./api/movie-details";
import { TvDetails } from "./api/tv-details";
import { Video } from "./api/video";

interface Contents {
  imageLandscape: string;
  imageNormal: string;
  title: string;
  year: string;
  tagline: string;
  description: string;
  video: string;
}

const boxSize = 500;

const Details: NextPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const router = useRouter();
  const { type, details } = router.query;
  const [contents, setContents] = useState<Contents>();

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: tvDetails } = useSWR<TvDetails>(
    () => (type === "tv" ? `/api/tv-details?id=${details}` : null),
    fetcher
  );
  const { data: movieDetails } = useSWR<MovieDetails>(
    () => (type === "movie" ? `/api/movie-details?id=${details}` : null),
    fetcher
  );
  const { data: video } = useSWR<Video>(
    `/api/video?id=${details}&type=${type}`,
    fetcher
  );

  //   console.log(matches);
  useEffect(() => {
    if (tvDetails && video?.results && video?.results[0].key) {
      setContents({
        imageNormal: tvDetails.poster_path
          ? `${img_500}${tvDetails.poster_path}`
          : unavailable,
        imageLandscape: tvDetails.backdrop_path
          ? `${img_500}${tvDetails.backdrop_path}`
          : unavailableLandscape,
        title: tvDetails.name ?? "No Name",
        description: tvDetails.overview ?? "No Description",
        tagline: tvDetails.tagline ?? "No Tagline",
        video: video.results[0]?.key ?? "",
        year: tvDetails.first_air_date
          ? new Date(tvDetails.first_air_date).getFullYear().toString()
          : "No Date",
      });
    } else if (movieDetails && video?.results && video?.results[0].key) {
      setContents({
        imageNormal: movieDetails.poster_path
          ? `${img_500}${movieDetails.poster_path}`
          : unavailable,
        imageLandscape: movieDetails.backdrop_path
          ? `${img_500}${movieDetails.backdrop_path}`
          : unavailableLandscape,
        title: movieDetails.title ?? "No Name",
        description: movieDetails.overview ?? "No Description",
        tagline: movieDetails.tagline ?? "No Tagline",
        video: video?.results[0].key ?? "",
        year: movieDetails.release_date
          ? new Date(movieDetails.release_date).getFullYear().toString()
          : "No Date",
      });
    }
  }, [tvDetails, movieDetails, video]);

  // console.log(contents?.video);
  return (
    <>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        mt={{ xs: 0, md: -7 }}
      >
        <Card
          sx={{
            width: "80vw",
            height: "400",
            mb: 4,
            // width: { xs: "80vw", md: "90vw" },
            // height: { xs: 600, md: "80vh" },
            borderRadius: 3,
          }}
        >
          <Stack direction="column" sx={{ height: "100%" }}>
            {contents && (
              <>
                <Image
                  //   style={{ borderRadius: 5 }}
                  src={contents.imageLandscape}
                  width={800}
                  height={400}
                  alt={contents.title}
                />

                <CardContent
                  sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    height: 400,
                  }}
                >
                  <Typography variant="h4" textAlign="center" gutterBottom>
                    {contents.title}
                    {` (${contents.year})`}
                  </Typography>
                  <Paper
                    sx={{
                      // border: "1px solid white",
                      p: 1,
                      height: 100,
                      width: "100%",
                      overflow: "scroll",
                      scrollBehavior: "smooth",
                      mt: 2,
                    }}
                    elevation={12}
                  >
                    <Typography variant="body2" textAlign="center">
                      {contents.description}
                    </Typography>
                  </Paper>
                  {details && type && (
                    <Box sx={{ mt: 5 }}>
                      <Carousel
                        id={details?.toString()}
                        type={type?.toString()}
                      />
                    </Box>
                  )}
                  <Stack
                    spacing={5}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    mt={5}
                  >
                    <Button
                      variant="contained"
                      href={`https://www.youtube.com/watch?v=${contents.video}`}
                      target="_blank"
                    >
                      WATCH TRAILER
                    </Button>
                    <Button variant="contained" onClick={() => router.back()}>
                      BACK
                    </Button>
                  </Stack>
                </CardContent>
              </>
            )}
          </Stack>
        </Card>
      </Stack>
    </>
  );
};

export default Details;

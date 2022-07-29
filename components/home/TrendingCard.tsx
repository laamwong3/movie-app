import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Badge, Box, CardActionArea, Stack } from "@mui/material";
import Image from "next/image";
import { TrendingResult } from "../../pages/api/trending";
import { img_300, unavailable } from "../../config/imageConfig";
import { motion } from "framer-motion";
import { MovieResult } from "../../pages/api/movie";
import { useEffect } from "react";
import { TvResult } from "../../pages/api/tv";
import { useModalContext } from "../../contexts/ModalContext";
import { TrendingDetailsModal } from "../../components";
import useSWR from "swr";
import { TvDetails } from "../../pages/api/tv-details";
import { MovieDetails } from "../../pages/api/movie-details";

interface TrendingCardProps {
  data: TrendingResult;
}
const cardSize = 300;

export default function TrendingCard({ data }: TrendingCardProps) {
  const { setOpen } = useModalContext();
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: tvDetails } = useSWR<TvDetails>(
    () => (data.media_type === "tv" ? `/api/tv-details?id=${data.id}` : null),
    fetcher
  );
  const { data: movieDetails } = useSWR<MovieDetails>(
    () =>
      data.media_type === "movie" ? `/api/movie-details?id=${data.id}` : null,
    fetcher
  );

  return (
    <>
      {data.media_type === "tv" ? (
        <>{tvDetails && <TrendingDetailsModal data={tvDetails} />}</>
      ) : (
        <>{movieDetails && <TrendingDetailsModal data={movieDetails} />}</>
      )}

      <Badge
        badgeContent={data.vote_average && data.vote_average?.toFixed(1)}
        color={data.vote_average && data.vote_average > 6 ? "success" : "error"}
        // component={motion.div}
        // whileHover={{ scale: 1.1, opacity: 1 }}
        // whileTap={{ scale: 0.9, opacity: 1 }}
      >
        <Card
          sx={{
            width: cardSize,
            borderRadius: 5,
            height: cardSize * 2,
          }}
          elevation={12}
        >
          <CardActionArea
            onClick={() => setOpen(true)}
            sx={{
              width: "100%",
              borderRadius: 5,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image
              style={{ flex: 1 }}
              src={
                data.poster_path ? `${img_300}${data.poster_path}` : unavailable
              }
              width={cardSize}
              height={cardSize * 1.5}
              alt={data.title}
            />

            <CardContent
              sx={{
                flex: 1,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
                gutterBottom
                component="div"
                textAlign="center"
                variant="h6"
              >
                {data.title || data.name || "NoTitle"}
              </Typography>
              <Stack direction="row">
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ flex: 1 }}
                >
                  {data.media_type
                    ? data.media_type?.charAt(0).toUpperCase() +
                      data.media_type.slice(1)
                    : "Unknown Type"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {(data.release_date &&
                    new Date(data.release_date).toDateString()) ||
                    (data.first_air_date &&
                      new Date(data.first_air_date).toDateString()) ||
                    "Unknown Date"}
                </Typography>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      </Badge>
    </>
  );
}

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
import { useRouter } from "next/router";

interface TvCardProps {
  data: TvResult;
}
const cardSize = 300;

export default function TvCard({ data }: TvCardProps) {
  const router = useRouter();
  return (
    <Badge
      badgeContent={data.vote_average && data.vote_average?.toFixed(1)}
      color={data.vote_average && data.vote_average > 6 ? "success" : "error"}
      component={motion.div}
      whileHover={{ scale: 1.1, opacity: 1 }}
      whileTap={{ scale: 0.9, opacity: 1 }}
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
          onClick={() => router.push(`/${data.id}?type=tv`)}
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
            alt={data.name}
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
              {data.name ?? "No Title"}
            </Typography>
            <Stack direction="row">
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ flex: 1 }}
              >
                Tv
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {data.first_air_date
                  ? new Date(data.first_air_date).toDateString()
                  : "Unknown Date"}
              </Typography>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </Badge>
  );
}

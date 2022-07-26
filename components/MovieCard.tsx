import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Stack } from "@mui/material";
import Image from "next/image";
import { TrendingResult } from "../pages/api/trending";
import { img_300 } from "../config/imageConfig";
import { motion } from "framer-motion";

interface MovieCardProps {
  movie: TrendingResult;
}
const cardSize = 300;

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card
      sx={{
        maxWidth: cardSize,
        borderRadius: 5,
        maxHeight: cardSize * 2,
      }}
      elevation={12}
      component={motion.div}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <CardActionArea>
        <Image
          src={`${img_300}${movie.poster_path}`}
          width={cardSize}
          height={cardSize * 1.5}
          alt={movie.title}
        />
        <CardContent>
          <Typography
            sx={{ fontSize: 10, fontWeight: "bold" }}
            gutterBottom
            component="div"
            textAlign="center"
          >
            {movie.title ?? "No Title"}
          </Typography>
          <Stack direction="row">
            <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
              {movie.media_type}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {movie.release_date &&
                new Date(movie.release_date).toDateString()}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

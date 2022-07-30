import { Box, Stack } from "@mui/material";
import Image from "next/image";
import React from "react";
import AliceCarousel, { Responsive } from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import useSWR from "swr";
import { img_300, unavailable } from "../../config/imageConfig";
import { Credits } from "../../pages/api/credits";

interface CarouselProps {
  id: string;
  type: string;
}

const Carousel = ({ id, type }: CarouselProps) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: credits } = useSWR<Credits>(
    `/api/credits?type=${type}&id=${id}`,
    fetcher
  );

  const items = credits?.cast?.map((each) => (
    <>
      <Stack direction="row">
        <Image
          src={
            each.profile_path ? `${img_300}${each.profile_path}` : unavailable
          }
          alt={each.name}
          width={200}
          height={300}
          onDragStart={(e) => e.preventDefault()}
        />
      </Stack>
    </>
  ));
  const responsive: Responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 11,
    },
  };

  return (
    <>
      <AliceCarousel
        items={items}
        responsive={responsive}
        mouseTracking
        infinite
        disableButtonsControls
        disableDotsControls
        autoPlay
        autoPlayInterval={1000}
      />
    </>
  );
};

export default Carousel;

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useModalContext } from "../../contexts/ModalContext";
import { SxProps, Theme } from "@mui/material";
import useSWR from "swr";
import { TvDetails } from "../../pages/api/tv-details";
import { MovieDetails } from "../../pages/api/movie-details";
import { type } from "os";
import Image from "next/image";
import {
  img_300,
  img_500,
  unavailableLandscape,
} from "../../config/imageConfig";

const modalSize = 600;

const style: SxProps<Theme> = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 1,
  width: modalSize,
};

interface TrendingDetailsModalProps {
  data: MovieDetails & TvDetails;
}

export default function DetailsModal({ data }: TrendingDetailsModalProps) {
  const { open, setOpen } = useModalContext();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log("Detail modal", data);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        hideBackdrop
      >
        <Box sx={style}>
          <Image
            src={
              data.backdrop_path
                ? `${img_500}${data.backdrop_path}`
                : unavailableLandscape
            }
            width={modalSize * 2}
            height={modalSize}
            alt={data.title || data.name}
          />
        </Box>
      </Modal>
    </div>
  );
}

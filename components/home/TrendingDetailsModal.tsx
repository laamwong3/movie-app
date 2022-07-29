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

const modalSize = 500;

const style: SxProps<Theme> = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  width: { sm: modalSize, lg: modalSize * 2, xs: 300 },
};

interface TrendingDetailsModalProps {
  data: MovieDetails | TvDetails;
}

type MediaType = MovieDetails | TvDetails;
function typeCheck(checkingType: MediaType): checkingType is TvDetails {
  if ((checkingType as TvDetails).first_air_date) {
    return true;
  }
  return false;
}
// type isTv<T> = T extends MovieDetails ? TvDetails : MovieDetails;
// type result = isTv<MediaType>;
export default function TrendingDetailsModal({
  data,
}: TrendingDetailsModalProps) {
  const { open, setOpen } = useModalContext();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal open={open} onClose={handleClose} hideBackdrop>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
}

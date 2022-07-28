import { Autocomplete, Box, IconButton, Stack, TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import React from "react";
import { useSearchBarContext } from "../../contexts/SearchBarContext";
import { motion } from "framer-motion";

export interface Media {
  mediaType: "tv" | "movie";
  name: string;
}

export const mediaList: Media[] = [
  {
    mediaType: "movie",
    name: "MOVIE",
  },
  { mediaType: "tv", name: "TV" },
];
const SearchBar = () => {
  const { mediaType, setMediaType } = useSearchBarContext();
  return (
    <>
      <Stack direction="row" justifyContent="center" sx={{ marginTop: -3 }}>
        <TextField
          label="Search for movies"
          variant="outlined"
          sx={{ width: "50%" }}
        />
        <Autocomplete
          sx={{ width: 150 }}
          options={mediaList}
          value={mediaType}
          onChange={(e, newValue) => {
            if (newValue) {
              setMediaType(newValue);
            }
          }}
          autoHighlight
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label="Media Type" />}
        />
        <Box
          component={motion.div}
          whileHover={{ scale: 2 }}
          whileTap={{ scale: 1 }}
        >
          <IconButton size="large" disableRipple>
            <SearchOutlinedIcon fontSize="large" />
          </IconButton>
        </Box>
      </Stack>
    </>
  );
};

export default SearchBar;

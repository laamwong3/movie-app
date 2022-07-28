import { Autocomplete, Box, IconButton, Stack, TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import React, { useState } from "react";
import { useSearchBarContext } from "../../contexts/SearchBarContext";
import { motion } from "framer-motion";
import useSWR from "swr";

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
  const {
    keywords,
    mediaType,
    setMediaType,
    setKeywords,
    setSearchPage,
    setSearchDetails,
  } = useSearchBarContext();

  return (
    <>
      <Stack direction="row" justifyContent="center" sx={{ marginTop: -3 }}>
        <TextField
          label="Search for movies"
          placeholder="Type any keywords"
          variant="outlined"
          value={keywords}
          onChange={(e) => {
            e.preventDefault();
            setKeywords(e.target.value);
            setSearchPage(1);
          }}
          sx={{ width: "50%" }}
        />
        <Autocomplete
          sx={{ width: 150 }}
          options={mediaList}
          value={mediaType}
          onChange={(e, newValue) => {
            e.preventDefault();
            if (newValue) {
              setMediaType(newValue);
              setSearchPage(1);
            }
          }}
          autoHighlight
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label="Media Type" />}
        />
        {/* <Box
          component={motion.div}
          whileHover={{ scale: 1.5 }}
          whileTap={{ scale: 1 }}
        >
          <IconButton
            size="large"
            disableRipple
            onClick={(e) => {
              e.preventDefault();
              if (keywords.trim() !== "") {
                setSearchPage(1);
                setSearchDetails({
                  isValid: true,
                  keywords,
                  type: mediaType.mediaType,
                });
              } else {
                setSearchDetails({
                  isValid: false,
                  keywords,
                  type: mediaType.mediaType,
                });
              }
            }}
          >
            <SearchOutlinedIcon fontSize="large" />
          </IconButton>
        </Box> */}
      </Stack>
    </>
  );
};

export default SearchBar;

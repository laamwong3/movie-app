import { IconButton, Stack, TextField } from "@mui/material";
import type { NextPage } from "next";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { CustomTab } from "../components";

const Search: NextPage = () => {
  return (
    <>
      <Stack direction="row" justifyContent="center" sx={{ marginTop: -3 }}>
        <TextField label="Search" variant="outlined" sx={{ width: "50%" }} />
        <IconButton size="large">
          <SearchOutlinedIcon fontSize="large" />
        </IconButton>
      </Stack>
      <CustomTab />
    </>
  );
};

export default Search;

import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import TvIcon from "@mui/icons-material/Tv";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { useRouter } from "next/router";

export default function BottomNav() {
  const router = useRouter();
  const [value, setValue] = React.useState(0);

  return (
    <Box>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={12}
      >
        <BottomNavigation
          sx={{ display: "flex", justifyContent: "space-evenly" }}
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            onClick={() => router.push("/")}
            label="Trending"
            icon={<WhatshotIcon />}
          />

          <BottomNavigationAction
            onClick={() => router.push("/movie")}
            label="Movies"
            icon={<SlideshowIcon />}
          />
          <BottomNavigationAction
            onClick={() => router.push("/tv")}
            label="TV Series"
            icon={<TvIcon />}
          />
          <BottomNavigationAction
            onClick={() => router.push("/search")}
            label="Search"
            icon={<SearchIcon />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

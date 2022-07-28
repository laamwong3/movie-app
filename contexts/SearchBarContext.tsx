import React, { createContext, useContext, useState } from "react";
import { Media, mediaList } from "../components/search/SearchBar";

interface SearchBarContextProps {
  children: React.ReactNode;
}

interface StatesTypes {
  mediaType: Media;
  setMediaType: React.Dispatch<React.SetStateAction<Media>>;
  keywords: string;
  setKeywords: React.Dispatch<React.SetStateAction<string>>;
  searchPage: number;
  setSearchPage: React.Dispatch<React.SetStateAction<number>>;
  searchDetails: SearchDetails;
  setSearchDetails: React.Dispatch<React.SetStateAction<SearchDetails>>;
}

interface SearchDetails {
  type: "tv" | "movie";
  keywords: string;
  isValid: boolean;
}

const SearchBarContextStore = createContext({} as StatesTypes);

const SearchBarContext = ({ children }: SearchBarContextProps) => {
  const [mediaType, setMediaType] = useState<Media>(mediaList[0]);
  const [keywords, setKeywords] = useState("");
  const [searchPage, setSearchPage] = useState(1);
  const [searchDetails, setSearchDetails] = useState({} as SearchDetails);

  return (
    <SearchBarContextStore.Provider
      value={{
        mediaType,
        setMediaType,
        keywords,
        setKeywords,
        searchPage,
        setSearchPage,
        searchDetails,
        setSearchDetails,
      }}
    >
      {children}
    </SearchBarContextStore.Provider>
  );
};

export default SearchBarContext;
export const useSearchBarContext = () => useContext(SearchBarContextStore);

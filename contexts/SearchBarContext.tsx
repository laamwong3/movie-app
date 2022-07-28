import React, { createContext, useContext, useState } from "react";
import { Media, mediaList } from "../components/search/SearchBar";

interface SearchBarContextProps {
  children: React.ReactNode;
}

interface StatesTypes {
  mediaType: Media;
  setMediaType: React.Dispatch<React.SetStateAction<Media>>;
}

const SearchBarContextStore = createContext({} as StatesTypes);

const SearchBarContext = ({ children }: SearchBarContextProps) => {
  const [mediaType, setMediaType] = useState<Media>(mediaList[0]);

  return (
    <SearchBarContextStore.Provider value={{ mediaType, setMediaType }}>
      {children}
    </SearchBarContextStore.Provider>
  );
};

export default SearchBarContext;
export const useSearchBarContext = () => useContext(SearchBarContextStore);

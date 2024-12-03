import { createContext, ReactNode, useContext, useState } from "react";

interface SearchContext {
  searchFor: string;
  setSearchFor: (term: string) => void;
}

const SearchContext = createContext<SearchContext | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchFor, setSearchFor] = useState<string>("");

  return (
    <SearchContext.Provider value={{ searchFor, setSearchFor }}>
      {children}
    </SearchContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("failed");
  }
  return context;
};


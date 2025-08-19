import React, { useState } from 'react';
import type { SearchContextType } from 'index';
import { createContext } from 'react';

const SearchContext = createContext<SearchContextType>({} as SearchContextType);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => React.useContext(SearchContext);

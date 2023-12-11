import React, { useState } from 'react';
import {
  SearchBarWrapper,
  SearchForm,
  SearchButtonText,
  SearchButton,
  SearchInput,
} from './SearchBar.styled';

export const SearchBar = ({ getSearch }) => {
  const [search, setSearch] = useState('');

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    getSearch(search);
  };

  return (
    <SearchBarWrapper>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <SearchButtonText>Search</SearchButtonText>
        </SearchButton>

        <SearchInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleSearch}
          value={search}
        />
      </SearchForm>
    </SearchBarWrapper>
  );
};

import React from 'react'
import SearchFiltersView from './SearchFiltersView'

const SearchFiltersContainer = (props) => {
    const options = [
    { value: 25, label: "25" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ];
  return (
    <>
      <SearchFiltersView options={options} {...props} />
    </>
  )
}

export default SearchFiltersContainer

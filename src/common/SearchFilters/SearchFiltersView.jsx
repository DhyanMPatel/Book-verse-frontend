import React from 'react'

const SearchFiltersView = (props) => {
    const {
  searchTerm,
  handleSearchChange,
  itemsPerPage,
  handleItemsPerPageChange,
  children,
  classNames = "",
  noOfItemParPage = true,
  placeholder = "Search...",
} = props;
  return (
    <div
      className={`${classNames ? classNames : "main-searching-section mb-3"
        }  `}
    >
      <div className="searching-inner">
        <FormControl
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          className="search-filter"
          onChange={handleSearchChange}
        />
        {children}
      </div>
    </div>
  );
}

export default SearchFiltersView

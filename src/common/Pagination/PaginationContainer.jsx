import React from 'react'
import PaginationView from './PaginationView'

const PaginationContainer = (props) => {

      const pageButtonsToShow = 1; // Number of page buttons to show (excluding next/previous buttons)

  return (
    <>
        <PaginationView pageButtonsToShow={pageButtonsToShow} {...props} />
    </>
  )
}

export default PaginationContainer

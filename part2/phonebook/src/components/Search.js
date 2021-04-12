import React from 'react'

const Search = ( { searchRes, searchHandler }) => {
  
    return (
        <div>
        Filter shown with
        <input
        value={searchRes}
        onChange={searchHandler}
        />
      </div>
    )
}

export default Search
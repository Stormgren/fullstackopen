import React from 'react'

const Filter = (props) => {
    return (
        <div>
        Filter show with <input value={props.inputValue} onChange={props.filterHandler}/>
      </div>
    )
}

export default Filter;
import React from 'react'

const Persons = (props) => {
    return (
        <p key={props.name}>{props.name} {props.number}</p>
    )
}

export default Persons
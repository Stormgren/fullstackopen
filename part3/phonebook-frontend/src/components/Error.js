import React from 'react'

const Error = ( { errorMsg }) => {
    if (errorMsg === null){
        return null
    }
    return (
        <div className="error">
            {errorMsg}
        </div>
    )
}

export default Error
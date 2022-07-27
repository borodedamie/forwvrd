import { useState, useEffect } from 'react'

function useContenful(query) {
let [ data, setData ] = useState([])
let [ errors, setErrors ] = useState(null)

useEffect(() => {
    fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_SPACE_ID}`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_CDA_TOKEN}`
    },
    body: JSON.stringify( { query } )
    })
    .then((response) => response.json())
    .then(({ data, errors }) => {
        if(errors) setErrors(errors)
        if(data) setData(data)      
    })
    .catch((error) => setErrors([error]))
}, [ query ])

    return { data, errors }
}

export default useContenful
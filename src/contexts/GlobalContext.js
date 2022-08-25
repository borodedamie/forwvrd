import React, { createContext, useState } from 'react'

export const GlobalContext = createContext({})

export const GlobalProvider = ({ children }) => {
    const [ search, setSearch ] = useState("")
    const [ spinner, setSpinner ] = useState(false)

    return (
        <GlobalContext.Provider value={{ search, setSearch, spinner, setSpinner }} >
            { children }
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;
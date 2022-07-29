import React, { createContext, useState } from 'react'

export const GlobalContext = createContext({})

export const GlobalProvider = ({ children }) => {
    const [ search, setSearch ] = useState("")
    const [ aboutPage, setAboutPage ] = useState(false)

    return (
        <GlobalContext.Provider value={{ search, setSearch, aboutPage, setAboutPage }} >
            { children }
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;
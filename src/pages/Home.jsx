import React from "react"
import Navbar from "../components/navbar/Navbar"
import MainContent from "../components/mainContent/MainContent"

import { GlobalProvider } from '../../src/contexts/GlobalContext'

function Home() {
  return (
    <>
    <GlobalProvider>
      <Navbar/>
      <MainContent/>
    </GlobalProvider>
    </>
    
  )
}

export default Home
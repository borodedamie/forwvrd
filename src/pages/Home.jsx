import { React, useContext } from "react"
import Navbar from "../components/navbar/Navbar"
import MainContent from "../components/mainContent/MainContent"
import AboutContent from "../components/aboutContent/AboutContent"
import { GlobalProvider } from '../../src/contexts/GlobalContext'


function Home() {

  return (
    <>
    <GlobalProvider>
      <Navbar/>
      {/* { aboutPage ? <AboutContent /> : <MainContent /> } */}
      <MainContent />
    </GlobalProvider>
    </>
    
  )
}

export default Home
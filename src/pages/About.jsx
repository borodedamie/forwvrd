import Navbar from "../components/navbar/Navbar"
import AboutContent from "../components/aboutContent/AboutContent"
import { GlobalProvider } from '../../src/contexts/GlobalContext'

function About() {
  return (
    <div>
    <GlobalProvider>
      <Navbar/>
      <AboutContent/>
    </GlobalProvider>
    </div>
  )
}

export default About
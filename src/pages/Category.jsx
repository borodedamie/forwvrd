import CategoryComponent from "../components/categoryContent/CategoryComponent"
import Navbar from "../components/navbar/Navbar"
import { GlobalProvider } from '../../src/contexts/GlobalContext'

function Category() {
  return (
    <GlobalProvider>
      <Navbar />
      <CategoryComponent />    
    </GlobalProvider>
  )
}

export default Category
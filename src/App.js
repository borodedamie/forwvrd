import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Story from './pages/Story'
import Category from './pages/Category'
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/story/:id' element={ <Story /> } />
            <Route path='about' element={ <About /> } />
            <Route path='/category/:categoryId' element={  <Category /> }/>
          </Routes>
      </Router>
    </>
  );
}

export default App;
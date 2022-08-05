import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Story from './pages/Story'

function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route path='/' element={ <Home />} />
            <Route path='/story/:id' element={ <Story /> } />
            <Route path='about' element={ <About />} />
          </Routes>
      </Router>
    </>
  );
}

export default App;
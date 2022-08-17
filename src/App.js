import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Story from './pages/Story'
import Category from './pages/Category'
import ErrorPagee from './pages/ErrorPagee'
import { ToastContainer } from 'react-toastify';

  import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/story/:id' element={ <Story /> } />
            <Route path='about' element={ <About /> } />
            <Route path='error' element={ <ErrorPagee /> } />
            <Route path='/category/:categoryId' element={  <Category /> }/>
          </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
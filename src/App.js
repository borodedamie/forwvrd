import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Story from './pages/Story'
import Category from './pages/Category'
import Login from './pages/Login'
import Privacy from './pages/Privacy'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HttpsRedirect from 'react-https-redirect';

function App() {
  return (
    <>
    <HttpsRedirect>
    <Router>
      <Routes>
        <Route path='/' element={ <Login /> } />
        <Route path='/home' element={ <Home /> } />
        <Route path='/story/:id' element={ <Story /> } />
        <Route path='about' element={ <About /> } />
        <Route path='/category/:categoryId' element={  <Category /> }/>
        <Route path='/privacy' element={ <Privacy /> }/>
      </Routes>
    </Router>
    </HttpsRedirect>
    <ToastContainer />
    </>
  );
}

export default App;
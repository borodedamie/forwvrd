import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route path='/' element={ <Home />} />
            <Route path='about' element={ <About />} />
          </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
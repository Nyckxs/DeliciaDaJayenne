<<<<<<< HEAD
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header   from './components/Header/Header';
import Home     from './components/Home/home';
import Login    from './components/Login/Login';
import Register from './components/SingUp/register';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/"         element={<Home />}     />
        <Route path="/login"    element={<Login />}    />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
=======
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Login from './components/pages/Login/Login'
import Home from './components/pages/home/home'
import SignUp from './components/pages/SignUp/index'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Home />} />
        <Route path="/Login"  element={<Login />} />
        <Route path="/SignUp"  element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
>>>>>>> 8e3d638e36cb0d1c101a902948a14c04247a8a79

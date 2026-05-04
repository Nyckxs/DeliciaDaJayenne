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

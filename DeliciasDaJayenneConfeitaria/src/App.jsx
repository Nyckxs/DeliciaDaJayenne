import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header   from './components/Header/Header';
import Home     from './components/Home/home';
import Login    from './components/Login/Login';
import Register from './components/SingUp/register';
import Cart     from './components/Cart/cart';
import QuemSomos from './components/pages/QuemSomos/who';
import Contato from './components/pages/contact/contact';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/"           element={<Home />}     />
        <Route path="/login"      element={<Login />}    />
        <Route path="/register"   element={<Register />} />
        <Route path="/quem-somos" element={<QuemSomos />} />
        <Route path="/contato"    element={<Contato />} />  {/* ← era /contact */}
      </Routes>
    </Router>
  );
}

export default App;
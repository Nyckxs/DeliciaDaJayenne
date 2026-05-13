import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header    from './components/Header/Header';
import Home      from './components/Home/home';
import Login     from './components/Login/Login';
import Register  from './components/SingUp/register';
import QuemSomos from './components/QuemSomos/who';
import Contato   from './components/contact/contact';
import Checkout  from './components/Checkout/Checkout';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  return (
    <Router>
      <Header cartItems={cartItems} setCartItems={setCartItems} />
      <Routes>
        <Route path="/"           element={<Home onAddToCart={addToCart} />} />
        <Route path="/login"      element={<Login />} />
        <Route path="/register"   element={<Register />} />
        <Route path="/quem-somos" element={<QuemSomos />} />
        <Route path="/contato"    element={<Contato />} />
        <Route path="/checkout"   element={<Checkout cartItems={cartItems} setCartItems={setCartItems} />} />
      </Routes>
    </Router>
  );
}

export default App;
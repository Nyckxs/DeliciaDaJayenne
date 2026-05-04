import React from 'react'

import "./home.css";



const home = () => {
  return (
      <header className='navbar'>
        <img src="/NavBar.svg" alt="Confeitaria" />
        <div className='navbarContainer'>
          <a href="/" className='navBar-logo'>
            <img src="./assets/dj.svg" alt="Delicias da Jayenne Confeitaria" />
          </a>

          <nav className='navbarLinks'>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/">Produtos</a></li>
              <li><a href="/">Kit Festa</a></li>
              <li><a href="/">Delivery</a></li>
              <li><a href="/">Contato</a></li>
            </ul>
          </nav>

          <div className='navbarActions'>
            <a href="/" className='navbarCart'>
              <img src="assets/carrinho.svg" alt="carrinho de compras" />
              <span>R$ 0,00</span>
            </a>
          </div>
        </div>
      </header>


      
  )
}

export default home


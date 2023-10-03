import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';

import { BsFillPersonFill } from "react-icons/bs";
import './header.scss';

import { ButtonVerCardapio } from '../../basicosComponents/Buttons/'

const Header = () => {
  const location = useLocation();

  return (
    <section className='header'>
      <div className="content">
        <div className="logo">
          <Link to="/admin/" className='logo'>
            CARDAPIO ONLINE
          </Link>

        </div>

        <ButtonVerCardapio/>

        <nav>
          <ul>
            <li>
              <Link to="/admin/estabelecimento" className={`link ${location.pathname === '/admin/estabelecimento' ? 'select' : ''}`}>
                Estabelecimento
              </Link>
            </li>
            <li>
              <Link to="/admin/cardapio" className={`link ${location.pathname === '/admin/cardapio' ? 'select' : ''}`}>
                Cardapio
                </Link>
            </li>
            <li>
              <Link to="/admin/divulgacao" className={`link ${location.pathname === '/admin/divulgacao' ? 'select' : ''}`}>
                Divulgação
                </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="perfil">
        <BsFillPersonFill className='icon' />
        David
      </div>


    </section>
  )
}

export default Header
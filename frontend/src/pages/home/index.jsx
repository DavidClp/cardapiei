import React from 'react'
import { Form, Link } from 'react-router-dom';
import Cadastro from '../../components/homeComponents/Cadastro'
import Login from '../../components/homeComponents/Login'


const Home = () => {
  return (
    <div>
         <h1>Página Inicial</h1>
{/*          <Link to="/lanche-do-david">Cardapio</Link> */}
        <Cadastro/>
        <Login/>
    </div>
  )
}

export default Home
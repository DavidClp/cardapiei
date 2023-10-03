import React from 'react'
import { Form, Link } from 'react-router-dom';
import Cadastro from '../../components/homeComponents/Cadastro'


const Home = () => {
  return (
    <div>
         <h1>Página Inicial</h1>
{/*          <Link to="/lanche-do-david">Cardapio</Link> */}
        <Cadastro/>
    </div>
  )
}

export default Home
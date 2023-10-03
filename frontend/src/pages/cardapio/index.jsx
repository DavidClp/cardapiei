import React, { useEffect, useState } from 'react';
import "./cardapio.scss";
import Header from '../../components/cardapioComponents/Header';
import Main from '../../components/cardapioComponents/Main';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Cardapio = () => {
  const { estabelecimento } = useParams();
  const [estabelecimentoCardapio, setEstabelecimentoCardapio] = useState({});
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    axios.get(`http://localhost:8080/api/estabelecimentos/${estabelecimento}`)
      .then((response) => {
        setEstabelecimentoCardapio(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [estabelecimento]);

   // Desestruture o objeto estabelecimentoCardapio para obter apenas o estabelecimento
   const { Categoria, ...estabelecimentoInfo } = estabelecimentoCardapio;

  return (
    <>
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <Header estabelecimentoInfo={estabelecimentoInfo}/>
          <Main categoriaComProdutos={estabelecimentoCardapio.Categoria} />
        </>
      )}
    </>
  );
}

export default Cardapio;

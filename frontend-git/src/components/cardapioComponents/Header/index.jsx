import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { GrMapLocation } from "react-icons/gr";
import { BiTimeFive } from "react-icons/bi";
import './header.scss';

const Header = (props) => {
  const estabelecimentoInfo = props.estabelecimentoInfo;

  return (
    <section className='header'>
        <div className="logo">
            <img src={estabelecimentoInfo.logo} alt="Logo do Estabelecimento" />
        </div>

        <div className="container">
            <h1 className="nome">{estabelecimentoInfo.nome}</h1>
            <p className="descricao">{estabelecimentoInfo.descricao}</p>

            {estabelecimentoInfo?.Localizacaos?.map((localizacao, index) =>(
              <div className="localizacao" key={index}>
                <GrMapLocation className='icon'/> <p>{localizacao.endereco}, {localizacao.numero}, {localizacao.bairro} - {localizacao.cidade}</p></div>
            ))}

            {estabelecimentoInfo?.horario_atendimentos?.map((horario, index) => (
              <div className="horarios" key={index}>
                  <p className="horario"><BiTimeFive className='icon'/> {horario.dia} das {horario.hor_abre} às {horario.hor_fecha}</p>
              </div>       
            ))}
        </div>
    </section>
  )
}

export default Header
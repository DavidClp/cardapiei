import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { GrMapLocation } from "react-icons/gr";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import './header.scss';

const Header = (props) => {
  const estabelecimentoInfo = props.estabelecimentoInfo;

  return (
    <>
      <div className="headerMobile">
        <div className="logo">
          <img src={estabelecimentoInfo.logo} alt="Logo do Estabelecimento" />
        </div>
        <AiOutlineMenu className="icon" />
      </div>

      <section className='headerCardapio2'>

        <div className="logo2">
          <img src={estabelecimentoInfo.logo} alt="Logo do Estabelecimento" />
        </div>

        <div className="container">
          <h1 className="nome">{estabelecimentoInfo.nome}</h1>
          <p className="descricao">{estabelecimentoInfo.descricao}</p>

          {estabelecimentoInfo?.Localizacaos?.map((localizacao, index) => (
            <div className="localizacao" key={index}>
              <GrMapLocation className='icon' /> <p>{localizacao.endereco}, {localizacao.numero}, {localizacao.bairro} - {localizacao.cidade}</p></div>
          ))}

          <div className="horarios">
            {estabelecimentoInfo?.horario_atendimentos?.map((horario, index) => (
              <p className="horario"  key={index}>
                <BiTimeFive className='icon' /> {horario.dia} das {horario.hor_abre} às {horario.hor_fecha}
              </p>
            ))}
          </div>
        </div>

      </section>
    </>
  )
}

export default Header
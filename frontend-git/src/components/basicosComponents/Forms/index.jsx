import React, { useState, useEffect, useRef } from 'react'
import './forms.scss';
import { ButtonForm, ButtonAdd, ButtonCadastrar } from '../../basicosComponents/Buttons/';

import { ImHome } from 'react-icons/im';
import { FaLocationDot } from 'react-icons/fa6';
import { BsFillTelephoneInboundFill } from 'react-icons/bs';
import { AiFillClockCircle } from 'react-icons/ai';

const FormEstabelecimento = ({ onSave }) => {
  return (
    <div className="formContainer">
      <div className="titulo">
        <ImHome />
        <h3>Informações básicas</h3>
      </div>

      <form action="" className="form">

        <div className="input">
          <label for="nome">Nome do estabelecimento</label>
          <input type="text" name="nome" id="nome" placeholder='Lanchonete' />
        </div>

        <div className="input">
          <label for="descricao">Descrição do estabelecimento</label>
          <textarea name="descricao" id="descricao" cols="50" rows="3" placeholder='Mostre o que sei estabelecimento tem de melhor aos seus clientes'></textarea>
        </div>

        <div class="custom-file">
          <label class="custom-file-label" for="customFile">Escolha um logotipo</label>
          <input type="file" class="custom-file-input" id="customFile" name="file" />
        </div>

        <ButtonForm onSave={onSave}/>

      </form>
    </div>
  )
}

const FormLocalizacao = ({ onSave }) => {
  return (
    <div className="formContainer">
      <div className="titulo">
        <FaLocationDot />
        <h3>Localização do estabelecimento</h3>
      </div>

      <form action="" className="form">

        <div className="input">
          <label for="cep">CEP</label>
          <input type="text" name="cep" id="cep" />
        </div>

        <div className="input">
          <label for="endereco">Endereço</label>
          <input type="text" name="endereco" id="endereco" />
        </div>

        <div className="input">
          <label for="numero">Número</label>
          <input type="number" name="numero" id="numero" />
        </div>

        <div className="input">
          <label for="bairro">Bairro</label>
          <input type="text" name="bairro" id="bairro" />
        </div>

        <div className="input">
          <label for="cidade">Cidade</label>
          <input type="text" name="cidade" id="cidade" />
        </div>

        <ButtonForm onSave={onSave}/>

      </form>
    </div>
  )
}

const FormContato = () => {
  return (
    <div className="formContainer">
      <div className="titulo">
        <BsFillTelephoneInboundFill />
        <h3>Meios de contato do estabelecimento</h3>
      </div>

      <form action="" className="form">

        <div className="inputSelect">
          <select name="tipoContato" id="tipoContato">
            <option value="">Escolha</option>
            <option value="telefone">Telefone</option>
            <option value="whatsapp">Whatsapp</option>
            <option value="email">E-mail</option>
          </select>

          <input type="text" name="contato" id="contato" />
          <ButtonAdd />
        </div>
      </form>
    </div>
  )
}

const FormHorario = () => {
  return (
    <div className="formContainer">
      <div className="titulo">
        <AiFillClockCircle />
        <h3>Horários de atendimento</h3>
      </div>

      <form action="" className="form">

      </form>
    </div>
  )
}


const FormCadastro = ({ formData, onChange, onSubmit }) => {
  return (
    <div className="formContainer formCadastro">
      <div className="titulo">
        <FaLocationDot />
        <h3>Localização do estabelecimento</h3>
      </div>

      <form onSubmit={onSubmit} className="form">

        <div className="input">
          <label for="nome">Seu nome</label>
          <input type="text" name="nome" id="nome" value={formData.nome} onChange={onChange}/>
        </div>

        <div className="input">
          <label for="email">E-mail</label>
          <input type="text" name="email" id="email" value={formData.email} onChange={onChange}/>
        </div>

        <ButtonCadastrar/>

      </form>
    </div>
  )
}

export {
  FormEstabelecimento,
  FormLocalizacao,
  FormContato,
  FormHorario,
  FormCadastro
}   
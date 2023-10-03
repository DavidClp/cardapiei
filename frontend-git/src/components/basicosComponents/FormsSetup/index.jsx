import React, { useState } from 'react'
import './forms.scss';
import { ButtonAvancar, ButtonForm, ButtonVoltar } from '../../basicosComponents/Buttons/';
import { ButtonAdd } from '../../basicosComponents/Buttons/';

import { ImHome } from 'react-icons/im';
import { FaLocationDot } from 'react-icons/fa6';
import { BsFillTelephoneInboundFill } from 'react-icons/bs';
import { AiFillClockCircle } from 'react-icons/ai';
import { GiPadlock } from 'react-icons/gi';

const FormEstabelecimento = ({ onSave, estabelecimentoData, setEstabelecimentoData }) => {
  const [estabelecimentoFormData, setEstabelecimentoFormData] = useState({
    nome: estabelecimentoData.nome || '',
    descricao: estabelecimentoData.descricao || '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEstabelecimentoFormData({
      ...estabelecimentoFormData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(estabelecimentoFormData);
    setEstabelecimentoData(estabelecimentoFormData);
  };

  return (
    <div className="formContainer">
      <div className="titulo">
        <ImHome />
        <h3>Informações básicas</h3>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <div className="input">
          <label htmlFor="nome">Nome do estabelecimento</label>
          <input
            type="text"
            name="nome"
            id="nome"
            placeholder="Lanchonete"
            value={estabelecimentoFormData.nome}
            onChange={handleChange}
          />
        </div>

        <div className="input">
          <label htmlFor="descricao">Descrição do estabelecimento</label>
          <textarea
            name="descricao"
            id="descricao"
            cols="50"
            rows="3"
            placeholder="Mostre o que seu estabelecimento tem de melhor aos seus clientes"
            value={estabelecimentoFormData.descricao}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="custom-file">
          <label className="custom-file-label" htmlFor="customFile">
            Escolha um logotipo
          </label>
          <input type="file" className="custom-file-input" id="customFile" name="file" />
        </div>

        <ButtonAvancar />  
      </form>
    </div>
  );
};


const FormLocalizacao = ({ onSave, localizacaoData, setLocalizacaoData, onBack }) => {
  const [localizacaoFormData, setLocalizacaoFormData] = useState({
    cep: localizacaoData.cep || '',
    endereco: localizacaoData.endereco || '',
    numero: localizacaoData.numero || '',
    bairro: localizacaoData.bairro || '',
    cidade: localizacaoData.cidade || '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLocalizacaoFormData({
      ...localizacaoFormData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(localizacaoFormData);
    setLocalizacaoData(localizacaoFormData);
  };
  return (
    <div className="formContainer">
      <div className="titulo">
        <FaLocationDot />
        <h3>Localização do estabelecimento</h3>
      </div>

      <form onSubmit={handleSubmit} className="form">

        <div className="input">
          <label for="cep">CEP</label>
          <input type="text" name="cep" id="cep" onChange={handleChange} value={localizacaoFormData.cep}/>
        </div>

        <div className="input">
          <label for="endereco">Endereço</label>
          <input type="text" name="endereco" id="endereco" onChange={handleChange} value={localizacaoFormData.endereco}/>
        </div>

        <div className="input">
          <label for="numero">Número</label>
          <input type="number" name="numero" id="numero" onChange={handleChange} value={localizacaoFormData.numero}/>
        </div>

        <div className="input">
          <label for="bairro">Bairro</label>
          <input type="text" name="bairro" id="bairro" onChange={handleChange} value={localizacaoFormData.bairro}/>
        </div>

        <div className="input">
          <label for="cidade">Cidade</label>
          <input type="text" name="cidade" id="cidade" onChange={handleChange} value={localizacaoFormData.cidade}/>
        </div>

        <div className="buttons">
          <ButtonVoltar onSave={onBack} />
          <ButtonAvancar />
        </div>

      </form>
    </div>
  )
}

const FormContato = ({ onSave, onBack }) => {
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

        <div className="buttons">
          <ButtonVoltar onSave={onBack} />
          <ButtonAvancar onSave={onSave} />
        </div>
      </form>
    </div>
  )
}

const FormHorario = ({ onSave, onBack }) => {
  return (
    <div className="formContainer">
      <div className="titulo">
        <AiFillClockCircle />
        <h3>Horários de atendimento</h3>
      </div>

      <form action="" className="form">

      </form>

      <div className="buttons">
        <ButtonVoltar onSave={onBack} />
        <ButtonAvancar onSave={onSave} />
      </div>
    </div>
  )
}


const FormSenha = ({ onSave, onBack }) => {
  return (
    <div className="formContainer">
      <div className="titulo">
        <GiPadlock />
        <h3>Segurança</h3>
      </div>

      <form action="" className="form">

        <div className="input">
          <label for="senha">Senha para entrar na sua conta</label>
          <input type="text" name="senha" id="senha" />
        </div>

        <div className="input">
          <label for="confirmarSenha">Confirme sua senha</label>
          <input type="text" name="confirmarSenha" id="confirmarSenha" />
        </div>

        <div className="buttons">
          <ButtonVoltar onSave={onBack} />
          <ButtonAvancar onSave={onSave} />
        </div>

      </form>
    </div>
  )
}

export {
  FormEstabelecimento,
  FormLocalizacao,
  FormContato,
  FormHorario,
  FormSenha
}   
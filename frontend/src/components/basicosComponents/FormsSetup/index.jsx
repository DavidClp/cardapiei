import React, { useState } from 'react'
import './forms.scss';
import { ButtonAvancar, ButtonAvancar2, ButtonForm, ButtonVoltar, ButtonRemove } from '../../basicosComponents/Buttons/';
import { ButtonAdd } from '../../basicosComponents/Buttons/';

import { ImHome } from 'react-icons/im';
import { FaLocationDot } from 'react-icons/fa6';
import { BsFillTelephoneInboundFill } from 'react-icons/bs';
import { AiFillClockCircle } from 'react-icons/ai';
import { GiPadlock } from 'react-icons/gi';

import axios from "axios"
import { useForm } from 'react-hook-form'
import { useQuery, useMutation } from "react-query";

const FormEstabelecimento = ({ setPassoAtual }) => {
  const { register, handleSubmit, reset, getValues } = useForm();
  const onSubmit = (data) => {
    mutate(data);
  }

  const { mutate } = useMutation((data) => {
    return axios.post('http://localhost:8080/api/estabelecimentos', data, {
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
      .then((response) => response.data);
  },
    {
      onSuccess: (responseData) => {
        const dados = responseData;
        localStorage.setItem('est_id', dados.id);
        reset();
        setPassoAtual((passoAtual) => passoAtual + 1);
      }
    }
  );
  return (
    <div className="formContainer">
      <div className="titulo">
        <ImHome />
        <h3>Informações básicas</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="input">
          <label htmlFor="nome">Nome do estabelecimento</label>
          <input
            type="text"
            name="nome"
            id="nome"
            placeholder="Lanchonete"
            //value={getValues("nome")}
            {...register("nome")}
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
            //value={estabelecimentoFormData.descricao}
            {...register("descricao")}
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


const FormLocalizacao = ({ setPassoAtual, handleVoltar }) => {
  const { register, handleSubmit, reset, getValues } = useForm();
  const onSubmit = (data) => {
    mutate(data);
  }

  const { mutate } = useMutation((data) => {
    return axios.post('http://localhost:8080/api/localizacao', data, {
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
      .then((response) => response.data);
  },
    {
      onSuccess: (responseData) => {
        const dados = responseData;
        console.log(dados)
        reset();
        setPassoAtual((passoAtual) => passoAtual + 1);
      }
    }
  );
  return (
    <div className="formContainer">
      <div className="titulo">
        <FaLocationDot />
        <h3>Localização do estabelecimento</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="form">

        <div className="input">
          <label htmlFor="cep">CEP</label>
          <input type="text" name="cep" id="cep"
            {...register("cep")}
          //value={localizacaoFormData.cep} 
          />
        </div>

        <div className="input">
          <label htmlFor="endereco">Endereço</label>
          <input type="text" name="endereco" id="endereco"
            {...register("endereco")}
          //value={localizacaoFormData.endereco}
          />
        </div>

        <div className="input">
          <label htmlFor="numero">Número</label>
          <input type="number" name="numero" id="numero"
            {...register("numero")}
          //value={localizacaoFormData.numero} 
          />
        </div>

        <div className="input">
          <label htmlFor="bairro">Bairro</label>
          <input type="text" name="bairro" id="bairro"
            {...register("bairro")}
          //value={localizacaoFormData.bairro} 
          />
        </div>

        <div className="input">
          <label htmlFor="cidade">Cidade</label>
          <input type="text" name="cidade" id="cidade"
            {...register("cidade")}
          //value={localizacaoFormData.cidade} 
          />
        </div>

        <div className="buttons">
          <ButtonVoltar onClick={handleVoltar} />
          <ButtonAvancar />
        </div>

      </form>
    </div>
  )
}

const FormContato = ({ setPassoAtual, handleVoltar }) => {
  const { register, handleSubmit, reset, getValues } = useForm();
  const onSubmit = (data) => {
    mutate(data);
  }

  //pegar contatos ja registrados para mostrar
  const est_id = localStorage.getItem('est_id');
  const { data, isLoading, refetch } = useQuery(["contatos", est_id], () => {
    return axios.get(`http://localhost:8080/api/contatos/${est_id}`, {
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
      .then((response) => response.data);
  })

  const { mutate } = useMutation((data) => {
    return axios.post('http://localhost:8080/api/contatos', data, {
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
      .then((response) => response.data);
  },
    {
      onSuccess: (responseData) => {
        const dados = responseData;
        console.log(dados)
        reset();
        refetch();//verificar
      }
    }
  );
  return (
    <div className="formContainer">
      <div className="titulo">
        <BsFillTelephoneInboundFill />
        <h3>Meios de contato do estabelecimento</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="inputSelect">
          <select name="tipoContato" id="tipoContato" {...register("tipo")}>
            <option value="">Escolha</option>
            <option value="telefone">Telefone</option>
            <option value="whatsapp">Whatsapp</option>
            <option value="email">E-mail</option>
          </select>
          <input type="text" name="contato" id="contato" {...register("contato")} />
          <ButtonAdd />
        </div>
      </form>
      {console.log(data)}
      {isLoading === false &&
        data.map((contato) => (
          <div className="getContatos" key={contato.id}>
            <div className="tipo">
              <p>{contato.tipo}</p>
            </div>

            <div className="contato">
              <p>{contato.contato}</p>
            </div>

            <ButtonRemove />
          </div>
        ))
      }
          <div className="getContatos" >
            <div className="tipo">
              <p>wdwdwqadaw</p>
            </div>

            <div className="contato">
              <p>wfwfwf</p>
            </div>

            <ButtonRemove />
          </div>

      <div className="buttons">
        <ButtonVoltar onClick={handleVoltar} />
        <ButtonAvancar2 setPassoAtual={setPassoAtual} />
      </div>
    </div>
  )
}

const FormHorario = ({ setPassoAtual, handleVoltar }) => {
  const { register, handleSubmit, reset, getValues } = useForm();
  const onSubmit = (data) => {
    mutate(data);
  }

  const { mutate } = useMutation((data) => {
    return axios.post('http://localhost:8080/api/localizacao', data, {
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
      .then((response) => response.data);
  },
    {
      onSuccess: (responseData) => {
        const dados = responseData;
        console.log(dados)
        reset();
        setPassoAtual((passoAtual) => passoAtual + 1);
      }
    }
  );
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

const FormSenha = ({ setPassoAtual, handleVoltar }) => {
  const { register, handleSubmit, reset, getValues } = useForm();
  const onSubmit = (data) => {
    mutate(data);
  }

  const { mutate } = useMutation((data) => {
    return axios.post('http://localhost:8080/api/localizacao', data, {
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
      .then((response) => response.data);
  },
    {
      onSuccess: (responseData) => {
        const dados = responseData;
        console.log(dados)
        reset();
        setPassoAtual((passoAtual) => passoAtual + 1);
      }
    }
  );
  return (
    <div className="formContainer">
      <div className="titulo">
        <GiPadlock />
        <h3>Segurança</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="input">
          <label htmlFor="senha">Senha</label>
          <input
            type="text"
            name="senha"
            id="senha"
            placeholder="********"
            //value={getValues("nome")}
            {...register("senha")}
          />
        </div>
        <div className="input">
          <label htmlFor="ConfirmaSenha">Confirme sua senha</label>
          <input
            type="text"
            name="ConfirmaSenha"
            id="ConfirmaSenha"
            placeholder="********"
            //value={getValues("nome")}
            {...register("ConfirmaSenha")}
          />
        </div>

        <ButtonAvancar />
      </form>
    </div>
  );
};



export {
  FormEstabelecimento,
  FormLocalizacao,
  FormContato,
  FormHorario,
  FormSenha
}      
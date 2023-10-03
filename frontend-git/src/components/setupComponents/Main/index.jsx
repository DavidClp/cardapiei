import React, { useState } from 'react';
import './main.scss';
import { Navigate } from 'react-router-dom';
import { FormEstabelecimento, FormLocalizacao, FormContato, FormHorario, FormSenha } from '../../basicosComponents/FormsSetup';

const Main = () => {
  const [passoAtual, setPassoAtual] = useState(1);

  const [estabelecimentoData, setEstabelecimentoData] = useState({
    nome: '',
    descricao: '',
  });

  const [localizacaoData, setLocalizacaoData] = useState({
    cep: '',
    descricao: '',
    numero: '',
    bairro: '',
    cidade: '',
  });

  const [contatoData, setContatoData] = useState({});
  const [horarioData, setHorarioData] = useState({});
  const [segurancaData, setSegurancaData] = useState({});

  const endpoints = {
    1: '/api/estabelecimentos', // Endpoint para o FormEstabelecimento
    2: '/api/localizacao',    // Endpoint para o FormLocalizacao
    3: '/api/contatos',        // Endpoint para o FormContato
    4: '/api/horarios',        // Endpoint para o FormHorario
    5: '/api/seguranca',      // Endpoint para o FormSenha
  };

  const handleSaveAndNext = async (passo, formData) => {
    if (formData) {
      try {
        console.log(formData)
        const response = await fetch(`http://localhost:8080${endpoints[passoAtual]}`, {
          method: 'PUT',
          headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log('Dados enviados com sucesso');
          setPassoAtual((passoAnterior) => passoAnterior + passo);
        } else {
          console.error('Erro ao enviar dados para a API');
        }
      } catch (error) {
        console.error('Erro ao enviar dados para a API:', error);
      }
    } else {
      setPassoAtual((passoAnterior) => passoAnterior + passo);
    }
  };

  return (
    <section className='main'>
      {passoAtual === 1 && (
        <FormEstabelecimento
          onSave={(data) => handleSaveAndNext(1, data)}
          estabelecimentoData={estabelecimentoData}
          setEstabelecimentoData={setEstabelecimentoData}
        />
      )}
      {passoAtual === 2 && (
        <FormLocalizacao
          onSave={(data) => handleSaveAndNext(1, data)}
          localizacaoData={localizacaoData}
          setLocalizacaoData={setLocalizacaoData}
          onBack={() => handleSaveAndNext(-1)}
        />
      )}
      {passoAtual === 3 && (
        <FormContato
          onSave={(data) => handleSaveAndNext(1, data)}
          onBack={() => handleSaveAndNext(-1)}
        />
      )}
      {passoAtual === 4 && (
        <FormHorario
          onSave={(data) => handleSaveAndNext(1, data)}
          onBack={() => handleSaveAndNext(-1)}
        />
      )}
      {passoAtual === 5 && (
        <FormSenha
          onSave={(data) => handleSaveAndNext(1, data)}
          onBack={() => handleSaveAndNext(-1)}
        />
      )}
      {passoAtual === 6 && <Navigate to="/admin" />}
    </section>
  );
};

export default Main;

import React, { useState } from 'react'
import './forms.scss';
import { ButtonAvancar, ButtonForm, ButtonRemove, ButtonEfeite } from '../Buttons';
import Modal from '../Modal'
import { FormProduto } from '../../basicosComponents/FormsAdminCardapio';
import { ButtonAdd } from '../Buttons';

import { TbCategory } from 'react-icons/tb';
import { IoFastFoodOutline } from 'react-icons/io5';

import axios from "axios"
import { useForm } from 'react-hook-form'
import { useMutation } from "react-query";
const est_id = localStorage.getItem('est_id');
const url = "http://localhost:8080/api/"

const CardProduto = ({ categoria, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState(null); // Novo estado para armazenar o produto

  const openModal = (produto) => {
    setSelectedProduto(produto);
    setIsModalOpen(true);
    if (produto) {
      reset({
        nome: produto.nome,
        valor: produto.valor,
        descricao: produto.descricao,
      });
    } else {
      reset({
        nome: null,
        valor:null,
        descricao: null,
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm();

  const onSubmit = (dataForm) => {
    const formData = new FormData();
    formData.append('nome', dataForm.nome);
    formData.append('valor', dataForm.valor);
    formData.append('descricao', dataForm.descricao);
    formData.append('imagem', dataForm.imagem[0]);
    formData.append('ativo', 1);
    if (dataForm.produtoId) {
      formData.append('produtoId', dataForm.produtoId); // Certifique-se de que o campo seja nomeado corretamente
      putMutate(formData);
    } else {
      mutate(formData);
    }
  }
  const { mutate } = useMutation((formData) => {
    return axios.post(`${url}produtos/${categoria.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'token': localStorage.getItem('token'),
      },
    })
      .then((response) => response.data);
  },
    {
      onSuccess: (responseData) => {
        setIsModalOpen(false);
        refetch();
      }
    }
  );

  const { mutate: putMutate } = useMutation((formData) => {
      return axios.put(`${url}produtos/${formData.get('produtoId')}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'token': localStorage.getItem('token'),
        },
      }).then((response) => response.data);
    },
    {
      onError: (error) => {
        console.error('Erro editar produto', error);
      },
      onSuccess: (responseData) => {
        setIsModalOpen(false);
        refetch();
      },
    }
  );  

  const { mutate: deleteProduto } = useMutation(
    (produtoId) =>
      axios.delete(`${url}produtos/${produtoId}`, {
        headers: {
          'token': localStorage.getItem('token'),
        },
      }),
    {
      onSuccess: () => {
        refetch();
      },
      onError: (error) => {
        console.error('Erro ao excluir o produto', error);
      },
    }
  );

  return (
    <div className="formContainer">
      <div className="titulo">
        <h3>{categoria.nome}</h3>
      </div>

      {categoria?.Produtos?.map((produto) => (
        <div className='cardProduto'>
          <div className='cardContent' onClick={() => openModal(produto)}>
            {produto.imagem && <img src={produto.imagem} alt="" />}
            <p>{produto.nome}</p>
            <p>R$ {produto.valor}</p>
          </div>
          <ButtonRemove onClick={() => deleteProduto(produto.id)} />
        </div>
      ))}

      <div className='containerButtonCardapio'>
        <ButtonEfeite texto={"Adicionar Item"} onClick={() => openModal(null)} />
      </div>

      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <FormProduto
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          errors={errors}
          selectedProduto={selectedProduto}
        />
      </Modal>
    </div>
  );
};

export {
  CardProduto,
}  
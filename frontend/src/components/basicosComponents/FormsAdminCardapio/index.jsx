import React, { useState } from 'react'
import './forms.scss';
import { ButtonAvancar, ButtonLogin, ButtonCadastrar, ButtonForm, ButtonRemove, ButtonSimples, buttonComIcon, ButtonComIcon } from '../Buttons';
import { useMutation } from 'react-query'; // Importe useMutation do react-query

import { useForm } from 'react-hook-form'
import { ButtonAdd } from '../Buttons';
import { IoIosSave } from 'react-icons/io';
import axios from "axios"
import { useQuery } from "react-query";
import { TbCategory } from 'react-icons/tb';
import { MdCancel } from 'react-icons/md';
const url = "http://localhost:8080/api/"

const FormProduto = ({ handleSubmit, onSubmit, register, errors, selectedProduto }) => {
  const [imagemSelecionada, setImagemSelecionada] = useState(null);

  //pega a imagem selecionada 
  const handleImagemChange = (e) => {
    const arquivoSelecionado = e.target.files[0];
    if (arquivoSelecionado) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImagemSelecionada(e.target.result);
      };

      reader.readAsDataURL(arquivoSelecionado);
    }
  };
  //retira a imagem selecionada 
  const handleRemoverImagem = () => {
    setImagemSelecionada(null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      {selectedProduto?.id &&
        <input
          type="hidden"
          name="produtoId"
          id="produtoId"
          value={selectedProduto.id}
          {...register("produtoId")}
        />
      }
      <div className="input">
        <label htmlFor="nome">Nome do produto</label>
        <input
          type="text"
          name="nome"
          id="nome"
          placeholder="Exemplo: Pizza Portuguesa"
          className={errors?.nome && "inputError"}
          defaultValue={selectedProduto?.nome || ""}
          {...register("nome", { required: true })}
        />
        {errors?.nome?.type === 'required' && <p className='errorMessage'>Nome é requirido</p>}
      </div>

      <div className="input">
        <label htmlFor="nome">Valor</label>
        <input
          type="text"
          name="valor"
          id="valor"
          placeholder="Exemplo: Pizza Portuguesa"
          className={errors?.valor && "inputError"}
          defaultValue={selectedProduto?.valor || ""}
          {...register("valor")}
        />
      </div>

      <div className="input">
        <label htmlFor="descricao">Descrição do produto</label>
        <textarea
          name="descricao"
          id="descricao"
          cols="50"
          rows="3"
          placeholder="Exemplo: Melhor Pizza do Mundo!"
          defaultValue={selectedProduto?.descricao || ""}
          {...register("descricao")}
        ></textarea>
      </div>

      <div className="custom-file">
        {imagemSelecionada ? (
          <div>
            <img src={imagemSelecionada} alt="Imagem Selecionada" />
          </div>
        ) : (
          <div>
            <label className="FileContainer" htmlFor="customFile">
              Clique Aqui para Adicionar uma imagem
            </label>
          </div>)}

        {imagemSelecionada ? (
          <label className="customFileLabel" onClick={handleRemoverImagem}>
            Remover
          </label>
        ) : (
          <label className="customFileLabel" htmlFor="customFile">
            Adicionar
          </label>
        )}
        <input type="file" className="custom-file-input"
          id="customFile"
          name="file"
          {...register("imagem")}
          onChange={handleImagemChange}
        />
      </div>

      <ButtonForm />
    </form>
  );
};

const FormCategoria = ({ handleSubmit, onSubmit, register, deleteCategoria, isLoading, data, refetch }) => {
  const [isOpenEditCategoria, setIsOpenEditCategoria] = useState(false);
  const [editCategoriaId, setEditCategoriaId] = useState(null);
  const [editCategoriaNome, setEditCategoriaNome] = useState('');

  const openEditCategoria = (categoria) => {
    setIsOpenEditCategoria(true);
    setEditCategoriaId(categoria.id);
    setEditCategoriaNome(categoria.nome);
  };

  const cancelEditCategoria = () => {
    setIsOpenEditCategoria(false);
    setEditCategoriaId(null);
    setEditCategoriaNome('');
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();

    // Chame putMutate para fazer a edição
    putMutate({
      id: editCategoriaId,
      nome: editCategoriaNome,
    });

    // Reset os campos
    cancelEditCategoria();
  };

  const { mutate: putMutate } = useMutation((formData) => {
    return axios.put(`${url}categorias/${formData.id}`, formData, {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token'),
      },
    }).then((response) => response.data);
  }, {
    onError: (error) => {
      console.error('Erro editar categorias', error);
    },
    onSuccess: (responseData) => {
      /* setIsModalOpen(false); */
      refetch()
    },
  });

  return (
    <div className="formContainer">
      <div className="titulo">
        <TbCategory />
        <h3>Categorias do cardápio</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="inputSelect">
          <input type="text" name="categoria" id="categoria" {...register("nome")} />
          <ButtonAdd />
        </div>
      </form>

      {isLoading === false &&
        data.map((categoria) => (
          <div className="getContatos" key={categoria.id}>
            {isOpenEditCategoria && editCategoriaId === categoria.id ? (
              <form onSubmit={handleEditSubmit} className="form">
                <div className="inputSelect">
                <input type="text" value={editCategoriaNome} onChange={(e) => setEditCategoriaNome(e.target.value)} />
                <ButtonComIcon >
                  <IoIosSave className="icon" />
                </ButtonComIcon>
                <ButtonComIcon onClick={cancelEditCategoria}>
                  <MdCancel className="icon" />
                </ButtonComIcon>
                </div>  
              </form>
              /*  <form onSubmit={handleSubmit(onSubmit)} className="form">
                 <div className="inputSelect">
                   <input type="text"
                     name="categoria"
                     id="categoria"
                     defaultValue={editCategoriaNome}
                     {...register("nome")} />
                   <ButtonAdd />
                 </div>
               </form> */
            ) : (
              <>
                <div className="tipo" onClick={() => openEditCategoria(categoria)}>
                  <p>{categoria.nome}</p>
                </div>
                <ButtonRemove onClick={() => deleteCategoria(categoria.id)} />
              </>
            )}
          </div>
        ))
      }
    </div>
  );
}


export {
  FormProduto,
  FormCategoria,
}   
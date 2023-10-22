import React, { useState, useEffect, useRef } from 'react'
import './main.scss';
import { FormCategoria } from '../../basicosComponents/FormsAdminCardapio';
import { CardProduto } from '../../basicosComponents/CardAdminCardapio';
import { FormProduto } from '../../basicosComponents/FormsAdminCardapio';

import axios from "axios"
import { useForm } from 'react-hook-form'
import { useQuery, useMutation } from "react-query";
const est_id = localStorage.getItem('est_id');
const url = "http://localhost:8080/api/"


const Main = () => {

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    mutate(data);
  }

  //pegar categorias ja registrados para mostrar
  const { data, isLoading, refetch } = useQuery(["categorias", est_id], () => {
    return axios.get(`${url}categorias/${est_id}`, {
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
      .then((response) => response.data);
  })

  const { mutate: deleteCategoria } = useMutation(
    (categoriaId) =>
      axios.delete(`${url}categorias/${categoriaId}`, {
        headers: {
          'token': localStorage.getItem('token'),
        },
      }),
    {
      onSuccess: () => {
        refetch();
      },
      onError: (error) => {
        console.error('Erro ao excluir o contato', error);
      },
    }
  );

  const { mutate } = useMutation((data) => {
    return axios.post(`${url}categorias`, data, {
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
      .then((response) => response.data);
  },
    {
      onSuccess: (responseData) => {
        refetch();
        const dados = responseData;
        reset();
      }
    }
  );


  return (
    <section className='adminCardapioMain'>
      <sectio className="adminCategorias">
        <FormCategoria
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          deleteCategoria={deleteCategoria}
          isLoading={isLoading}
          data={data}
          refetch={refetch}
        />
      </sectio>

      <section className="adminProdutos">
        {data?.map((categoria) => (
          <CardProduto categoria={categoria} refetch={refetch}/>
        ))}
        {/* <FormProduto/> */}
      </section>
    </section>
  )
}

export default Main
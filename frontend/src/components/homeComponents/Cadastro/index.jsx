import React, { useState } from 'react'
import { FormCadastro } from '../../basicosComponents/Forms';
import { Navigate } from 'react-router-dom';
import axios from "axios"
import { useForm } from 'react-hook-form'
import { useMutation } from "react-query";

const Cadastro = () => {
    const { register, handleSubmit } = useForm();

    const [cadastrou, setCadastrou] = useState(0); //GAMBIARRA, ARRUMAR

    const onSubmit = (data) => {
        //console.log(data)
        mutate(data);
    }

    const { mutate, isSuccess } = useMutation((data) => {
        return axios.post('http://localhost:8080/api/usuarios/', data)
            .then((response) => response.data);
    },
    {
        onSuccess: (responseData) => {
            const dados = responseData;
            localStorage.setItem('token', dados.token);
            setCadastrou(1);
        }
    }
    );


    return (
        <section>

            {cadastrou == 1 && <Navigate to="/setup" />},
            <FormCadastro
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                register={register}
            />
        </section>
    )
}

export default Cadastro
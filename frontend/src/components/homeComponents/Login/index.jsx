import React, { useState } from 'react'
import { FormLogin } from '../../basicosComponents/Forms';
import { Navigate } from 'react-router-dom';
import axios from "axios"
import { useForm } from 'react-hook-form'
import { useMutation } from "react-query";

const Login = () => {
    const { register, handleSubmit, formState: {errors} } = useForm();

    const [logou, setLogou] = useState(0); //GAMBIARRA, ARRUMAR

    const onSubmit = (data) => {
        mutate(data);
    }

    const { mutate, isSuccess } = useMutation((data) => {
        return axios.post('http://localhost:8080/api/usuarios/login', data)
            .then((response) => response.data);
    },
    {
        onSuccess: (responseData) => {
            const dados = responseData;
            localStorage.setItem('token', dados.token);
            localStorage.setItem('est_id', dados.est_id);
            localStorage.setItem('est_url', dados.est_url);
            setLogou(1);
        }
    }
    );

    return (
        <section>
            {logou == 1 && <Navigate to="/admin/cardapio" />},
            <FormLogin
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                register={register}
                errors={errors}
            />
        </section>
    )
}

export default Login
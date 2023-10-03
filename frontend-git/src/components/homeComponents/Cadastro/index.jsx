import React, { useState } from 'react'
import { FormCadastro } from '../../basicosComponents/Forms';
import { Navigate, redirect, useHistory} from 'react-router-dom';

const Cadastro = () => {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
    });
    const [cadastrou, setCadastrou] = useState(0); //GAMBIARRA, ARRUMAR

    //SALVA CADA MUDANÇA DO INPUT
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    //FUNCAO PEGA PELO FORMULARIO E MANDA DADOS DELA PRA VERIFICAR
    const handleSubmit = (event) => {
        event.preventDefault();
        checkInputErrors(formData);
    }

    //VERIFICA ERROS NOS DADOS DO INPUT
    const checkInputErrors = (data) => {
        try {
            Object.keys(data).forEach((item) => {
                if (!data[item]) {
                    throw item
                }
            })
            sendToAPI(data)
        } catch (error) {
            const err = `O campo ${error} esta vazio!`
            window.alert(err)
        }
    }

    const sendToAPI = async (data) => {
        try {
            const response = await fetch('http://localhost:8080/api/usuarios/', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.mensagem);
            }
            const dados = await response.json();
            localStorage.setItem('token', dados.token);

            setCadastrou(1);
        } catch (error) {
            window.Error();
            const err = `Erro ao enviar dados para a API: ${error}`
            window.alert(err)
        }
    }
    return (
        <section>

        {cadastrou == 1 && <Navigate to="/setup"/>},
        <FormCadastro 
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            />
         </section>
    )
}

export default Cadastro
import React from 'react';
import Header from '../../components/adminComponents/Header';
import Main from '../../components/adminComponents/MainEstabeelcimento';
import { Navigate } from 'react-router-dom';

const Admin = () => {
  return (
    <section>
        {<Navigate to="/admin/cardapio" />},
    </section>
  )
}

export default Admin
import React from 'react'
import './buttons.scss';
import { BsBoxArrowUpRight, BsWhatsapp } from 'react-icons/bs';
import { BiSolidMessageSquareAdd } from 'react-icons/bi';
import { GrPrevious } from 'react-icons/gr';
import { MdDeleteForever } from 'react-icons/md';

const ButtonForm = ({ onSave }) => {
  return (
    <button type="submit" onClick={ onSave } className='buttonForm'>
      salvar
    </button>
  )
}

const ButtonCadastrar = () => {
  return (
    <button type="submit" className='buttonCadastrar'>
      Criar Cardapio
    </button>
  )
}

const ButtonAvancar = () => {
  return (
    <button type="submit"  className='buttonAvancar'>
      próximo
    </button>
  )
}

const ButtonAvancar2 = ({ setPassoAtual }) => {
  return (
    <button type='button' onClick={() => setPassoAtual((passoAtual) => passoAtual + 1)}   className='buttonAvancar'>
      próximo
    </button>
  )
}
const ButtonAdd = () => {
  return (
    <button type="submit" className='buttonAdd'>
      <BiSolidMessageSquareAdd className="icon"/>
    </button>
  )
}

const ButtonVoltar = ({ onClick }) => {
  return (
    <a href="#" onClick={onClick} className='buttonVoltar'>
      <GrPrevious />
      voltar
    </a>
  );
};
const ButtonVerCardapio = () => {
  return (
    <button type="submit" className='buttonVerCardapio'>
      <BsBoxArrowUpRight className="icon"/>
      Ver o cardapio
    </button>
  )
}


const ButtonRemove = () => {
  return (
    <button className='buttonRemove'>
      <MdDeleteForever className="icon"/>
    </button>
  )
}

const ButtonAjuda = () => {
  return (
    <button className='buttonAjuda'>
      <BsWhatsapp className="icon"/>
      Precisa de ajuda?
    </button>
  )
}

export {
  ButtonForm,
  ButtonVerCardapio,
  ButtonAdd,
  ButtonRemove,
  ButtonAjuda,
  ButtonAvancar,
  ButtonAvancar2,
  ButtonVoltar,
  ButtonCadastrar
} 
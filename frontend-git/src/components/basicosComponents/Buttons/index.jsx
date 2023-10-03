import React from 'react'
import './buttons.scss';
import { BsBoxArrowUpRight, BsWhatsapp } from 'react-icons/bs';
import { BiSolidMessageSquareAdd } from 'react-icons/bi';
import { GrPrevious } from 'react-icons/gr';

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

const ButtonAvancar = ({ onSave }) => {
  return (
    <button type="submit" onClick={ onSave } className='buttonAvancar'>
      próximo
    </button>
  )
}

const ButtonVoltar = ({onSave}) => {
  return (
    <button type="submit" onClick={() => onSave(-1)} className='buttonVoltar'>
      <GrPrevious/>
      voltar
    </button>
  )
}

const ButtonVerCardapio = () => {
  return (
    <button type="submit" className='buttonVerCardapio'>
      <BsBoxArrowUpRight className="icon"/>
      Ver o cardapio
    </button>
  )
}

const ButtonAdd = () => {
  return (
    <button className='buttonAdd'>
      <BiSolidMessageSquareAdd className="icon"/>
    </button>
  )
}

const ButtonRemove = () => {
  return (
    <button className='buttonRemove'>
      <BiSolidMessageSquareAdd className="icon"/>
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
  ButtonVoltar,
  ButtonCadastrar
} 
import React, {useState, useEffect, useRef} from 'react'
import './main.scss'

const Main = (props) => {
  const categorias = props.categoriaComProdutos;
  const [categoriaAtiva, setCategoriaAtiva] = useState(null);
  const menuRef = useRef(null); // Ref para a seção de menu

  const handleClick = (categoria) =>{
    setCategoriaAtiva(categoria);

    // Scroll até a categoria selecionada
    if (menuRef.current) {
      const categoriaElement = menuRef.current.querySelector(
        `.menuCategoria[data-categoria="${categoria.nome}"]`
      );
      if (categoriaElement) {
        categoriaElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  return (
    <section className='main'>
      <aside className='categorias'>
        {categorias.map((categoria) => (
          <div
            key={categoria.id}
            className={`categoria ${categoria === categoriaAtiva ? 'selected' : ''}`}
            onClick={() => handleClick(categoria)}
          >
            <p>{categoria.nome}</p>
          </div>
        ))}
      </aside>


      <section className='menu' ref={menuRef}>
        {categorias.map((categoria, index) => (
          <div
            key={index}
            className="menuCategoria"
            data-categoria={categoria.nome} // Adicione um atributo data para identificar a categoria
          >
            <h2>{categoria.nome}</h2>
            <div className="produtos">
              {categoria.Produtos.map((produto, index) => (

                <div key={index} className="card">
                  <div className='content'>
                    {produto.imagem ? (<img src={produto.imagem} alt="foto do produto" />) : (null)}
                    <div className="texts">
                      <h3>{produto.nome}</h3>
                      <p>{produto.descricao}</p>
                    </div>
                  </div>

                  <div className="valor">
                    <p>R${produto.valor}</p>
                  </div>
                </div>

              ))}
            </div>
          </div>
        ))}
      </section>
    </section>
  )
}

export default Main
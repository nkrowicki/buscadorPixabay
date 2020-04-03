import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';


function App() {

  const [busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([]);

  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);





  useEffect(() => {

    // Que en la primer carga no haga ninguna consulta
    if (busqueda === '') return;

    const consultarAPI = async () => {
      const imagenesPorPagina = 30;
      const key = '15876960-7f4a65b27e64afc0617b4d25c';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

      const consulta = await fetch(url)
      const resultado = await consulta.json();
      setImagenes(resultado.hits);

      //Calcular el total de paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      setTotalPaginas(calcularTotalPaginas);

      //Mover la pagina hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth'})

    }

    consultarAPI();

  }, [busqueda, paginaActual]);


  //Definir la pagina anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1;
    if (nuevaPaginaActual === 0) return;
    setPaginaActual(nuevaPaginaActual)
  }

  //Definir la pagina siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1;
    if (nuevaPaginaActual > totalPaginas) return;
    setPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="leadr text-center">
          Buscador de imagenes
        </p>
        <Formulario
          setBusqueda={setBusqueda}
        />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes
          imagenes={imagenes} />


        {(paginaActual === 1) ? null :
          <button
            type="button"
            className="bbtn btn-info mr-1"
            onClick={paginaAnterior}
          >&laquo; Anterior</button>}

        {(paginaActual === totalPaginas) ? null :
          <button
            type="button"
            className="bbtn btn-info mr-1"
            onClick={paginaSiguiente}
          >Siguiente &raquo;</button>}


      </div>



    </div>
  );
}

export default App;

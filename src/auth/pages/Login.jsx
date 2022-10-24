import { useNavigate } from 'react-router-dom';

export const Login = () => {

  const navigate = useNavigate();

  const onLogin = () => {
    navigate('/inicio');
  }
  
  return (
    <>
      <div className='container text-center mt-5'>
        <h1 className="text-dark">Tecnologico de Costa Rica</h1>
        <h1 className="text-primary">Proyecto de Investigacion de Operaciones</h1>
        <h3 className="text-dark">I Semestre 2022</h3>
        <p className="text-dark">Este proyecto contiene multiples algoritmos de 
          Programacion Dinamica, los cuales se han aprendido en clase
          de forma teorica y practica, ahora es el momento de programarlos!
          Los algoritmos son los siguientes:
        </p>
        <ul>
          <li className="text-dark">Rutas mas cortas</li>
          <li className="text-dark">Problema de la mochila</li>
          <li className="text-dark">Reemplazo de Equipos</li>
          <li className="text-dark">Arboles Binarios de Busquedas Optimas</li>
          <li className="text-dark">Series Deportivas</li>
          <li className="text-dark">Multiplicacion de Matrices</li>
        </ul>
          
          <button
            className="btn btn-primary mt-3"
            onClick={ onLogin }
          >
            Iniciar
          </button>
          </div>
         
      </>
    )
}

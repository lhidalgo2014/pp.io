import React from 'react'
import './rutaCortaStyle.css'
import { useState } from "react";
import { Matrices } from './logica/Matrices';


export const MultiplicacionDeMatrices = () => {
  
  const [CantidadMatrices, setCantidadMatrices] = useState(2);
  const [Dimensiones, setDimensiones] = useState([
    { num: 0, value: 2 },
    { num: 1, value: 2 },
    { num: 2, value: 2 },
  ]);
  const [M, setM] = useState([[]]);
  const [P, setP] = useState([[]]);
  const [VerM, setVerM] = useState(true);

  /**
   * Funcion que agrega en 1 la cantidad de matrices 
   */
  const add = () => {
    if(CantidadMatrices < 10){
      Dimensiones.push({ num: CantidadMatrices + 1, value: 2 });
      setCantidadMatrices(CantidadMatrices + 1);
    }
  };

  /**
   * Funcion que resta en 1 la cantidad de matrices 
   */
  const remove = () => {
    if (CantidadMatrices > 2) {
      let dimensiones = JSON.parse(JSON.stringify(Dimensiones));
      dimensiones.pop();
      setDimensiones(dimensiones);
      setCantidadMatrices(CantidadMatrices - 1);
    }
  };

  /**
   * Funcion que actualiza el estado del valor de la dimension de 
   * la matriz indicada
   */
  const ValueOnchange = (texto, index) => {
    let res = JSON.parse(JSON.stringify(Dimensiones));
    res[index].value = parseInt(texto);
    setDimensiones(res);
  };

  /**
   * Funcion que carga el numero de matrices 
   */
  const getMatrix = () => {
    return new Array(CantidadMatrices).fill("M");
  };

  /**
   * Funcion que ejecuta la funcion de calcular la forma optima de  
   * multiplicar las matrices
   */
  const Ejecutar = () => {
    let solucion = new Matrices(CantidadMatrices,Dimensiones);
    solucion.execute()
    setM(solucion.M)
    setP(solucion.P)
    document.getElementById("solution-a").innerHTML = getMultiplicationMatrix();
  };

  /**
   * Funcion que obtiene el orden optimo de multiplicacion
   * de las matrices
   */
  const getMultiplicationMatrix = () => {
		return getMultiplicationMatrixAux(P, 0, P.length - 1, true);
	};

  /**
   * Funcion auxiliar que dibuja el orden optimo de la
   * multiplicacionde matrices 
   */
  const	getMultiplicationMatrixAux = (P, i, j, firstCheck)  =>{
		if (i === j) {
        	return `<p style="margin-left: 0.5rem; margin-right: 0.5rem;display:inline-block">${"A"}<sub>${i + 1}</sub></p>`;
		} else {
			if (firstCheck) {
				return `<p className='text-dark mt-2' style="display:inline-block"><p style="color: #FF653C;display:inline-block">(</p>${getMultiplicationMatrixAux(P, i, P[i][j]-1, false)} <p style="color: #FF653C;display:inline-block">)</p>
					<p className='text-dark mt-2' style="color: #FF653C;display:inline-block">(</p>${getMultiplicationMatrixAux(P, P[i][j], j, false)}<p style="color: #FF653C;display:inline-block">)</p></p>`
			}
			if(i !== 0) {
				return `<p style="display:inline-block"><p style="color: #FF653C;display:inline-block">(</p>${getMultiplicationMatrixAux(P, i, P[i][j]-1, false)}${getMultiplicationMatrixAux(P, P[i][j], j, false)}<p style="color: #FF653C;display:inline-block">)</p></p>`
			} else {
				return `<p style="display:inline-block">${getMultiplicationMatrixAux(P, i, P[i][j]-1, false)}${getMultiplicationMatrixAux(P, P[i][j], j, false)}</p>`
			}
		}
	};
  
  return (
    <>
      <div className="container">
        <div className="h1 text-center text-dark" id="pageHeaderTitle">Multiplicacion de Matrices</div>
        <div className="row">
          <div className='col-sm-2 card me-2'>
            <h5 className='text-dark mt-2'>numero de matrices</h5>
            <button 
              className='btn btn-secondary mt-2'
              onClick={() => add()}
            >
            +
            </button>
            <input readOnly className='form-control mt-2' type="text" value={CantidadMatrices}/>
            <button 
              className='btn btn-secondary mt-2'
              onClick={() => remove()}
            >
            -
            </button>

            <div  className='mt-2'>
            {Dimensiones.map((item, i) => {
                return (
                  <div style={{height: "40px"}}>
                    <p className='text-dark mt-2' style={{ display: "inline-block", marginRight: "10px" }}>
                      d
                        <sub>{i}</sub> &#x2192;
                    </p>
                    <p className='text-dark mt-2' style={{ display: "inline-block", marginRight: "10px" }}>
                      Valor:
                    </p>
                    <input
                      className='form-control'
                      defaultValue={item.value}
                      onBlur={(e) => ValueOnchange(e.target.value, i)}
                      style={{
                        padding: "0",
                        margin: "0",
                        display: "inline-block",
                        width: "75px",
                      }}
                    ></input>
                  </div>
                );
              })}
            </div> 

            <button 
              className='btn btn-primary mt-2'
              onClick={() => Ejecutar()}
            >
            Ejecutar
            </button>
            <button 
              className='btn btn-danger mt-2 mb-2'
              onClick={() => window.location.reload()}
            >
            Reiniciar
            </button> 
                    
          </div>
          <div className='col-sm-4 card me-2'>
            <h5 className='text-dark mt-2'>lista de matrices</h5>
            <div style={{ display: "inline-block", marginRight: "10px" }}>
              {getMatrix().map((item, i) => {
                return (
                  <div  style={{ display: "inline-block", marginRight: "10px" }}>
                    <p className="a-name text-dark">
                      {item}
                      <sub>{i + 1}</sub>
                    </p>
                    <div style={{ display: "inline-block", marginRight: "10px" }}>
                      <p className='text-dark mt-2' style={{ fontSize: "0.8rem" }}>
                        {Dimensiones[i].value} x {Dimensiones[i + 1].value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <hr/>
            <hr/>
            <h5 className='text-dark mt-2'>multiplicacion optima</h5>
            <div className='text-dark mt-2' id="solution-a" style={{ display: "flex", marginRight: "10px", width:"100%" ,height:"50px"}}></div>
          </div>
          <div className='col-sm-5 card me-2' style={{ width: "624px"}}>
            <h5 className='text-dark mt-2'>tabla</h5>
            <button
              className="btn btn-secondary mb-2"
              style={{width: "150px"}}
              onClick={() => setVerM(!VerM)}
            >
              {VerM ? "Ver tabla P" : "Ver tabla M"}
            </button>
            {VerM && (
                <table className="table table-bordered table-sm " style={{overflowY:'scroll',overflowX:'scroll' }}>
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: "50px", height: "30px" }}>
                        {""}
                      </th>
                      {M.map((item, i) => {
                        return (
                          <th
                            scope="col"
                            style={{ width: "50px", height: "30px" }}
                          >
                            {i+1}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {M.map((item, i) => {
                      return (
                        <tr>
                          <th scope="row">{i + 1}</th>
                          {item.map((item, j) => {
                            return (
                              <td style={{ width: "50px", height: "30px" }}>
                                {M[i][j]}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
               {!VerM && (
                <table className="table table-bordered table-sm " style={{overflowY:'scroll',overflowX:'scroll' }}>
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: "50px", height: "30px" }}>
                        {""}
                      </th>
                      {P.map((item, i) => {
                        return (
                          <th
                            scope="col"
                            style={{ width: "50px", height: "30px" }}
                          >
                            {i+1}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {P.map((item, i) => {
                      return (
                        <tr>
                          <th scope="row">{i + 1}</th>
                          {item.map((item, j) => {
                            return (
                              <td style={{ width: "50px", height: "30px" }}>
                                {P[i][j]}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
          </div>
        </div>
      </div>
    </>
  )
}

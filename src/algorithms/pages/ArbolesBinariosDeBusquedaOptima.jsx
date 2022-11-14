import './rutaCortaStyle.css'
import { useState } from "react";
import { ArbolesBinarios } from "./logica/ArbolesBinarios";


export const ArbolesBinariosDeBusquedaOptima = () => {
  
  const [CantidadLlaves, setCantidadLlaves] = useState(1);
  const [A, setA] = useState([[]]);
  const [R, setR] = useState([[]]);
  const [Llaves, setLlaves] = useState([{ code: "Key1", height: 0, prob: 0 }]);

  const [LlavesOrdenadas, setLlavesOrdenadas] = useState([]);
  const [VistaOrdenada, setVistaOrdenada] = useState(false);
  const [VerTablaA, setVerTablaA] = useState(true);
  const [ArbolBinario, setArbolBinario] = useState({
    value: 0,
    left: null,
    right: null,
  });
  const [Ejecutado, setEjecutado] = useState(false);

  /**
 * actualiza el cambio del dato en el valor de la cantidad de llaves
 * en mas 1 del total, donde 10 es la cantidad minima
 */
  const addKey = () => {
    if (CantidadLlaves < 10) {
      Llaves.push({
        code: "Key".concat(CantidadLlaves + 1),
        height: 0,
        prob: 0,
      });
      setCantidadLlaves(CantidadLlaves + 1);
    }
  };

  /**
 * actualiza el cambio del dato en el valor de la cantidad de llaves
 * en menos 1 del total, donde 1 es la cantidad minima
 */
  const removeKey = () => {
    if (CantidadLlaves > 1) {
      let llaves = JSON.parse(JSON.stringify(Llaves));
      llaves.pop();
      setLlaves(llaves);
      setCantidadLlaves(CantidadLlaves - 1);
    }
  };

  /**
   * actualiza el cambio del dato en el nombre(codigo) de la llave
   */
  const CodeOnchange = (texto, index) => {
    let res = JSON.parse(JSON.stringify(Llaves));
    res[index].code = texto;
    setLlaves(res);
  };

  /**
   * actualiza el cambio del dato en el peso de la llave
   */
  const PesoOnchange = (texto, index) => {
    let res = JSON.parse(JSON.stringify(Llaves));
    res[index].height = parseInt(texto);
    setLlaves(res);
  };

  /**
   * Funcion que ejecuta la funcion de calcular el arbol binario
   */
  const Ejecutar = () => {
    setEjecutado(true);
    let solucion = new ArbolesBinarios(Llaves);
    solucion.execute();
    setR(solucion.R)
    setArbolBinario(solucion.getBinaryTreeArray(solucion.R))
    setA(solucion.A);
    setLlavesOrdenadas(solucion.orderedKeys);
    setVistaOrdenada(true);
  };



  return (
      <>
        <div className="container">
          <div className="h1 text-center text-dark" id="pageHeaderTitle">Arboles Binarios de Busqueda Optima</div>
          <div className="row">
            <div className='col-sm-1 card me-2' style={{width: "150px"}}>
              <h5 className='text-dark mt-2'>numero de llaves</h5>
              <button 
                className='btn btn-secondary mt-2'
                onClick={() => addKey()}
              >
              +
              </button>
              <input readOnly className='form-control mt-2' type="text" value={CantidadLlaves} />
              <button 
                className='btn btn-secondary mt-2'
                onClick={() => removeKey()}
              >
              -
              </button>
              <hr/>
              <hr/>
              <hr/>
              <hr/>
              <hr/>
              <hr/>
              <hr/>
              <hr/>
              <hr/>
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

            <div className='col-sm-4 card me-2' style={{width: "365px"}}>
            <button
                className="btn btn-secondary mt-2"
                onClick={() => setVistaOrdenada(!VistaOrdenada)}
              >
                {VistaOrdenada ? "Ingresar valor de llaves" : "Ver llaves ordenadas" }
              </button>
            {!VistaOrdenada && (
              <div>
                {Llaves.map((item, i) => {
                  return (
                    <div key={Math.random()}>
                      <div
                        style={{
                          display: "inline-block",
                          marginTop: "10px"              
                        }}
                      >
                        <p
                          className='text-dark'
                          style={{
                            display: "inline-block",
                            marginRight: "10px",
                          }}
                        >
                          Llave:#{i}
                        </p>
                        <p
                          className='text-dark'
                          style={{
                            display: "inline-block",
                            marginRight: "10px",
                            marginTop: "-15px",
                            marginBottom: "-15px",
                          }}
                        >
                          Codigo:
                        </p>
                        <input
                          className='form-control'
                          style={{
                            padding: "0",
                            marginTop: "-15px",
                            display: "inline-block",
                            width: "75px",
                          }}
                          defaultValue={item.code}
                          onBlur={(e) => CodeOnchange(e.target.value, i)}
                        ></input>
                        <p
                          className='text-dark'
                          style={{
                            display: "inline-block",
                            padding: "0",
                            marginLeft: "10px",
                            marginRight: "10px",
                            marginTop: "-20px",
                          }}
                        >
                          Peso:
                        </p>
                        <input
                          className='form-control'
                          style={{
                            padding: "0",
                            marginTop: "-20px",
                            display: "inline-block",
                            width: "75px",
                          }}
                          defaultValue={item.height}
                          onBlur={(e) => PesoOnchange(e.target.value, i)}
                        ></input>
                        
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {VistaOrdenada && (
              <div>
                <p className='text-dark'>Llaves ordenadas:</p>
                <p
                  className='text-dark'
                  style={{
                    display: "inline-block",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                >
                  <strong> Llave</strong>
                </p>
                <p
                  className='text-dark'
                  style={{
                    display: "inline-block",
                    marginLeft: "160px",
                    marginRight: "10px",
                  }}
                >
                  <strong> Probabilidad</strong>
                </p>
                <div>
                  {LlavesOrdenadas.map((item, i) => {
                    return (
                      <>
                        <div
                          key={Math.random()}
                          style={{
                            display: "inline-block",
                            marginBottom: "10px",
                          }}
                        >
                          <p
                            className='text-dark'
                            style={{
                              display: "inline-block",
                              marginRight: "10px",
                            }}
                          >
                            {item.code}
                          </p>
                          <p
                            className='text-dark'
                            style={{
                              display: "inline-block",
                              marginRight: "10px",
                              marginLeft: "200px",
                            }}
                          >
                            {item.prob}
                          </p>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            )}
            </div>

            <div className='col-sm-6 card' style={{width: "714px"}}>
              <h5 className='text-dark mt-2'>Tabla</h5>
              <button
                className="btn btn-secondary mb-2"
                style={{width: "150px"}}
                onClick={() => setVerTablaA(!VerTablaA)}
              >
                {VerTablaA ? "Ver tabla R" : "Ver tabla A"}
              </button>
              <div className="table-responsive" style={{ width: "90%" }}>
                {VerTablaA && (
                  <table className="table table-bordered table-sm ">
                    <thead>
                      <tr>
                        <th scope="col" style={{ width: "50px", height: "30px" }}>
                          {""}
                        </th>
                        {A.map((item, i) => {
                          return (
                            <th
                              scope="col"
                              style={{ width: "50px", height: "30px" }}
                            >
                              {i}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {A.map((item, i) => {
                        return (
                          <tr>
                            <th scope="row">{i + 1}</th>
                            {item.map((item, j) => {
                              return (
                                <td style={{ width: "50px", height: "30px" }}>
                                  {A[i][j]}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
                {!VerTablaA && (
                  <table className="table table-bordered table-sm ">
                    <thead>
                      <tr>
                        <th scope="col" style={{ width: "50px", height: "30px" }}>
                          {""}
                        </th>
                        {A.map((item, i) => {
                          return (
                            <th
                              scope="col"
                              style={{ width: "50px", height: "30px" }}
                            >
                              {i}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {R.map((item, i) => {
                        return (
                          <tr>
                            <th scope="row">{i + 1}</th>
                            {item.map((item, j) => {
                              return (
                                <td style={{ width: "50px", height: "30px" }}>
                                  {R[i][j]}
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
        </div>
      </>
    )
  }
  
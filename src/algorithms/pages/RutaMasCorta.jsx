import { useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';



export const RutaMasCorta = () => {
  
  const NodosDefault = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const [RutaOptima, setRutaOptima] = useState(false);
  const [VerP, setVerP] = useState(false);
  const [cantidadNodos, setcantidadNodos] = useState(1);
  const [MatrizInputs, setMatrizInputs] = useState([["0"]]);
  const [MatrizPActual, setMatrizPActual] = useState([["0"]]);
  const [NodosActuales, setNodosActuales] = useState(["A"]);
  const [MatrixIndex, setMatrixIndex] = useState(0);
  const [MatricesD, setMatricesD] = useState([]);
  const [MatricesP, setMatricesP] = useState([]);
  const [Ruta, setRuta] = useState("");
  const [Deshabilitado, setDeshabilitado] = useState(true);

  


  const GenerarD0 = (modo) => {
    let largo = modo ? cantidadNodos + 1 : cantidadNodos - 1;
    let newMatriz = new Array(largo)
      .fill(0)
      .map(() => new Array(largo).fill(0));
    for (let i = 0; i < largo; i++) {
      for (let j = 0; j < largo; j++) {
        if (i === j) {
          newMatriz[i][j] = "0";
        } else {
          newMatriz[i][j] = "∞";
        }
      }
    }

    setMatrizInputs(newMatriz);
  };

  const CrearMatriz = () => {
    let newMatriz = new Array(cantidadNodos)
      .fill(0)
      .map(() => new Array(cantidadNodos).fill(0));
    return newMatriz;
  };

  const copyMatrix = (Matriz1, Matriz2) => {
    for (let i = 0; i < cantidadNodos; i++) {
      for (let j = 0; j < cantidadNodos; j++) {
        Matriz1[i][j] = Matriz2[i][j];
      }
    }
    return Matriz1;
  };

  const AumentarCantidadNodos = () => {
    if (cantidadNodos < 10) {
      unstable_batchedUpdates(() => {
        setcantidadNodos(cantidadNodos + 1);
        let ArrayNuevo = NodosActuales;
        ArrayNuevo.push(NodosDefault[cantidadNodos]);
        setNodosActuales(ArrayNuevo);
        GenerarD0(true);
      });
    }
  };

  const DecremetarCantidadNodos = () => {
    if (cantidadNodos > 1) {
      unstable_batchedUpdates(() => {
        setcantidadNodos(cantidadNodos - 1);
        let ArrayNuevo = NodosActuales;
        ArrayNuevo.pop();
        setNodosActuales(ArrayNuevo);
        GenerarD0(false);
      });
    }
  };

  const CambiarNombreNodo = (valor, index) => {
    let ArrayNuevo = NodosActuales;
    ArrayNuevo[index] = valor;
    setNodosActuales([...ArrayNuevo]);
  };

  const ActualizarMatriz = (valor, i, j) => {
    let MatrizNueva = MatrizInputs;
    MatrizInputs[i][j] = valor;
    setMatrizInputs(MatrizNueva);
  };

  const TransformarMatriz = (Matriz) => {
    for (let i = 0; i < cantidadNodos; i++) {
      for (let j = 0; j < cantidadNodos; j++) {
        if (Matriz[i][j] === "∞") {
          Matriz[i][j] = Number.MAX_SAFE_INTEGER;
        } else {
          Matriz[i][j] = parseInt(Matriz[i][j]);
        }
      }
    }
    return Matriz;
  };

  const HacerP0 = (Matriz) => {
    var Resultado = new Array(cantidadNodos)
      .fill(0)
      .map(() => new Array(cantidadNodos).fill(0));
    const Parseo = JSON.parse(JSON.stringify(Matriz));
    for (let i = 0; i < cantidadNodos; i++) {
      for (let j = 0; j < cantidadNodos; j++) {
        if (Parseo[i][j] === "∞") {
          Resultado[i][j] = "-1";
        } else {
          Resultado[i][j] = "0";
        }
      }
    }
    return Resultado;
  };

  const Floyd = () => {
    setDeshabilitado(false)
    let matrizP = HacerP0(JSON.parse(JSON.stringify(MatrizInputs)));
    let newMatriz = CrearMatriz();
    let matrizResultado = MatrizInputs;
    let matricesD = [];
    let matricesP = [];
    matricesD.push(copyMatrix(CrearMatriz(), MatrizInputs));
    copyMatrix(newMatriz, MatrizInputs);
    TransformarMatriz(newMatriz);
    matricesP.push(copyMatrix(CrearMatriz(), matrizP));
    for (let k = 0; k < cantidadNodos; k++) {
      for (let i = 0; i < cantidadNodos; i++) {
        for (let j = 0; j < cantidadNodos; j++) {
          if (newMatriz[i][k] + newMatriz[k][j] < newMatriz[i][j]) {
            newMatriz[i][j] = newMatriz[i][k] + newMatriz[k][j];
            matrizResultado[i][j] = (
              newMatriz[i][k] + newMatriz[k][j]
            ).toString();
            matrizP[i][j] = k + 1;
          }
        }
      }
      matricesD.push(copyMatrix(CrearMatriz(), matrizResultado));
      matricesP.push(copyMatrix(CrearMatriz(), matrizP));
    }
    setMatrixIndex(cantidadNodos);
    setMatricesD(matricesD);
    setMatricesP(matricesP);
    setMatrizPActual(matricesP[cantidadNodos]);
  };

  const Siguiente = () => {
    if (MatrixIndex < cantidadNodos) {
      setMatrizInputs(MatricesD[MatrixIndex + 1]);
      setMatrizPActual(MatricesP[MatrixIndex + 1]);

      setMatrixIndex(MatrixIndex + 1);
    }
  };

  const Anterior = () => {
    if (MatrixIndex > 0) {
      setMatrizInputs(MatricesD[MatrixIndex - 1]);
      setMatrizPActual(MatricesP[MatrixIndex - 1]);
      setMatrixIndex(MatrixIndex - 1);
    }
  };

  const ToggleMatrizP = () => {
    setMatrizPActual(MatricesP[MatrixIndex]);
    setVerP(!VerP);
  };
  

  const constructPath = (start,arrival) => {

    let pathResult = "";
        if(parseInt(MatricesP[cantidadNodos][start][arrival])=== 0) pathResult = "Ruta directa";
        else if(parseInt(MatricesP[cantidadNodos][start][arrival]) === -1) pathResult = "No hay ruta";
        else{
            pathResult = NodosActuales[start] + " " + constructPathAux(start, arrival);
        }
        return pathResult;
  
  };

  const constructPathAux = (start,arrival) => {
    if(parseInt(MatricesP[cantidadNodos][start][arrival])=== 0){
       return NodosActuales[arrival];
    }
    return constructPathAux(start, parseInt(MatricesP[cantidadNodos][start][arrival]) - 1) + " " + constructPathAux(parseInt(MatricesP[cantidadNodos][start][arrival]) - 1, arrival);
  };


  const ImprimirRuta = () => {
    var Combo1 = document.getElementById('comboA');
    var valorCombo1 = Combo1.options[Combo1.selectedIndex].value;
    var Combo2= document.getElementById('comboHacia');
    var valorCombo2 = Combo2.options[Combo2.selectedIndex].value;
    setRuta(constructPath(parseInt(valorCombo1),parseInt(valorCombo2)))

  };


  return (
    <>
      <div className='container'>
        <div className="h1 text-center text-dark" id="pageHeaderTitle">Rutas mas cortas</div>
        <div className='row'>
          <div className='col-sm-2 card me-2'>
            <h5 className='text-dark mt-2'>numero de nodos</h5>
            <button 
              className='btn btn-secondary mt-2'
              onClick={() => AumentarCantidadNodos()}
            >
            +
            </button>
            <input readOnly className='form-control mt-2' type="text" value={cantidadNodos} />
            <button 
              className='btn btn-secondary mt-2'
              onClick={() => DecremetarCantidadNodos()}
            >
            -
            </button>
            
            
            <hr className='text-dark'/>
            <button className="btn btn-dark" onClick={()=>setRutaOptima(!RutaOptima)}><i className="fas fa-exchange-alt"></i>info</button>
            {!RutaOptima && (
              <div>
                {NodosActuales.map((item,i) => {
                  return (
                    <div className='mb-2'>
                      <h5 className='text-dark mt-2'>nombre de nodos</h5>
                      <hr className='text-dark'/>
                      <p className='text-dark'>nodo {i}</p>
                      <p className='text-dark'>nombre</p>
                      <input 
                        className='form-control mt-2' 
                        type="text" 
                        defaultValue={NodosActuales[i]}
                        onChange={(e) => CambiarNombreNodo(e.target.value, i)}
                      />
                    </div>
                  )
                })}
              </div>
            )}
            {RutaOptima && (
              <div>
                <h5 className='text-dark mt-2'>ruta mas corta</h5>
                <p className='text-dark'>inicio</p>
                <select id="comboA" className='form-control mt-2'>
                  {NodosActuales.map((item,i) => {
                    return (
                      <option value={i}>{item}</option>
                    )
                  })}
                </select>
                <p className='text-dark'>fin</p>
                <select id="comboHacia" className='form-control mt-2'>
                  {NodosActuales.map((item,i) => {
                    return (
                      <option value={i}>{item}</option>
                    )
                  })}
                </select>
                <button 
                  className='btn btn-secondary mt-4'
                  onClick={() => ImprimirRuta()}
                >
                ver ruta
                </button>
                <p className='text-dark mt-2'>ruta corta:</p>
                <p className='text-dark mt-2'>{Ruta}</p>
              </div>
            )}
            
            
          </div>
          
          
          
          <div className='col-sm-9 card'>
            <h5 className='text-dark mt-2'>Tabla</h5>
            <div className='mt-2'>
              <button className='btn btn-secondary me-2' onClick={() => Floyd()}>Ejecutar</button>
              <button className='btn btn-secondary me-2' onClick={() => Anterior()} disabled={Deshabilitado}>Tabla anterior</button>
              <button className='btn btn-secondary me-2' onClick={() => Siguiente()} disabled={Deshabilitado}>Tabla siguiente</button>
              <button className='btn btn-secondary me-2' onClick={() => ToggleMatrizP()} disabled={Deshabilitado}>Matriz P</button>
              <button className='btn btn-secondary me-2' onClick={() => window.location.reload()}>Reset</button>
            </div>
            {!VerP &&
            <div className='table-responsive mt-2'>
              <table className='table table-bordered table-sm mt-2'>
                <thead>
                  <tr>
                    <th space='col' style={{ width: "50px", height: "30px" }}>
                      D ({MatrixIndex})
                    </th>
                    {NodosActuales.map((item,i) =>
                    {
                      return (
                        <th 
                          scope='col'
                          style={{ width: "50px", height: "30px" }}
                        >{item}</th>
                      )
                    })}
                  </tr>
                </thead>
                <tbody>
                  {NodosActuales.map((item,i) => {
                    return (
                      <tr>
                        <th scope="row">{item}</th>
                        {NodosActuales.map((item,j) => {
                          return (
                            <td style={{ width: "50px", height: "30px" }}>
                              <div key={Math.random()}>
                                <input
                                  type="text"
                                  
                                  onChange={(e) =>
                                  ActualizarMatriz(e.target.value,i,j)
                                  }
                                  defaultValue={MatrizInputs[i][j].toString()}
                                  style={{ width: "50px", height: "30px" }}
                                >
                                </input>{" "}
                              </div>
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            }
            {VerP && 
            <div className='table-responsive mt-2'>
              <table className='table table-bordered table-sm mt-2'>
                <thead>
                  <tr>
                    <th scope="col" style={{ width: "50px", height: "30px" }}>
                      P({MatrixIndex})
                    </th>
                    {NodosActuales.map((item,i) => {
                      return (
                      <th 
                        scope="col"
                        style={{ width: "50px", height: "30px" }}
                      >
                        {item}
                      </th>
                      )
                    })}
                  </tr>
                </thead>
                <tbody>
                  {NodosActuales.map((item,i) => {
                    return (
                      <tr>
                        <th scope="row">{item}</th>
                        {NodosActuales.map((item,j) => {
                          return (
                            <td key={Math.random()} style={{ width: "50px", height: "30px" }}>
                              <div >
                                <input
                                  type="text"
                                  
                                  readOnly={true}
                                  style={{ width: "50px", height: "30px" }}
                                  defaultValue={MatrizPActual[i][j].toString()}
                                >
                                </input>{" "}
                              </div>
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            }
          </div>
        </div>
      </div>
    </>  
    
    
  )
}

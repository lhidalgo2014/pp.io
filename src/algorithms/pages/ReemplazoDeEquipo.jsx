import { useState } from 'react';
import { unstable_batchedUpdates } from "react-dom";
import { ReemplazoEquiposLogic } from './logica/RemplazoEquipo';


export const ReemplazoDeEquipo = () => {
  

  const [CostoInicial, setCostoInicial] = useState(0);
  const [PlazoProyecto, setPlazoProyecto] = useState(1);
  const [VidaUtil, setVidaUtil] = useState(1);

  const [Ganancia, setGanancia] = useState(false);
  
  const [MatrizSolucion, setMatrizSolucion] = useState([
    [0, 0, 0],
    [1, 0, 0],
  ]);
  const [TablaVidaUtil, setTablaVidaUtil] = useState([
    { 
      year: 1, 
      resale: 0, 
      maintenance: 0, 
      gain: 0 
    },
  ]);

  const [Planes, SetPlanes] = useState([]);

  const AddLifeSpan = () => {
    if (VidaUtil < 10) {
      unstable_batchedUpdates(() => {
        let res = JSON.parse(JSON.stringify(TablaVidaUtil));
        res.push({ year: VidaUtil + 1, resale: 0, maintenance: 0, gain: 0 });
        setVidaUtil(VidaUtil + 1);
        setTablaVidaUtil(res);
      });
    }
  };

  const RemoveLifeSpan = () => {
    if (VidaUtil > 1) {
      unstable_batchedUpdates(() => {
        let res = JSON.parse(JSON.stringify(TablaVidaUtil));
        res.pop();
        setVidaUtil(VidaUtil - 1);
        setTablaVidaUtil(res);
      });
    }
  };

  const AddPlazo = () => {
    if (PlazoProyecto < 30) {
      unstable_batchedUpdates(() => {
        let res = JSON.parse(JSON.stringify(MatrizSolucion));
        res.push([PlazoProyecto + 1, 0, 0]);
        setMatrizSolucion(res);
        setPlazoProyecto(PlazoProyecto + 1);
      });
    }
  };

  const RemovePlazo = () => {
    if (PlazoProyecto > 1) {
      unstable_batchedUpdates(() => {
        let res = JSON.parse(JSON.stringify(MatrizSolucion));
        res.pop();
        setMatrizSolucion(res);
        setPlazoProyecto(PlazoProyecto - 1);
      });
    }
  };

  const ReventaOnchange = (texto, index) => {
    let res = JSON.parse(JSON.stringify(TablaVidaUtil));
    res[index].resale = parseInt(texto);
    setTablaVidaUtil(res);
  };

  const MantenimientoOnchange = (texto, index) => {
    let res = JSON.parse(JSON.stringify(TablaVidaUtil));
    res[index].maintenance = parseInt(texto);
    setTablaVidaUtil(res);
  };
  const GananciaOnchange = (texto, index) => {
    let res = JSON.parse(JSON.stringify(TablaVidaUtil));
    res[index].gain = parseInt(texto);
    setTablaVidaUtil(res);
  };

  const Ejecutar = () => {
    let algoritmo = new ReemplazoEquiposLogic(
      TablaVidaUtil,
      PlazoProyecto,
      VidaUtil,
      CostoInicial,
      Ganancia
    );
    let solutionMatrix = algoritmo.execute();
    unstable_batchedUpdates(() => {
        setMatrizSolucion(solutionMatrix);
        SetPlanes(algoritmo.getPlans(solutionMatrix)) ;
    });
   
  };
  
  return (
    <>
      <div className="container">
        <div className="h1 text-center text-dark" id="pageHeaderTitle">Reemplazo de Equipos</div>
        <div className="row">
          <div className="col-sm-2 card me-3">
            <h5 className='text-dark mt-2'>Costo inicial</h5>
            <input 
              className='form-control' 
              type="text"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              onChange={(e) => setCostoInicial(parseInt(e.target.value))}
              value={CostoInicial ? CostoInicial : " "}
            />
            <hr className='text-dark mb-1'/>
            <h5 className='text-dark'>Plazo</h5>
            <button 
              className='btn btn-secondary mt-2'
              onClick={() => AddPlazo()}
            >
            +
            </button>
            <input 
              readOnly 
              className='form-control mt-2' 
              type="text"
              value={PlazoProyecto}
            />
            <button 
              className='btn btn-secondary mt-2'
              onClick={() => RemovePlazo()}
            >
            -
            </button>
            <hr className='text-dark mb-1'/>
            <h5 className='text-dark'>Vida util</h5>
            <button 
              className='btn btn-secondary'
              onClick={() => AddLifeSpan()}
            >
            +
            </button>
            <input 
              readOnly 
              className='form-control mt-2' 
              type="text"
              value={VidaUtil}
            />
            <button 
              className='btn btn-secondary mt-2'
              onClick={() => RemoveLifeSpan()}
            >
            -
            </button>
            <hr className='text-dark mb-1'/>
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
          <div className="col-sm-4 card me-3">
            <h5 className='text-dark mt-2'>TABLA DE DATOS</h5>
            <div style={{display: "inline-block"}}>
            <input
                style={{display: "inline-block"}}
                className="form-check-input mb-2 me-2"
                type="checkbox"
                checked={Ganancia}
                onChange={() => setGanancia(!Ganancia)}
              ></input>
              <h5 className="form-check-label text-dark" style={{display: "inline-block"}}>
                Permitir el ingreso de ganancias
              </h5>
            </div>
            <div className="table-responsive">
            <table className="table table-bordered table-sm ">
              <thead>
                <tr>
                  <th scope="col">Año</th>
                  <th scope="col">Reventa</th>
                  <th scope="col">Mantenimiento</th>
                  <th scope="col">Ganancia</th>
                </tr>
              </thead>
              <tbody>
                {TablaVidaUtil.map((item, i) => {
                  return (
                    <tr>
                      <td>{item.year}</td>
                      <td style={{ width: "50px", height: "30px" }}>
                        <div key={Math.random()}>
                          <input
                            defaultValue={item.resale}
                            type="text"
                            style={{ width: "75px", height: "30px" }}
                            onBlur={(e) => ReventaOnchange(e.target.value, i)}
                          ></input>{" "}
                        </div>
                      </td>
                      <td style={{ width: "50px", height: "30px" }}>
                        <div key={Math.random()}>
                          <input
                            defaultValue={item.maintenance}
                            type="text"
                            style={{ width: "130px", height: "30px" }}
                            onBlur={(e) =>
                              MantenimientoOnchange(e.target.value, i)
                            }
                          ></input>{" "}
                        </div>
                      </td>
                      <td style={{ width: "50px", height: "30px" }}>
                        <div key={Math.random()}>
                          <input
                            defaultValue={item.gain}
                            type="text"
                            style={{ width: "130px", height: "30px" }}
                            disabled={!Ganancia}
                            onBlur={(e) =>
                              GananciaOnchange(e.target.value, i)
                            }
                          ></input>{" "}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
            
          </div>
          <div className="col-sm-3 card me-3">
            <h5 className='text-dark mt-2'>TABLA RESULTADO</h5>
            <div className="table-responsive">
                <table className="table table-bordered table-sm ">
                  <thead>
                    <tr>
                      <th scope="col">
                        t
                      </th>
                      <th scope="col" >
                        G(t)
                      </th>
                      <th scope="col">
                        Próximo
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {MatrizSolucion.map((item, i) => {
                      return (
                        <tr>
                          <td>{item[0]}</td>
                          <td>{item[1]}</td>
                          {!Array.isArray(item[2]) && <td>{item[2]}</td>}
                          {Array.isArray(item[2]) && <td>{item[2].join()}</td>}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
          </div>
          <div className="col-sm-2 card me-3" style={{ width: "260px" }}>
            <h5 className='text-dark mt-2'>PLAN DE REEMPLAZO</h5>
            {Planes.map((item, i) => {
                    return (
                       <>
                            <p className='text-dark mt-2'>Plan #{i + 1}</p>
                            <div >
                            {item.map((elemento, j) => {
                                return(
                                    <>
                                    {j!==0 && <i className="fas fa-arrow-right" style={{paddingRight:"3px",paddingLeft:"3px"}}></i>}
                                    <div className="numberCircle text-dark" style={{display:"inline-block"}}>{elemento}</div>
                                    </>

                                )
                            })}
                            </div>
                       </>
                    );
                  })}
          </div>
        </div>
      </div>
    </>
  )
}

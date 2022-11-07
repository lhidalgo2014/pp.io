import React from 'react'
import './rutaCortaStyle.css'
import { useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { SeriesDeportivasLogica } from "./logica/SeriesDeportivas";


export const SeriesDeportivas = () => {
  
  const [Ph, SetPh] = useState(0);
  const [Pr, SetPr] = useState(0);
  const [Qh, SetQh] = useState(100);
  const [Qr, SetQr] = useState(100);
  const [MatrizSolucion, SetMatrizSolucion] = useState([
    ["", ""],
    ["", ""],
  ]);
  const [ListaJuegos, SetListaJuegos] = useState([1]);
  const [NumeroJuegos, SetNumeroJuegos] = useState(1);
  
  const addMaxGames = () =>  {
    if(NumeroJuegos<11){

      let ListaDejuegosNueva = JSON.parse(JSON.stringify(ListaJuegos));
      ListaDejuegosNueva.push(1);
      ListaDejuegosNueva.push(1);    
      SetListaJuegos(ListaDejuegosNueva)
      let MatrizSolucionNueva = JSON.parse(JSON.stringify(MatrizSolucion));
      MatrizSolucionNueva.forEach(row => {
        row.push("");
      });
      MatrizSolucionNueva.push(new Array((((NumeroJuegos+2) + 1) / 2) + 1).fill(""));
      SetNumeroJuegos(NumeroJuegos+2);
      SetMatrizSolucion(MatrizSolucionNueva)

    }
   
  }

  const removeMaxGames = () =>  {
    if(NumeroJuegos>1){
      let ListaDejuegosNueva = JSON.parse(JSON.stringify(ListaJuegos));
      ListaDejuegosNueva.pop();
      ListaDejuegosNueva.pop();    
      SetListaJuegos(ListaDejuegosNueva)
      let MatrizSolucionNueva = JSON.parse(JSON.stringify(MatrizSolucion));
      MatrizSolucionNueva.pop(); 
      MatrizSolucionNueva.forEach(row => {
        row.pop(); 
      });
      SetNumeroJuegos(NumeroJuegos-2);
      SetMatrizSolucion(MatrizSolucionNueva)
    } 
  }


  const CalcularQr = (value) =>  {
    setTimeout(() => {
      let ph=25
      let qr=0
      if (parseInt(value) > 100) {
         ph = 100;
      } 
      else if (parseInt(value) < 0 || value === "") {
        ph = 0;
      }
      ph=parseInt(value)
      qr = 100-ph
      SetPh(ph)
      SetQr(qr)
  
    }, 25);
    


  }
  const CalcularQh= (value) =>  {
    setTimeout(() => {
      let pr=25
      let qh=0
      if (parseInt(value) > 100) {
        pr = 100;
      } 
      else if (parseInt(value) < 0 || value === "") {
        pr = 0;
      }
      pr=parseInt(value)
      qh = 100-pr
      SetPr(pr)
      SetQh(qh)
  
    }, 25);

  }

  const SwitchOnChange= (index) =>  {
    let ListaDejuegosNueva = JSON.parse(JSON.stringify(ListaJuegos));
    ListaDejuegosNueva[index]=ListaDejuegosNueva[index]===1?0:1
    SetListaJuegos(ListaDejuegosNueva)
  }

  const Ejecutar = () => {
    let algoritmo = new SeriesDeportivasLogica(NumeroJuegos,Ph,Pr,ListaJuegos);
    unstable_batchedUpdates(() => {
        SetMatrizSolucion(algoritmo.execute());
    });
   
  };

  
  return (
    <>
      <div className="container">
        <div className="h1 text-center text-dark" id="pageHeaderTitle">SERIES DEPORTIVAS</div>
        <div className="row">
          <div className='col-sm-2 card me-2'>
            <h5 className='text-dark mt-2'>numero de juegos</h5>
            <button 
              className='btn btn-secondary mt-2'
              onClick={()=>addMaxGames()}
            >
            +
            </button>
            <input 
              readOnly 
              className='form-control mt-2' 
              type="text"
              value={NumeroJuegos}
            />
            <button 
              className='btn btn-secondary mt-2'
              onClick={()=>removeMaxGames()}
            >
            -
            </button>
            <hr className='text-dark mb-1'/>
            <div style={{display: "inline-block"}}>
            <h5 className='text-dark mt-2 me-2'>Probabilidad de A de ganar casa</h5>
              <h5 className='text-dark mt-2 me-2' style={{display: "inline-block"}}>Ph (%) : </h5>
              <input 
                style={{display: "inline-block", width: "120px"}}
                className='form-control mt-2 ml-5' 
                onChange={(e) => CalcularQr(e.target.value)}
                value={Ph}
                type="text"
              />
            </div>
            <div style={{display: "inline-block"}}>
              <h5 className='text-dark mt-2 me-2' style={{display: "inline-block"}}>Qr (%) : </h5>
              <input 
                style={{display: "inline-block", width: "120px"}}
                className='form-control mt-2' 
                type="text"
                disabled={true}
                value={Qr}
              />
            </div>
            <hr className='text-dark mb-1'/>
            <div style={{display: "inline-block"}}>
            <h5 className='text-dark mt-2 me-2'>Probabilidad de A de ganar visita</h5>
              <h5 className='text-dark mt-2 me-2' style={{display: "inline-block"}}>Pr (%) : </h5>
              <input 
                style={{display: "inline-block", width: "123px"}}
                className='form-control mt-2' 
                onChange={(e) => CalcularQh(e.target.value)}
                value={Pr}
                type="text"
              />
            </div>
            <div style={{display: "inline-block"}}>
              <h5 className='text-dark mt-2 me-1' style={{display: "inline-block"}}>Qh (%) :</h5>
              <input 
                style={{display: "inline-block", width: "120px"}}
                readOnly 
                className='form-control mt-2' 
                type="text"
                value={Qh}
                disabled={true}
              />
            </div>
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

          <div className='col-sm-3 card me-2'>
          <h5 className='text-dark mt-2'>Forma de juego</h5>
          {ListaJuegos.map((item,i)=>{
            return(
              <div key={Math.random()}  style={{display: "inline-block", marginTop:"15px"}}>
                  <label className='text-dark me-2'><p style={{display: "inline-block", marginBottom:"2px"}}>Juego <strong>#{i + 1} &#x2192; </strong></p></label>
                  <input
                    style={{ display: "inline-block"}}
                    className="form-check-input me-2"
                    type="checkbox"
                    checked={ListaJuegos[i]}
                    onChange={() => SwitchOnChange(i)}
                  ></input>
                  <p className='text-dark' style={{ display: "inline-block"}}>{ListaJuegos[i]===1?"Casa":"Visita"}</p>
            </div>

          )})}
          </div>
          
          <div className='col-sm-6 card me-2'>
            <h5 className='text-dark mt-2'>Tabla de serie</h5>
            <div class="table-responsive" style={{ width: "90%" }}>
              <table class="table table-bordered table-sm ">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: "50px", height: "30px"}}>
                    {""}
                    </th>
                    {MatrizSolucion.map((item, i) => {
                      return (
                        <th
                          scope="col"
                          style={{ width: "50px", height: "30px" ,backgroundColor:"#dee2e6"}}
                        >
                          {i}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {MatrizSolucion.map((item, i) => {
                    return (
                      <tr>
                        <th scope="row" style={{backgroundColor:"#dee2e6"}}>{i}</th>
                        {MatrizSolucion.map((item, j) => {
                          return (
                            <td style={{ width: "50px", height: "30px" ,backgroundColor: (i===j && i===MatrizSolucion.length-1)? '#6c757d': '#FFFFFF'}}>
                              <div key={Math.random()} >
                                {i===0 && j===0 && <p>{"-"}</p>}
                                {(i!==j || i>0) && (i) && <p >{MatrizSolucion[i][j]}</p>}

                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

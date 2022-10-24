import { useState } from 'react';
import { unstable_batchedUpdates } from "react-dom";
import   {Knapsack01}  from './logica/Knapsack01';
import  { BoundedKnapsack}  from './logica/Bounded';
import  { UnboundedKnapsack}  from './logica/UnBounded';



export const ProblemaDeLaMochila = () => {
  
  const [CantidadObjetos, SetCantidadObjetos] = useState(1);
  const [CapacidadMochila, SetCapacidadMochila] = useState(1);
  const [Solucion, SetSolucion] = useState(false);
  const [Objetos, setObjetos] = useState([
    { id: 0, cost: 0, value: 0, quantity: 1, selected: false, count: 0 },
  ]);
  const [Matrix, SetMatrix] = useState([[0], [0]]);
  const [Matrix2, SetMatrix2] = useState([[0], [0]]);
  const [Type, SetType] = useState(0);

  const Ejecutar = () => {
    let res = JSON.parse(JSON.stringify(Objetos));

    res.forEach((item, i) => {
      res[i].cost = parseInt(
        document.getElementById("cost-" + i.toString()).value
      );
      res[i].value = parseInt(
        document.getElementById("value-" + i.toString()).value
      );

      res[i].quantity = parseInt(
        document.getElementById("quantity-" + i.toString()).value == "Infinity"
          ? Number.MAX_SAFE_INTEGER
          : document.getElementById("quantity-" + i.toString()).value
      );
      if (res[i].quantity === Number.MAX_SAFE_INTEGER)
        res[i].quantity = Infinity;
    });
    setObjetos(res);
    if (Type == 0) {
      new Knapsack01(
        Matrix,
        Matrix2,
        CantidadObjetos,
        Matrix.length,
        res
      ).execute();
    } else if (Type == 1) {
      new BoundedKnapsack(
        Matrix,
        Matrix2,
        CantidadObjetos,
        Matrix.length,
        res
      ).execute();
    } else {
      new UnboundedKnapsack(
        Matrix,
        Matrix2,
        CantidadObjetos,
        Matrix.length,
        res
      ).execute();
    }
    console.log(res);
    res = getSelectedItems(res);
    if (getQuantity() === Infinity) {
      res.forEach((item, i) => {
        res[i].quantity = Infinity;
      });
    }
    setObjetos(res);
  };

  const getQuantity = () => {
    return Type == 0 || Type == 1 ? 1 : Infinity;
  };

  const addItem = () => {
    if (CantidadObjetos < 10) {
      SetCantidadObjetos(CantidadObjetos + 1);
      let res = JSON.parse(JSON.stringify(Objetos));
      res.push({
        id: Objetos.length,
        cost: 0,
        value: 0,
        quantity: getQuantity(),
        selected: false,
        count: 0,
      });
      Matrix.forEach((row) => {
        row.push(0);
      });
      Matrix2.forEach((row) => {
        row.push(0);
      });
      res.forEach((item, i) => {
        res[i].quantity = res[res.length - 1].quantity;
      });
      setObjetos(res);
    }
  };

  const RemoveItem = () => {
    if (CantidadObjetos > 1) {
      SetCantidadObjetos(CantidadObjetos - 1);
      let res = JSON.parse(JSON.stringify(Objetos));
      res.pop();
      var quantity = Type != 2 ? 1 : Infinity;
      res.forEach((item, i) => {
        res[i].quantity = quantity;
      });
      setObjetos(res);
      Matrix.forEach((row) => {
        row.pop();
      });
      Matrix2.forEach((row) => {
        row.pop();
      });
    }
  };

  const AddCapacity = () => {
    if (CapacidadMochila < 20) {
      SetCapacidadMochila(CapacidadMochila + 1);
      Matrix.push(new Array(CantidadObjetos).fill(0));
      Matrix2.push(new Array(CantidadObjetos).fill(0));
    }
  };

  const removeCapacity = () => {
    if (CapacidadMochila > 1) {
      SetCapacidadMochila(CapacidadMochila - 1);
      Matrix.pop();
      Matrix2.pop();
    }
  };

  const changeKind = () => {
    unstable_batchedUpdates(() => {
      var Combo = document.getElementById("ComboTipo");
      var valorCombo = parseInt(Combo.options[Combo.selectedIndex].value);
      var quantity = valorCombo != 2 ? 1 : Infinity;
      let res = JSON.parse(JSON.stringify(Objetos));
      res.forEach((item) => {
        item.quantity = quantity;
      });
      setObjetos(res);
      SetType(valorCombo);
    });
  };

  const GetTd = (i, j) => {
    if (Type == 0 && Matrix2[i][j] == 0) {
      return (
        <td style={{ backgroundColor: "red" }}>
          <p>{Matrix[i][j]}</p>
        </td>
      );
    } else if (Type == 0 && Matrix2[i][j] != 0) {
      return (
        <td style={{ backgroundColor: "green" }}>
          <p>{Matrix[i][j]}</p>
        </td>
      );
    } else if (Type != 0 && Matrix2[i][j] == 0) {
      return (
        <td style={{ backgroundColor: "red" }}>
          <p>
            {Matrix[i][j]}
            <sub>
              x<sub>{j}</sub>={Matrix2[i][j]}
            </sub>
          </p>
        </td>
      );
    } else {
      return (
        <td style={{ backgroundColor: "green" }}>
          <p>
            {Matrix[i][j]}
            <sub>
              x<sub>{j}</sub>={Matrix2[i][j]}
            </sub>
          </p>
        </td>
      );
    }
  };

  const getSelectedItems = (Matriz) => {
    let i = Matrix2.length - 1;
    let j = Objetos.length - 1;
    let res = JSON.parse(JSON.stringify(Matriz));
    while (j >= 0) {
      res[j].selected = Matrix2[i][j] != 0;
      res[j].count = Matrix2[i][j];
      i = i - Matrix2[i][j] * res[j].cost;
      j -= 1;
    }
    return res;
  };

  const GuardarArchivo = () => {
    let res = JSON.parse(JSON.stringify(Objetos));
    if (getQuantity() === Infinity) {
      res.forEach((item, i) => {
        res[i].quantity = "Infinity";
      });
    }
    res.forEach((item, i) => {
      res[i].selected = false;
      res[i].quantity = res[i].quantity.toString();
      res[i].cost = res[i].cost.toString();
      res[i].value = res[i].value.toString();
    });
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," +
        encodeURIComponent(
          JSON.stringify({
            tipo: Type,
            knapsacksize: CapacidadMochila,
            items: res,
          })
        )
    );
    element.setAttribute("download", "mochila.json");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };


  const ReiniciarEstados = () => {
    unstable_batchedUpdates(() => {
      SetCantidadObjetos(1);
      SetCapacidadMochila(1);
      SetSolucion(false);
      setObjetos([
        { id: 0, cost: 0, value: 0, quantity: 1, selected: false, count: 0 },
      ]);
      SetMatrix([[0], [0]]);
      SetMatrix2([[0], [0]]);
      SetType(0);
    });
  };



  return (
    <>
      <div className="cointainer">
        <div className="h1 text-center text-dark" id="pageHeaderTitle">Problema de la mochila</div>
        <div className="row">
          <div className="col-sm-2 card me-3">
            <h5 className='text-dark mt-2'>algoritmo</h5>
            <select 
              className='form-control mt-2'
              id="ComboTipo"
              onChange={() => changeKind()}
              value={Type}
            >
              <option value="0">1/0</option>
              <option value="1">bounded</option>
              <option value="2">unbounded</option>
            </select>
            <h5 className='text-dark mt-2'># de objetos</h5>
            <button 
              className='btn btn-secondary mt-2'
              onClick={() => addItem()}
            >
            +
            </button>
            <input 
              readOnly 
              className='form-control mt-2' 
              type="text"
              value={CantidadObjetos}
            />
            <button 
              className='btn btn-secondary mt-2'
              onClick={() => RemoveItem()}
            >
            -
            </button>
            <h5 className='text-dark mt-2'>capacidad de mochila</h5>
            <button 
              className='btn btn-secondary mt-2'
              onClick={() => AddCapacity()}
            >
            +
            </button>
            <input 
              readOnly 
              className='form-control mt-2' 
              type="text"  
              value={CapacidadMochila}
            />
            <button 
              className='btn btn-secondary mt-2 mb-2'
              onClick={() => removeCapacity()}
            >
            -
            </button>
            <hr className='text-dark mt-2'/>
            <button 
              className='btn btn-primary mb-2'
              onClick={() => Ejecutar()}
            >
              Ejecutar
            </button>
            <button 
              className='btn btn-danger mb-2'
              onClick={() => window.location.reload()}
            >
              Reiniciar
            </button>
          </div>


          <div className="col-sm-4 card me-3">
            <h5 className='text-dark mt-2'>objetos</h5>
            {
              Objetos.map((item,i) => {
                return (
                  <div key={Math.random()}>
                    <h6 
                      className='text-dark mt-2'
                      style={{
                        paddingLeft: "15px",
                        paddingRight: "5px",
                        display: "inline-block",
                      }}
                    >
                      item <strong>#{item.id} </strong> &#x2192; {"C"}
                      <sub>{item.id}</sub>:
                    </h6>
                    <input 
                      className='form-control mt-2'
                      id={"cost-" + i.toString()}
                      defaultValue={item.cost}
                      style={{ 
                        width: "50px", 
                        display: "inline-block" 
                      }}
                    >
                    </input>
                    <h6
                      className='text-dark mt-2'
                      style={{
                        paddingLeft: "15px",
                        paddingRight: "5px",
                        display: "inline-block",
                      }}
                    >
                      V<sub>{item.id}</sub>:
                    </h6>
                    <input
                      className='form-control mt-2'
                      id={"value-" + i.toString()}
                      defaultValue={item.value}
                      style={{ width: "50px", display: "inline-block" }}
                    ></input>
                    <h6
                      className='text-dark mt-2'
                      style={{
                        paddingLeft: "15px",
                        paddingRight: "5px",
                        display: "inline-block",
                      }}
                    >
                      Q<sub>{item.id}</sub>:
                    </h6>
                    <input
                      className='form-control mt-2'
                      id={"quantity-" + i.toString()}
                      defaultValue={item.quantity}
                      disabled={Type == 0 || Type == 2 ? true : false}
                      style={{ width: "50px", display: "inline-block" }}
                    ></input>

                  </div>
                )
              })
            }
          </div>
          <div className="col-sm-5 card me-3">
            <h5 className='text-dark mt-2'>representacion matematica</h5>
            {
              <div key={Math.random()} 
              >
                <div style={{ display: "inline-block", marginBottom: "10px" }}>
                  <h6 className='text-dark mt-2'>max <strong>Z</strong> =</h6>
                  {Objetos.map((item, i) => {
                    return (
                      <>
                        {" "}
                        <h6 className='text-dark mt-2' style={{ display: "inline-block" }}>
                          {" "}
                          {item.value}x<sub>{item.id}</sub>
                        </h6>
                        {item.id != Objetos.length - 1 && (
                        <p className='text-dark mt-2' style={{ display: "inline-block" }}>+</p>
                        )}
                      </>
                    );
                  })}
                </div>
                <div>
                  <h6 className='text-dark mt-2'>Sujeto a:</h6>
                  {Objetos.map((item, i) => {
                    return (
                      <>
                        {" "}
                        <h6 className='text-dark mt-2' style={{ display: "inline-block" }}>
                          {" "}
                          {item.cost}x<sub>{item.id}</sub>
                        </h6>
                        {item.id != Objetos.length - 1 && (
                          <p className='text-dark mt-2' style={{ display: "inline-block" }}>+</p>
                        )}
                      </>
                    );
                  })}
                  <p>&#x2264;{CapacidadMochila}</p>
                </div>
                <p className='text-dark mt-2'>Solución: </p>
                <div style={{ display: "inline-block" }}>
                  &#123;
                  {Objetos.map((item, i) => {
                    return (
                      <>
                        {" "}
                        <h6 className='text-dark mt-2' style={{ display: "inline-block" }}>
                          x<sub>{item.id}</sub> = {item.count}
                          {item.id != Objetos.length - 1 && (
                            <p className='text-dark mt-2' style={{ display: "inline-block" }}> , </p>
                          )}
                        </h6>
                      </>
                    );
                  })}
                  &#125;
                </div>
            </div>
            }
          </div>

          <div className="col-sm-8 card mt-3 align-self-center">
            <h5 className='text-dark mt-2'>Tabla</h5>
            <div className="table-responsive-sm">
              <table className="table table-bordered table-sm ">
                <thead>
                  <tr>
                    <th scope="col"> </th>
                    {Objetos.map((item, i) => {
                      return (
                        <th
                          scope="col"
                          style={{
                            backgroundColor: item.selected ? "green" : null,
                          }}
                        >
                          #{i}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {Matrix.map((fila, i) => {
                    return (
                      <tr>
                        <th scope="col">{i}</th>
                        {fila.map((columna, j) => {
                          return GetTd(i, j);
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

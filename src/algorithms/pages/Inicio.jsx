import { Link } from "react-router-dom";
import './cardsStyle.css'
import ruta from '../../assets/ruta2.jpg'
import mochila from '../../assets/mochila2.jpg'
import maquina from '../../assets/maquina2.jpg'
import arboles from '../../assets/arboles2.jpg'
import deporte from '../../assets/deporte2.jpg'
import cubo from '../../assets/cubo.jpg'


export const Inicio = () => {


    return (
      <>
        <section className="light">
        <div className="container py-2">
          <div className="h1 text-center text-dark" id="pageHeaderTitle">Algoritmos</div>

          <article className="postcard light blue">
            
            <a className="postcard__img_link">
            <img className="postcard__img" src={ruta} alt="Title" />
            </a>
            
            <div className="postcard__text t-dark">
              <Link to={'/rutaMasCorta'}>
              <h1 className="postcard__title blue">Rutas mas cortas</h1>
              </Link>
              <div className="postcard__subtitle small">
                <time dateTime="2020-05-25 12:00:00">
                  <i className="fas fa-calendar-alt mr-2"></i>Floyd-Warshall
                </time>
              </div>
              <div className="postcard__bar"></div>
              <div className="postcard__preview-txt">El algoritmo de rutas más cortas es en uno de los módulos de análisis más importantes de los algoritmos de grafos Este se encarga de detectar dentro de un grafo cuál es la ruta más eficiente o el recorrido de menor distancia entre un par de vértices que conforman un grafo.</div>
              <ul className="postcard__tagbox">
                <li className="tag__item play blue">
                    <Link to={'/rutaMasCorta'}>
                      <i className="fas fa-play mr-2"></i>Ejecutar
                    </Link>
                  </li>

              </ul>
            </div>
          </article>
          <article className="postcard light blue">
            <a className="postcard__img_link">
              <img className="postcard__img" src={mochila} alt="Title" />	
            </a>
            <div className="postcard__text t-dark">
              <Link to={'/problemaDeLaMochila'}>
              <h1 className="postcard__title red">Problema de la Mochila</h1>
              </Link>
              <div className="postcard__subtitle small">
                <time dateTime="2020-05-25 12:00:00">
                  <i className="fas fa-calendar-alt mr-2"></i>Knapsack
                </time>
              </div>
              <div className="postcard__bar"></div>
              <div className="postcard__preview-txt">Es un problema de optimización combinatoria, es decir, que busca la mejor solución entre un conjunto finito de posibles soluciones a un problema. Modela una situación análoga al llenar una mochila, incapaz de soportar más de un peso determinado, con todo o parte de un conjunto de objetos, cada uno con un peso y valor específicos.</div>
              <ul className="postcard__tagbox">
                <li className="tag__item play blue">
                <Link to={'/problemaDeLaMochila'}>
                  <i className="fas fa-play mr-2"></i>Ejecutar
                </Link>
                </li>
              </ul>
            </div>
          </article>
          <article className="postcard light blue">
            <a className="postcard__img_link">
              <img className="postcard__img" src={maquina} alt="Title" />
            </a>
            <div className="postcard__text t-dark">
              <Link to={'/reemplazoDeEquipo'}>
              <h1 className="postcard__title green">Reemplazo de Equipos</h1>
              </Link>
              <div className="postcard__subtitle small">
                <time dateTime="2020-05-25 12:00:00">
                  <i className="fas fa-calendar-alt mr-2"></i>Dijkstra
                </time>
              </div>
              <div className="postcard__bar"></div>
              <div className="postcard__preview-txt">Dado un equipo cuya edad en la fecha de adquisición es cero, se trata de
determinar la edad del equipo que se considera conveniente substituir tomando
en consideración las variables de tiempo de falla, costo inicial, gastos de operación,
costo de mantenimiento, rendimiento del equipo y el valor de salvamento.</div>
              <ul className="postcard__tagbox">
                <li className="tag__item play blue">
                  <Link to={'/reemplazoDeEquipo'}>
                  <i className="fas fa-play mr-2"></i>Ejecutar
                  </Link>
                </li>
              </ul>
            </div>
          </article>
          <article className="postcard light blue">
            <a className="postcard__img_link">
              <img className="postcard__img" src={arboles} alt="Title" />
            </a>
            <div className="postcard__text t-dark">
              <Link to={'/arbolesBinariosDeBusquedaOptimos'}>
              <h1 className="postcard__title yellow">Arboles Binarios de Busqueda Optimos</h1>
              </Link>
              <div className="postcard__subtitle small">
                <time dateTime="2020-05-25 12:00:00">
                  <i className="fas fa-calendar-alt mr-2"></i>ABB
                </time>
              </div>
              <div className="postcard__bar"></div>
              <div className="postcard__preview-txt">Un árbol binario de búsqueda(ABB) es un árbol binario con la propiedad de que todos los elementos almacenados en el subárbol izquierdo de cualquier nodo x son menores que el elemento almacenado en x ,y todos los elementos almacenados en el subárbol derecho de x son mayores que el elemento almacenado en x.</div>
              <ul className="postcard__tagbox">
                <li className="tag__item play blue">
                  <Link to={'/arbolesBinariosDeBusquedaOptimos'}>
                  <i className="fas fa-play mr-2"></i>Ejecutar
                  </Link>
                </li>
              </ul>
            </div>
          </article>
          <article className="postcard light blue">
            <a className="postcard__img_link">
              <img className="postcard__img" src={deporte} alt="Title" />
            </a>
            <div className="postcard__text t-dark">
              <Link to={'/seriesDeportivas'}>
              <h1 className="postcard__title blue">Series Deportivas</h1>
              </Link>
              <div className="postcard__subtitle small">
                <time dateTime="2020-05-25 12:00:00">
                  <i className="fas fa-calendar-alt mr-2"></i>Local-visita
                </time>
              </div>
              <div className="postcard__bar"></div>
              <div className="postcard__preview-txt">El algoritmo de series deportivas se utiliza para predecir el equipo ganador de una serie que se juegue al mejor de 5 o 7 juegos por ejemplo. Este algoritmo tiene la variante donde se puede tomar en cuenta la probabilidad de ganar de un equipo cuando se encuentra jugando de local y tambien cuando esta jugando de visitante.</div>
              <ul className="postcard__tagbox">
                <li className="tag__item play blue">
                  <Link to={'/seriesDeportivas'}>
                  <i className="fas fa-play mr-2"></i>Ejecutar
                  </Link>
                </li>
              </ul>
            </div>
          </article>
          <article className="postcard light blue">
            <a className="postcard__img_link">
              <img className="postcard__img" src={cubo} alt="Title" />	
            </a>
            <div className="postcard__text t-dark">
              <Link to={'/multiplicacionDeMatrices'}>
              <h1 className="postcard__title red">Multiplicacion de Matrices</h1>
              </Link>
              <div className="postcard__subtitle small">
                <time dateTime="2020-05-25 12:00:00">
                  <i className="fas fa-calendar-alt mr-2"></i>Divide y vencerás
                </time>
              </div>
              <div className="postcard__bar"></div>
              <div className="postcard__preview-txt">Debido a que la multiplicación de matrices es una operación tan central en muchos algoritmos numéricos , se ha invertido mucho trabajo en hacer que los algoritmos de multiplicación de matrices sean eficientes. Las aplicaciones de la multiplicación de matrices en problemas computacionales se encuentran en muchos campos, incluida la computación científica y el reconocimiento de patrones y en problemas aparentemente no relacionados, como contar las rutas a través de un gráfico.</div>
              <ul className="postcard__tagbox">
                <li className="tag__item play blue">
                  <Link to={'/multiplicacionDeMatrices'}>
                  <i className="fas fa-play mr-2"></i>Ejecutar
                  </Link>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </section>
      </>
    )
}

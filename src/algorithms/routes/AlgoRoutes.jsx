import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from '../../ui/components/Navbar'
import { 
    Inicio,
    RutaMasCorta,
    ProblemaDeLaMochila,
    //ReemplazoDeEquipo,
    //ArbolesBinariosDeBusquedaOptima,
    SeriesDeportivas,
    //MultiplicacionDeMatrices
} from "../pages/index"

export const AlgoRoutes = () => {
    return (
        <>
            <Navbar/>

            <div className="container">
                <Routes>
                    <Route path="inicio" element={<Inicio/>}/>
                    <Route path="rutaMasCorta" element={<RutaMasCorta/>}/>
                    <Route path="problemaDeLaMochila" element={<ProblemaDeLaMochila/>}/>
                    <Route path="reemplazoDeEquipo" element={<SeriesDeportivas/>}/>
                    <Route path="arbolesBinariosDeBusquedaOptimos" element={<SeriesDeportivas/>}/>
                    <Route path="seriesDeportivas" element={<SeriesDeportivas/>}/>
                    <Route path="multiplicacionDeMatrices" element={<SeriesDeportivas/>}/>

                    <Route path="/" element={<Navigate to="/inicio"/>} />
                </Routes>
            </div>
            
        </>
    )
}

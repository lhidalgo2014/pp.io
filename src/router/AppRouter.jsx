import { Route, Routes } from "react-router-dom"
import { AlgoRoutes } from "../algorithms/routes/AlgoRoutes"
import { Login } from "../auth/pages/Login"


export const AppRouter = () => {
  return (
    <>

        <Routes>
            <Route path="login" element={<Login/>}/>

            <Route path="/*" element={<AlgoRoutes/>}/>
        </Routes>
    </>
  )
}

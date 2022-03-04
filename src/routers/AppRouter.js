import { Route, Routes } from 'react-router-dom';

import { DashboardRoutes } from './DashboardRoutes';
import { LoginScreen } from '../components/login/LoginScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path='login' element={
                <PublicRoute>
                  <LoginScreen />
                </PublicRoute>
              }
            />

            {/**Rutas englobadas en un higher order component, que solo mostrara su componente hijos si el usuario esta autenticado */}
            <Route path='/*' element={
                <PrivateRoute>
                  <DashboardRoutes />
                </PrivateRoute>
              } 
            />
            {/* <Route path='/*' element={ <DashboardRoutes /> } /> */}
        </Routes>
    </>
  )
}

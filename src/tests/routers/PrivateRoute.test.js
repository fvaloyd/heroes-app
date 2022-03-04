import { mount } from 'enzyme'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AuthContext } from '../../auth/authContext'
import { PrivateRoute } from '../../routers/PrivateRoute'


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Navigate: () => <h1>Saliendo de aqui</h1>
}));

describe('Pruebas en el <PrivateRoute />', () => {  

    Storage.prototype.setItem = jest.fn()

    const contextValue = {
        user: {
            logged: true,
            name: 'francis'
        }
    }
    
    test('Debe mostrar el componente si esta autenticado y guardar en el localStorage', () => {  
        const wrapper = mount(
           <MemoryRouter initialEntries={ ['/'] }>
               <AuthContext.Provider value={ contextValue }>
                   <PrivateRoute>
                       <h1>Private component</h1>
                   </PrivateRoute>
               </AuthContext.Provider>
           </MemoryRouter>
        )   
        expect( wrapper.text().trim() ).toBe('Private component')

        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/')
    })
    test('Debe bloquear el componente si el usuairo no esta autenticado', () => {
        const contextValue = {
            user: {
                logged: false,
            }
        }
        const wrapper = mount(
           <MemoryRouter initialEntries={ ['/'] }>
               <AuthContext.Provider value={ contextValue }>
                   <PrivateRoute>
                       <h1>Private component</h1>
                   </PrivateRoute>
               </AuthContext.Provider>
           </MemoryRouter>
        )
        expect( wrapper.text().trim() ).toBe('Saliendo de aqui')
    })
})
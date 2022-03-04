import { mount } from 'enzyme'

import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../auth/authContext'
import { DashboardRoutes } from '../../routers/DashboardRoutes'

describe('Pruebas en el <DashboardRoutes />', () => { 

    const contextValue = {
        user: {
            logged: true,
            name: 'Pepe'
        }
    }

    test('Debe de mostrarse correctamente - Marvel', () => {  

        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/'] }>
                <AuthContext.Provider value={contextValue}>
                    <DashboardRoutes />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        expect( wrapper ).toMatchSnapshot()
        expect( wrapper.find('.text-info').text().trim() ).toBe('Pepe')
        expect( wrapper.find('h1').text().trim() ).toBe('MarvelScreen')
    })

    test('Debe mostrarse correctamente - Dc', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/dc']}>
                <AuthContext.Provider value={contextValue}>
                    <DashboardRoutes />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        expect( wrapper ).toMatchSnapshot()
        expect( wrapper.find('.text-info').text().trim() ).toBe('Pepe')
        expect( wrapper.find('h1').text().trim() ).toBe('DcScreen')
    })
})
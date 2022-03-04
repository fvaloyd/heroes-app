import { mount } from "enzyme"
import { MemoryRouter, Route, Routes } from "react-router-dom"

import { AuthContext } from "../../../auth/authContext"
import { HeroScreen } from "../../../components/hero/HeroScreen";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}))

const contextValue = {
    user: {
        logged: true,
        name: 'francis'
    },
    dispatch: jest.fn()
}
describe('Prueba en <HeroScreen />', () => {  
    test('No debe mostrar un HeroScreen si no hay un heroe en el URL', () => {  
        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero'] }>
                <AuthContext.Provider value={ contextValue }>
                    <Routes>
                        <Route path='/hero' element={ <HeroScreen /> } />
                        <Route path='/' element={<h1>no hero a mostrar</h1>} />
                    </Routes>
                </AuthContext.Provider>
            </MemoryRouter>
        )
        expect(wrapper.find('h1').text().trim()).toBe('no hero a mostrar')
    })
    test('Debe mostrar un heroe si el parametro existe', () => {  
        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero/marvel-spider'] }>
                <AuthContext.Provider value={ contextValue }>
                    <Routes>
                        <Route path="/hero/:id" element={ <HeroScreen /> } />
                        <Route path="/" element={ <h1>no hero a mostrar</h1> } />
                    </Routes>
                </AuthContext.Provider>
            </MemoryRouter>
        )
        expect( wrapper.find('img').exists() ).toBe(true)
    })
    test('Debe regresar a la pantalla anterior', () => {  

        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero/marvel-spider'] }>
                <AuthContext.Provider value={ contextValue }>
                    <Routes>
                        <Route path="/hero/:id" element={ <HeroScreen /> } />
                    </Routes>
                </AuthContext.Provider>
            </MemoryRouter>
        )
        wrapper.find('button').prop('onClick')();

        expect( mockNavigate ).toHaveBeenCalledWith(-1)
    })
    test('Debe de mostrar el no hero page si el heroe no existe', () => {  
        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero/marvel-spidersfsdfsdfdf'] }>
                <AuthContext.Provider value={ contextValue }>
                    <Routes>
                        <Route path="/hero/:id" element={ <HeroScreen /> } />
                        <Route path="/" element={ <h1>No hero page</h1> } />
                    </Routes>
                </AuthContext.Provider>
            </MemoryRouter>
        )
         
        expect( wrapper.find('h1').text().trim() ).toBe('No hero page')
    })
})
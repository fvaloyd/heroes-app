import { mount } from "enzyme"
import { MemoryRouter } from "react-router-dom"

import { AuthContext } from "../../../auth/authContext"
import { Navbar } from "../../../components/ui/Navbar"
import { types } from "../../../types/types"

const mockNavigate = jest.fn();

const mockDispatch = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}))
describe('Pruebas en el <NavBar />', () => {  

    beforeEach(() => {
        jest.clearAllMocks()
    })

    const contextValue = {
        user: {
            logged: true,
            name: 'pepe'
        },
        dispatch: mockDispatch
    }

    test('Debe mostrar correctamente y mostrar el nombre del context', () => {  
        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/'] }>
                <AuthContext.Provider value={ contextValue }>
                    <Navbar /> 
                </AuthContext.Provider>
            </MemoryRouter>
        )
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim() ).toBe('pepe');
    })

    test('Debe llamar el logout, llamar el navigate y el dispatch con los argumentos', () => {  
        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/'] }>
                <AuthContext.Provider value={ contextValue }>
                    <Navbar /> 
                </AuthContext.Provider>
            </MemoryRouter>
        )

        wrapper.find('button').simulate('click');

        expect( mockDispatch ).toHaveBeenCalledWith( {type: types.Logout} );

        expect( mockNavigate ).toHaveBeenCalledWith('/login', {replace: true})
    })

})
import { mount } from "enzyme"
import { MemoryRouter } from "react-router-dom"
import { AuthContext } from "../../../auth/authContext"
import { LoginScreen } from "../../../components/login/LoginScreen"
import { types } from "../../../types/types";

const mockNavigate = jest.fn();
const mockDispatch = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}))

describe('Pruebas en <LoginScreen />', () => {  

    const contextValue = {
        user: {
            logged: false
        },
        dispatch: mockDispatch
    }

    const wrapper = mount(        
        <MemoryRouter initialEntries={ ['/login'] }>
            <AuthContext.Provider value={ contextValue }>
                <LoginScreen />
            </AuthContext.Provider>
        </MemoryRouter>
    )
    beforeEach(() => {
        jest.clearAllMocks()
    })
    test('Debe mostrar correctamente', () => {  
        
        expect( wrapper ).toMatchSnapshot()
    })
    test('Debe realizar el dispatch y la navegacion', () => {  

        const loginBtn = wrapper.find('button').prop('onClick');

        loginBtn()

        expect( mockDispatch ).toHaveBeenCalledWith({
            type: types.Login,
            payload: {
                name: 'Francis logeado'
            }
        });

        expect( mockNavigate ).toHaveBeenCalledWith('/', {replace: true})

        localStorage.setItem('lastPath','/dc')

        loginBtn()

        expect( mockNavigate ).toHaveBeenCalledWith('/dc', {replace: true})
    })

})
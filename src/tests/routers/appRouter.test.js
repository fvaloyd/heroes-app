import { mount } from 'enzyme';

import { AppRouter } from '../../routers/AppRouter';
import { AuthContext } from '../../auth/authContext';
import { BrowserRouter } from 'react-router-dom';

describe('Pruebas en el <AppRouter />', () => { 


    test('Debe mostrar el login si no esta autenticado', () => { 
        
        const contextValue = {
            user: {
                logged: false
            }
        }
        const wrapper = mount( 
            <BrowserRouter>
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter />
                </AuthContext.Provider>
            </BrowserRouter>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('h1').text().trim() ).toBe('LoginScreen');
    })

    test('Debe mostrar el componente de marvel si esta autenticado', () => {  
        const contextValue = {
            user: {
                logged: true,
                name: 'Pepe'
            }
        }

        const wrapper = mount(
            <BrowserRouter>
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter />
                </AuthContext.Provider>
            </BrowserRouter>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('h1').text().trim() ).toBe('MarvelScreen');
        expect( wrapper.find('span').text().trim() ).toBe(contextValue.user.name)
    })
})
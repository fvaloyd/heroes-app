import { mount } from "enzyme"
import { MemoryRouter } from "react-router-dom"
import { SearchScreen } from "../../../components/search/SearchScreen"

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}))

describe('Pruebas en <SearchScreen />', () => {  

    test('Debe mostrarse correctamente con valores por defecto', () => {  
        const wrapper = mount( 
            <MemoryRouter initialEntries={ ['/search'] }>
                <SearchScreen />
            </MemoryRouter>
        )
        expect( wrapper ).toMatchSnapshot()
        expect( wrapper.find('.alert-info').text().trim() ).toBe('Buscar un heroe')
    })
    test('Debe mostrar a batman y el input con el valor del queryString', () => {  
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchScreen />
            </MemoryRouter>
        )
        expect(wrapper).toMatchSnapshot()
        expect( wrapper.find('.alert-info').length ).toBe(0);
        expect( wrapper.find('.card-title').text().trim() ).toBe('Batman');
        expect( wrapper.find('input').prop('value') ).toBe('batman');
    })       
    test('Debe mostrar una alerta de que el heroe buscado no existe', () => {  
        const fakeHero = 'batman324234';
        const wrapper = mount(
            <MemoryRouter initialEntries={ [`/search?q=${fakeHero}`] }>
                <SearchScreen />
            </MemoryRouter>
        )
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.alert-danger').exists() ).toBe(true);
        expect( wrapper.find('.alert-danger').text().trim() ).toBe(`No hay resultados: ${fakeHero}`)
    })
    test('El navigate debe modificar la url con los argumentos que se le pasen, mediante handleSeatch', () => {  

        const wrapper = mount(
            <MemoryRouter initialEntries={ [`/search`] }>
                <SearchScreen />
            </MemoryRouter>
        )
        wrapper.find('input').simulate('change',{
            target: {
                name: 'searchText',
                value: 'batman'
            }
        });

        wrapper.find('form').simulate('submit',{preventDefault(){}});
        
        expect( mockNavigate ).toHaveBeenCalledWith('?q=batman')
    })

})
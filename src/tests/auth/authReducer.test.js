import { authReducer } from "../../auth/authReducer"
import { types } from "../../types/types";

describe('Pruebas en el authReducer', () => {  

    test('Debe retornar el estado por defecto', () => {  
        const state = authReducer( {logged: false} , {} )

        expect( state ).toEqual({ logged: false })
    })
    test('Debe retornar el logged en true y el "name"', () => {
        const action = {
            type: types.Login,
            payload: {
                name: 'francis'
            }
        }
        const state = authReducer( {} , action )

        expect( state ).toEqual({ name:'francis', logged: true })
    })
    test('Debe de borrar el name del usuario y el logged en false', () => {
        const action = {
            type: types.Logout,
            payload: {
                name: 'francis'
            }
        }
        const state = authReducer( {} , action )

        expect( state ).toEqual( { logged:false } )
    })

})
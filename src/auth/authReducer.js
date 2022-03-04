import { types } from '../types/types';

export const authReducer = (state = {}, action) => {

    switch ( action.type ) {
        case types.Login:
            return { ...action.payload, logged : true }
                
        case types.Logout:

           return { logged : false } 

        default:
            return state;
    }
}

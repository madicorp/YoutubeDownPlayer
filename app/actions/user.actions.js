import * as types from './types';


export function authenticate(user) {
    return {
        type: types.AUTHENTICATE,
        user
    }
}

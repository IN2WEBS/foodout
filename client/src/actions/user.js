import axios from 'axios';

import * as types from '../actions/alll-types';

export function newUser(values) {
    return async function (dispatch) {
        // console.log(values);
        try {
            const res = await axios.post('/api/login', values);
            console.log(res.data);
            localStorage.setItem('token', 'Bearer ' + res.data.token);
            dispatch({
                type: types.NEW_USER,
                payload: res.data.name
            })
        } catch (err) {
            console.log(err.message);

            dispatch({
                type: types.AUTH_ERROR,
            })
        }
        // console.log(res.data);
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    return {
        type: types.LOGOUT,

    }
};
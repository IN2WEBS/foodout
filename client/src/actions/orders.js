import * as types from '../actions/alll-types';


// public

export function addOrder(order) {
    return {
        type: types.ADD_ORDER,
        payload: order
    }
}

// admin
export function addActiveOrder(order) {
    console.log('order', order);
    return {
        type: types.ADD_ACTIVE_ORDER,
        payload: order,
    }
}
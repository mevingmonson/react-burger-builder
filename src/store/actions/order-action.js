import axios from '../../axios-orders'
import { actionTypes } from './actionTypes';

const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}


export const purchaseBurger = (orderData) => (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json', orderData)
        .then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        })
        .catch(error => {
            dispatch(purchaseBurgerFailed(error))
        });

}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}
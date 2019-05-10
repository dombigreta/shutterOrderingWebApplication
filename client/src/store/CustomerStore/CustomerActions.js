import * as CUSTOMER_STORE_ACTIONS from './CustomerConstants';

import CustomerDispatcher from './CustomerDispatcher';



export function getOwnOrders(){
        CustomerDispatcher.handleAction({
            type:CUSTOMER_STORE_ACTIONS.GET_OWN_ORDERS
        });
}

export function getShutterTypes(){
    CustomerDispatcher.handleAction({
        type:CUSTOMER_STORE_ACTIONS.GET_SHUTTER_TYPES
    });
}

export function getCustomerData(){
    CustomerDispatcher.handleAction({
        type:CUSTOMER_STORE_ACTIONS.GET_CUSTOMER_DATA
    });
}

export function createOrder(payload){
    CustomerDispatcher.handleAction({
        type:CUSTOMER_STORE_ACTIONS.CREATE_ORDER,
        payload:payload
    });
}

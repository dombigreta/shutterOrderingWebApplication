import * as MANAGER_STORE_ACTIONS from './ManagerConstants';
import ManagerDispatcher from './ManagerDispatcher';

export function getAllOrders(){
    ManagerDispatcher.handleAction({
        type: MANAGER_STORE_ACTIONS.GET_ALL_ORDERS
    });
}

export function getCustomerDataByCustomerId(customerId){
    ManagerDispatcher.handleAction({
        type:MANAGER_STORE_ACTIONS.GET_CUSTOMER_DATA_BUY_CUSTOMER_ID,
        payload:customerId
    })
}
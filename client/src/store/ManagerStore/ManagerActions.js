import * as MANAGER_STORE_ACTIONS from './ManagerConstants';
import ManagerDispatcher from './ManagerDispatcher';

export function getAllOrders(){
    ManagerDispatcher.handleAction({
        type: MANAGER_STORE_ACTIONS.GET_ALL_ORDERS
    });
}

export function getOrderById(orderId){
    ManagerDispatcher.handleAction({
        type:MANAGER_STORE_ACTIONS.GET_ORDER_BY_ID,
        payload:orderId
    });
}

export function getCustomerDataByCustomerId(customerId){
    ManagerDispatcher.handleAction({
        type:MANAGER_STORE_ACTIONS.GET_CUSTOMER_DATA_BUY_CUSTOMER_ID,
        payload:customerId
    })
}

export function getWorkersDataForInstallation(){
    ManagerDispatcher.handleAction({
        type:MANAGER_STORE_ACTIONS.GET_WORKERS_DATA_FOR_INSTALLATION
    });
}

export function organiseInstallation(orderId, workerId){
    ManagerDispatcher.handleAction({
        type:MANAGER_STORE_ACTIONS.ORGANISE_INSTALLATION,
        orderId:orderId,
        workerId:workerId
    })
}
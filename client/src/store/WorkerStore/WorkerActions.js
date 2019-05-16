import * as WORKER_STORE_ACTIONS from './WorkerConstants';
import WorkerDispatcher from './WorkerDispatcher';

export function getAllOrders(){
    WorkerDispatcher.handleActions({
        type: WORKER_STORE_ACTIONS.GET_ALL_ORDERS
    });
}

export function getOrderById(orderId){
    WorkerDispatcher.handleActions({
        type:WORKER_STORE_ACTIONS.GET_ORDER_BY_ID,
        payload:orderId
    });
}


export function getAllParts(){
    WorkerDispatcher.handleActions({
        type:WORKER_STORE_ACTIONS.GET_ALL_PARTS
    });
}


export function startAssemblingOrder(order){
    WorkerDispatcher.handleActions({
        type:WORKER_STORE_ACTIONS.START_ASSEMBLING_ORDER,
        order:order
    });
}

export function finishOrder(orderId){
    WorkerDispatcher.handleActions({
        type:WORKER_STORE_ACTIONS.FINISH_ORDER,
        payload:orderId
    });
}

export function setEditingOrderUndefined(){
    WorkerDispatcher.handleActions({
        type:WORKER_STORE_ACTIONS.SET_EDITING_ORDER_UNDEFINED
    });
}
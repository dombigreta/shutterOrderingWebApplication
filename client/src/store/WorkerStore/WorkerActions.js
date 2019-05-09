import * as WORKER_STORE_ACTIONS from './WorkerConstants';

import WorkerDispatcher from './WorkerDispatcher';

export function getAllOrders(){
    WorkerDispatcher.handleActions({
        type: WORKER_STORE_ACTIONS.GET_ALL_ORDERS
    })
}
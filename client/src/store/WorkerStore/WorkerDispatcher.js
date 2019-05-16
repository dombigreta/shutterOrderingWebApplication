import {Dispatcher} from 'flux';
import * as WORKER_STORE_ACTIONS from './WorkerConstants';
import WorkerStore from './WorkerStore';
import { isNullOrUndefined } from 'util';


class WorkerDispatcher extends Dispatcher{
    handleActions(action){
        this.dispatch({
            action:action
        })
    }
}

const dispatcher = new WorkerDispatcher();

// --- getAllOrders
dispatcher.register((data) => {
    if(data.action.type !== WORKER_STORE_ACTIONS.GET_ALL_ORDERS){
        return;
    }

    fetch('/worker', {method:'POST', headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json' },
        body:JSON.stringify({workerId: WorkerStore._workerId})})
    .then((response) => response.json())
    .then((data) => WorkerStore._orders = data )
    .then(() => WorkerStore.emitChange());
});

// --- getAllParts
dispatcher.register((data) => {
    if(data.action.type !== WORKER_STORE_ACTIONS.GET_ALL_PARTS){
        return;
    }
    fetch('/worker/getAllParts')
    .then((response) => response.json())
    .then((data) => WorkerStore._parts = data)
    .then(() => WorkerStore.emitChange());
});

// --- getOrderById
dispatcher.register((data) => {
    if(data.action.type !== WORKER_STORE_ACTIONS.GET_ORDER_BY_ID || isNullOrUndefined(data.action.payload)){
        return;
    }
    fetch(`/worker/order/${data.action.payload}`)
        .then((response) => response.json())
        .then((data) => WorkerStore._editingOrder = data)
        .then(() => WorkerStore.emitChange());
})

// --- startAssemblingOrder
dispatcher.register((data) => {
    if(data.action.type !== WORKER_STORE_ACTIONS.START_ASSEMBLING_ORDER || isNullOrUndefined(data.action.order)){
        return;
    }
    fetch('/worker/startAssemblingOrder',{method:'POST', 
    headers:{ 'Accept': 'application/json',
            'Content-Type': 'application/json'},
    body:JSON.stringify(data.action.order)})
    .then((response) => response.json())
    .then((data) => console.log(data))
    .then(() => WorkerStore.emitChange())
})

// --- finishOrder
dispatcher.register((data) => {
    if(data.action.type !== WORKER_STORE_ACTIONS.FINISH_ORDER || isNullOrUndefined(data.action.payload)){
        return;
    }
    fetch('/worker/finishOrder',{method:'POST', 
    headers:{ 'Accept': 'application/json',
            'Content-Type': 'application/json'},
    body:JSON.stringify({orderId: data.action.payload})})
    .then((response) => response.json())
    .then((data) => console.log(data))
    .then(() => WorkerStore.emitChange());
});

// --- setEditingOrderUndefined
dispatcher.register((data) => {
    if(data.action.type !== WORKER_STORE_ACTIONS.SET_EDITING_ORDER_UNDEFINED){
        return;
    }
    WorkerStore._editingOrder = undefined;
    WorkerStore.emitChange();
})
export default dispatcher;
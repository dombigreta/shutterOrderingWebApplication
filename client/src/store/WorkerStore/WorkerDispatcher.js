import {Dispatcher} from 'flux';
import * as WORKER_STORE_ACTIONS from './WorkerConstants';
import WorkerStore from './WorkerStore';


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
})

// --- getAllParts
dispatcher.register((data) => {
    if(data.action.type !== WORKER_STORE_ACTIONS.GET_ALL_PARTS){
        return;
    }
    fetch('/worker/getAllParts')
    .then((response) => response.json())
    .then((data) => WorkerStore._parts = data)
    .then(() => WorkerStore.emitChange());
})

export default dispatcher;
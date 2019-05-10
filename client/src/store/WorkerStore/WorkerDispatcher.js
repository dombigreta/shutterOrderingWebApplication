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

    fetch('/worker')
    .then((response) => response.json())
    .then((data) => WorkerStore._orders = data )
    .then(() => WorkerStore.emitChange());
})

export default dispatcher;
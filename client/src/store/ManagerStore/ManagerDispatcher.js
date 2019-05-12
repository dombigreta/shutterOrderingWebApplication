import {Dispatcher} from 'flux';
import * as MANAGER_STORE_ACTIONS from './ManagerConstants';
import ManagerStore from './ManagerStore';
import { isNull, isNullOrUndefined } from 'util';

class ManagerDispatcher extends Dispatcher{
    handleAction(action){
        this.dispatch({
            action:action
        });
    }
}

const dispatcher = new ManagerDispatcher();

// --- getAllOrders
dispatcher.register((data) => {
    if(data.action.type !== MANAGER_STORE_ACTIONS.GET_ALL_ORDERS){
        return;
    }
    fetch('/manager')
    .then((response) => response.json())
    .then((data) => ManagerStore._orders = data)
    .then(() => ManagerStore.emitChange());
});
// --- getCustomerDataByCustomerId
dispatcher.register((data) => {
    if(data.action.type !== MANAGER_STORE_ACTIONS.GET_CUSTOMER_DATA_BUY_CUSTOMER_ID || isNull(data.action.payload)){
        return;
    }
    fetch('/manager/getCustomerDataByCustomerId',{method:'POST', headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json' },
        body:JSON.stringify({customerId: data.action.payload})})
        .then((response) => response.json())
        .then((data) => ManagerStore._customerData = data)
        .then(() => MANAGER_STORE_ACTIONS.emitChange());
});

// --- getOrderById
dispatcher.register((data) => {
    if(data.action.type !== MANAGER_STORE_ACTIONS.GET_ORDER_BY_ID || isNull(data.action.payload)){
        return;
    }
    fetch(`/manager/order/${data.action.payload}`)
        .then((response) => response.json())
        .then((data) => ManagerStore._editingOrder = data)
        .then(() => ManagerStore.emitChange());
})

// --- getWorkersDataForInstallation
dispatcher.register((data) => {
    if(data.action.type !== MANAGER_STORE_ACTIONS.GET_WORKERS_DATA_FOR_INSTALLATION){
        return;
    }
    fetch('/manager/getWorkersDataForInstallation')
    .then((response) => response.json())
    .then((data) => ManagerStore._workers = data)
    .then(() => ManagerStore.emitChange());
});

// --- organiseInstallation
dispatcher.register((data) => {
    if(data.action.type !== MANAGER_STORE_ACTIONS.ORGANISE_INSTALLATION 
        || isNullOrUndefined(data.action.orderId) 
        | isNullOrUndefined(data.action.workerId)){
        return;
    }

    fetch('/manager/getCustomerDataByCustomerId',{method:'POST', headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json' },
        body:JSON.stringify({orderId: data.action.orderId, workerId: data.action.workerId})})
        .then((response) => response.json())
        .then((data) => console.log(data))
        .then(() => MANAGER_STORE_ACTIONS.emitChange());
})

export default dispatcher;
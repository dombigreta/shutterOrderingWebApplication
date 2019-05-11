import {Dispatcher} from 'flux';
import * as MANAGER_STORE_ACTIONS from './ManagerConstants';
import ManagerStore from './ManagerStore';
import { isNull } from 'util';

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
    fetch('/manager/',{method:'POST', headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json' },
        body:JSON.stringify({customerId: data.payload})})
        .then((response) => response.json())
        .then((data) => console.log(data));
})
export default dispatcher;
import  {Dispatcher} from "flux";
import CUSTOMER_STORE_ACTIONS from './CustomerConstants';
import CustomerStore from './CustomerStore';

class CustomerDispatcher extends Dispatcher{
    handleAction(action){
        this.dispatch({
            action:action
        })
    }
}

const dispatcher = new CustomerDispatcher();

// -- getOwnOrders
dispatcher.register((data) => {
    if(data.action.type !== CUSTOMER_STORE_ACTIONS.GET_OWN_ORDERS){
        return;
    }
    fetch('/customer')
    .then((response) => response.json())
    .then((data) => CustomerStore._ownOrders = data)
    .then(() => CustomerStore.emitChange());
})

// -- createOrder
dispatcher.register((data) => {
    if(data.action.type !== CUSTOMER_STORE_ACTIONS.CREATE_ORDER){
        return;
    }
});

// -- getShutterTypes
dispatcher.register((data) => {
   
    if(data.action.type !== CUSTOMER_STORE_ACTIONS.GET_SHUTTER_TYPES){
        return;
    }
    fetch('/customer/getShutterTypes')
    .then((response) => response.json())
    .then((data) => CustomerStore._shutterTypes = data)
    .then(() => CustomerStore.emitChange());
});

export default dispatcher;
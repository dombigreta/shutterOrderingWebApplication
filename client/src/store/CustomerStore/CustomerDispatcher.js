import  {Dispatcher} from 'flux';
import * as CUSTOMER_STORE_ACTIONS from './CustomerConstants';
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
    fetch('/customer',{method:'POST', 
                        headers:{ 'Accept': 'application/json',
                                'Content-Type': 'application/json'},
                        body:JSON.stringify({customerId: CustomerStore._customerId})})
    .then((response) => response.json())
    .then((data) => CustomerStore._ownOrders = data)
    .then(() => CustomerStore.emitChange());
})

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


// -- getCustomerData
dispatcher.register((data) => {
    if(data.action.type !== CUSTOMER_STORE_ACTIONS.GET_CUSTOMER_DATA){
        return;
    }
    fetch('/customer/getCustomerData',{method:'POST', headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json' },
                    body:JSON.stringify({customerId: CustomerStore._customerId})})
                    .then((response) => response.json())
                    .then((data) => CustomerStore._customerData = data)
                    .then(() => CustomerStore.emitChange());
});


// -- createOrder
dispatcher.register((data) => {
    if(data.action.type !== CUSTOMER_STORE_ACTIONS.CREATE_ORDER || data.action.payload === undefined){
        return;
    }
    let customerJson = JSON.stringify(data.action.payload);
    fetch('/customer/createOrder', {method:'POST', headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'  
                    },body:customerJson})
            .then((response) => response.json())
            .then((result) => {
                if(result){
                    CustomerStore.emitChange();
                }
            })
                    
})
export default dispatcher;